import type { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import { createRemoteJWKSet, jwtVerify, decodeProtectedHeader } from 'jose';
import prisma from '../utils/prisma.js';

// Extend Fastify types...
// (declarations remain same)

/**
 * Hybrid Supabase Authentication (Supports both Legacy HS256 and Modern Asymmetric keys)
 */
const authMiddleware = async (fastify: FastifyInstance) => {
  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseSecret = process.env.SUPABASE_JWT_SECRET;

  if (!supabaseUrl) {
    fastify.log.error('Missing SUPABASE_URL');
    throw new Error('Missing Supabase configuration');
  }

  // Modern JWKS handler
  const jwksUrl = `${supabaseUrl.replace(/\/$/, '')}/auth/v1/.well-known/jwks.json`;
  const JWKS = createRemoteJWKSet(new URL(jwksUrl));

  fastify.decorateRequest('user', null);

  fastify.addHook('preHandler', async (request: FastifyRequest, reply: FastifyReply) => {
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return reply.status(401).send({ error: 'Unauthorized: Missing token' });
    }

    const token = authHeader.split('Bearer ')[1];

    try {
      const header = decodeProtectedHeader(token);
      let payload;

      if (header.alg === 'HS256') {
        if (!supabaseSecret) {
          fastify.log.error('HS256 token received but SUPABASE_JWT_SECRET is missing');
          return reply.status(401).send({ error: 'Auth configuration mismatch' });
        }
        const secret = new TextEncoder().encode(supabaseSecret);
        const result = await jwtVerify(token, secret);
        payload = result.payload;
      } else {
        const result = await jwtVerify(token, JWKS);
        payload = result.payload;
      }

      const uid = payload.sub as string;
      const email = payload.email as string;

      fastify.log.info({ uid, email }, 'JWT verified successfully');

      if (!uid || !email) {
        fastify.log.warn({ uid, email }, 'Token missing essential claims (sub or email)');
        return reply.status(400).send({ error: 'Token missing essential claims' });
      }

      // 2. Fetch the 'FREE' plan
      fastify.log.info('Fetching default plan for provisioning...');
      let defaultPlan = await prisma.plan.findUnique({
        where: { tierName: 'FREE' }
      });

      if (!defaultPlan) {
        fastify.log.warn('FREE plan not found, falling back to first available plan');
        defaultPlan = await prisma.plan.findFirst();
      }

      if (!defaultPlan) {
        fastify.log.error('CRITICAL: No plans found in database. User cannot be provisioned.');
        return reply.status(500).send({ error: 'System configuration error: No subscription plans found.' });
      }

      // 3. Auto-provision the user in the database (upsert)
      fastify.log.info({ uid, email, planId: defaultPlan.id }, 'Attempting user upsert...');
      const dbUser = await prisma.user.upsert({
        where: { id: uid },
        update: {
          email: email
        },
        create: {
          id: uid,
          email: email,
          role: 'USER',
          plan: 'free',
          planId: defaultPlan.id,
        },
        select: {
          id: true,
          email: true,
          role: true,
          plan: true,
          planId: true,
          organizationId: true,
          createdAt: true,
        }
      });
      fastify.log.info({ dbUserId: dbUser.id }, 'User upsert successful');

      // 4. Attach the database user object to the request
      request.user = {
        id: dbUser.id,
        uid: dbUser.id,
        email: dbUser.email,
        role: dbUser.role as 'ADMIN' | 'USER',
        plan: dbUser.plan,
        planId: dbUser.planId,
        organizationId: dbUser.organizationId,
        createdAt: dbUser.createdAt,
      };

    } catch (error: any) {
      fastify.log.error({ err: error, message: error.message }, 'Authentication Middleware Error');
      return reply.status(401).send({ error: 'Unauthorized: Authentication failed' });
    }
  });
};

export default fp(authMiddleware);
