import fp from 'fastify-plugin';
import { auth } from '../utils/firebase.js';
/**
 * Middleware to verify Firebase Auth JWT tokens
 */
const authMiddleware = async (fastify) => {
    fastify.decorateRequest('user', null);
    fastify.addHook('preHandler', async (request, reply) => {
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
                role: decodedToken.role || 'USER',
            };
        }
        catch (error) {
            fastify.log.error(error, 'Firebase Auth Error');
            return reply.status(401).send({ error: 'Unauthorized: Invalid or expired token' });
        }
    });
};
export default fp(authMiddleware);
