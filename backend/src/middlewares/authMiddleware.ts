import type { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import { auth } from '../utils/firebase.js';
import prisma from '../utils/prisma.js';

// Extend Fastify types to include database user information
declare module 'fastify' {
  interface FastifyRequest {
    user: {
      id: string;
      uid: string; // Backward compatibility
      email: string;
      role: 'ADMIN' | 'USER';
      plan: string;
      planId: string;
      organizationId: string | null;
      createdAt: Date;
    };
  }
}

/**
 * Firebase Authentication & Auto-Provisioning Middleware
 */
const authMiddleware = async (fastify: FastifyInstance) => {
  // Decorate request with a null 'user' placeholder (Fastify optimization)
  fastify.decorateRequest('user', null);

  fastify.addHook('preHandler', async (request: FastifyRequest, reply: FastifyReply) => {
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return reply.status(401).send({ error: 'Unauthorized: No token provided' });
    }

    const idToken = authHeader.split('Bearer ')[1];
    fastify.log.info({ tokenPrefix: idToken.substring(0, 10) }, 'Attempting token verification...');

    try {
      // 1. Verify token with Firebase Admin (with a timeout to prevent hanging)
      const decodedToken = await Promise.race([
        auth.verifyIdToken(idToken),
        new Promise<never>((_, reject) => 
          setTimeout(() => reject(new Error('Firebase verification timeout')), 10000)
        )
      ]);
      
      const { uid, email } = decodedToken;
      fastify.log.info({ uid, email }, 'Firebase token verified');

      if (!email) {
        fastify.log.warn({ uid }, 'Token missing email');
        return reply.status(400).send({ error: 'Token missing email' });
      }

      // 2. Fetch the 'FREE' plan to get its ID for auto-provisioning
      fastify.log.info('Fetching default plan (FREE)...');
      let defaultPlan = await prisma.plan.findUnique({
        where: { tierName: 'FREE' }
      });

      // Robust fallback: If 'FREE' is not found (seeding issue), try to find ANY plan
      if (!defaultPlan) {
        fastify.log.warn('FREE plan not found, attempting fallback to any available plan');
        defaultPlan = await prisma.plan.findFirst();
      }

      if (!defaultPlan) {
        fastify.log.error('Critical Error: No plans found in database. The user cannot be provisioned.');
        return reply.status(500).send({ error: 'System configuration error: No subscription plans found. Please contact support.' });
      }

      fastify.log.info({ planId: defaultPlan.id }, 'Found plan for user provisioning');

      // 3. Auto-provision the user in the database (upsert)
      fastify.log.info({ uid, email }, 'Executing user upsert...');
      const dbUser = await prisma.user.upsert({
        where: { id: uid },
        update: {
          email: email // In case the email changed in Firebase
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
      fastify.log.info('Request user object attached, moving to handler');

    } catch (error: any) {
      fastify.log.error({ err: error, message: error.message }, 'Authentication Middleware Error');
      
      if (error.message === 'Firebase verification timeout') {
        return reply.status(504).send({ error: 'Authentication timeout. Please try again.' });
      }

      // Check for Prisma/Database errors specifically
      if (error.code && error.code.startsWith('P')) {
        return reply.status(500).send({ 
          error: 'Database connection error. Please ensure your database is running and reachable.' 
        });
      }

      return reply.status(401).send({ error: 'Unauthorized: Invalid or expired token' });
    }
  });
};

export default fp(authMiddleware);
