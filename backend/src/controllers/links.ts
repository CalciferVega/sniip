import type { FastifyRequest, FastifyReply } from 'fastify';
import { linkService } from '../services/linkService.js';

interface CreateLinkBody {
  originalUrl: string;
  customSlug?: string;
  title?: string;
  tags?: string[];
}

/**
 * Controller for creating a new short link.
 * Delegates business logic to LinkService and handles HTTP-level concerns.
 */
export const createLink = async (
  request: FastifyRequest<{ Body: CreateLinkBody }>,
  reply: FastifyReply
) => {
  const { originalUrl, customSlug, title, tags } = request.body;
  const user = request.user;

  // Type safety check
  if (!user || !user.email) {
    return reply.status(401).send({ error: 'Unauthorized: Authentication required' });
  }

  try {
    const link = await linkService.createLink({
      userId: user.uid,
      userEmail: user.email,
      userRole: user.role as string,
      originalUrl,
      customSlug,
      title,
      tags
    });

    return reply.status(201).send(link);
  } catch (error: any) {
    request.log.error(error);
    
    // Business rule violations (like plan limits or collisions)
    if (error.message.includes('Usage limit') || error.message.includes('Collision')) {
      return reply.status(400).send({ error: error.message });
    }

    // Integrity violations (like P2002 Unique Constraint)
    if (error.code === 'P2002') {
      return reply.status(400).send({ error: 'The short slug is already in use' });
    }

    return reply.status(500).send({ error: 'Internal server error while processing link' });
  }
};

/**
 * Controller to list all links for the authenticated user with optional search and filters.
 */
export const listLinks = async (
  request: FastifyRequest<{
    Querystring: {
      search?: string;
      status?: string;
      startDate?: string;
      endDate?: string;
    };
  }>,
  reply: FastifyReply
) => {
  const user = request.user;
  if (!user || !user.email) return reply.status(401).send({ error: 'Unauthorized' });

  const { search, status, startDate, endDate } = request.query;

  try {
    const links = await linkService.getUserLinks({
      email: user.email,
      search,
      status,
      startDate,
      endDate
    });
    return reply.send(links);
  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({ error: 'Internal server error while fetching links' });
  }
};
