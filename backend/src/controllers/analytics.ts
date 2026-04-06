import type { FastifyRequest, FastifyReply } from 'fastify';
import prisma from '../utils/prisma.js';
import { analyticsService } from '../services/analyticsService.js';

interface AnalyticsParams {
  linkId: string;
}

/**
 * Controller to retrieve analytics for a specific link.
 * Includes security checks to ensure the user owns the link.
 */
export const getLinkAnalytics = async (
  request: FastifyRequest<{ Params: AnalyticsParams }>,
  reply: FastifyReply
) => {
  const { linkId } = request.params;
  const user = request.user;

  if (!user || !user.email) return reply.status(401).send({ error: 'Unauthorized' });

  try {
    // 1. Ownership check: Ensure this link belongs to the authenticated user
    const link = await prisma.link.findFirst({
      where: {
        id: linkId,
        user: { email: user.email }
      }
    });

    if (!link) {
      return reply.status(404).send({ error: 'Link not found or unauthorized' });
    }

    // 2. Aggregate analytics data
    const analytics = await analyticsService.getLinkAnalytics(linkId);

    return reply.send({
      link: {
        id: link.id,
        title: link.title,
        shortSlug: link.shortSlug,
        originalUrl: link.originalUrl
      },
      ...analytics
    });
  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({ error: 'Internal server error' });
  }
};
