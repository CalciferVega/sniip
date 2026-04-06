import type { FastifyInstance } from 'fastify';
import { getUserDashboard } from '../controllers/dashboard.js';

/**
 * Routes for dashboard statistics.
 * All these routes are intended to be protected by authMiddleware.
 */
export default async function dashboardRoutes(fastify: FastifyInstance) {
  // GET /api/dashboard - Get global stats for the current user
  fastify.get('/', getUserDashboard);
}
