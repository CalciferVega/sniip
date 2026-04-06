import type { FastifyInstance } from 'fastify';
import { getLinkAnalytics } from '../controllers/analytics.js';

/**
 * Routes for link analytics management.
 * All these routes are intended to be protected by authMiddleware.
 */
export default async function analyticsRoutes(fastify: FastifyInstance) {
  // GET /api/analytics/:linkId - Get detailed analytics for a link
  fastify.get('/:linkId', getLinkAnalytics);
}
