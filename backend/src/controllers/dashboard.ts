import type { FastifyRequest, FastifyReply } from 'fastify';
import { dashboardService } from '../services/dashboardService.js';

/**
 * Controller to retrieve global dashboard stats for the authenticated user.
 */
export const getUserDashboard = async (request: FastifyRequest, reply: FastifyReply) => {
  const user = request.user;

  if (!user || !user.email) {
    return reply.status(401).send({ error: 'Unauthorized: Authentication required' });
  }

  try {
    const stats = await dashboardService.getUserStats(user.email);
    return reply.send(stats);
  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({ error: 'Internal server error while fetching dashboard stats' });
  }
};

/**
 * Controller to retrieve usage limits for the authenticated user.
 */
export const getUserUsage = async (request: FastifyRequest, reply: FastifyReply) => {
  const user = request.user;

  if (!user || !user.email) {
    return reply.status(401).send({ error: 'Unauthorized: Authentication required' });
  }

  try {
    const usage = await dashboardService.getUserUsage(user.email);
    return reply.send(usage);
  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({ error: 'Internal server error while fetching usage stats' });
  }
};

