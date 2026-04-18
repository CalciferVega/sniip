import { createRemoteJWKSet, jwtVerify, decodeProtectedHeader } from 'jose';
import type { Context, Next } from 'hono';
import { getPrisma } from '../lib/prisma';

export const supabaseAuth = () => {
  return async (c: Context, next: Next) => {
    // 1. Basic Environment Validation
    if (!c.env.DATABASE_URL) {
      console.error('CRITICAL: DATABASE_URL is missing');
      return c.json({ error: 'Server configuration error' }, 500);
    }

    const supabaseUrl = c.env.SUPABASE_URL || c.env.VITE_SUPABASE_URL;
    const supabaseSecret = c.env.SUPABASE_JWT_SECRET; // HS256 Fallback

    if (!supabaseUrl) {
      console.error('CRITICAL: SUPABASE_URL is missing');
      return c.json({ error: 'Server configuration error' }, 500);
    }

    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ error: 'Unauthorized: Missing token' }, 401);
    }

    const token = authHeader.split('Bearer ')[1];

    try {
      // 2. Peek at the algorithm to determine verification strategy
      const header = decodeProtectedHeader(token);
      let payload;

      if (header.alg === 'HS256') {
        // Fallback to Symmetric Verification (Legacy)
        if (!supabaseSecret) {
          console.error('HS256 token received but SUPABASE_JWT_SECRET is not set');
          return c.json({ error: 'Unauthorized: Auth configuration mismatch' }, 401);
        }
        const secret = new TextEncoder().encode(supabaseSecret);
        const result = await jwtVerify(token, secret);
        payload = result.payload;
      } else {
        // Use Asymmetric Verification (Modern JWKS)
        const jwksUrl = `${supabaseUrl.replace(/\/$/, '')}/auth/v1/.well-known/jwks.json`;
        const JWKS = createRemoteJWKSet(new URL(jwksUrl));
        const result = await jwtVerify(token, JWKS);
        payload = result.payload;
      }

      const user = {
        uid: payload.sub as string,
        email: payload.email as string,
        role: 'USER',
      };

      // 3. Sync with PostgreSQL
      const prisma = await getPrisma(c.env.DATABASE_URL);
      
      let dbUser;
      try {
        dbUser = await prisma.user.upsert({
          where: { id: user.uid },
          update: { email: user.email },
          create: {
            id: user.uid,
            email: user.email,
            role: 'USER',
            plan: 'free',
            planTier: {
              connect: { tierName: 'FREE' },
            },
          },
          include: { planTier: true }
        });
      } catch (dbErr) {
        console.error('Database Sync Error:', dbErr);
        return c.json({ error: 'Internal server error: Database sync failed' }, 500);
      }

      c.set('user', {
        ...user,
        dbId: dbUser.id,
        planId: dbUser.planId,
        planTier: dbUser.planTier
      });

      await next();
    } catch (error: any) {
      console.error('JWT Verification Failed:', error.name, error.message);
      return c.json({ error: `Unauthorized: ${error.message}` }, 401);
    }
  };
};
