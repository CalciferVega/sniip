import type { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import { auth } from '../utils/firebase.js';

// Extend Fastify types to include user information
declare module 'fastify' {
  interface FastifyRequest {
    user?: {
      uid: string;
      email?: string;
      role?: string;
    };
  }
}

/**
 * Middleware to verify Firebase Auth JWT tokens
 */
const authMiddleware = async (fastify: FastifyInstance) => {
  fastify.decorateRequest('user', null);

  fastify.addHook('preHandler', async (request: FastifyRequest, reply: FastifyReply) => {
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return reply.status(401).send({ error: 'Unauthorized: No token provided' });
    }

    const idToken = authHeader.split('Bearer ')[1];

    try {
      const decodedToken = await auth.verifyIdToken(idToken);
      request.user = {
        uid: decodedToken.uid,
        email: decodedToken.email,
        role: (decodedToken.role as string) || 'USER',
      };
    } catch (error) {
      fastify.log.error(error, 'Firebase Auth Error');
      return reply.status(401).send({ error: 'Unauthorized: Invalid or expired token' });
    }
  });
};

export default fp(authMiddleware);
