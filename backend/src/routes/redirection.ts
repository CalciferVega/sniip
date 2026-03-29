import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import prisma from '../utils/prisma.js';

interface RedirectionParams {
  slug: string;
}

export default async function redirectionRoutes(fastify: FastifyInstance) {
  fastify.get('/:slug', async (request: FastifyRequest<{ Params: RedirectionParams }>, reply: FastifyReply) => {
    const { slug } = request.params;

    try {
      // 1. Fetch the original URL from the database
      // High performance target: This query is indexed on short_slug
      const link = await prisma.link.findUnique({
        where: { shortSlug: slug },
        select: { id: true, originalUrl: true, status: true },
      });

      if (!link || link.status === 'ARCHIVED') {
        return reply.status(404).send({ error: 'Link not found or archived' });
      }

      // 2. Trigger asynchronous analytics (Non-blocking)
      // We don't 'await' this call to ensure the redirect happens immediately (< 50ms target)
      recordAnalytics(link.id, request).catch((err) => {
        request.log.error(`Analytics error for slug ${slug}:`, err);
      });

      // 3. Perform the redirection (302 Found for temporary, 301 for permanent)
      // We use 302 to ensure browsers keep hitting our server for analytics
      return reply.redirect(302, link.originalUrl);
    } catch (error) {
      request.log.error(error);
      return reply.status(500).send({ error: 'Internal server error' });
    }
  });
}

/**
 * Background function to record click analytics
 */
async function recordAnalytics(linkId: string, request: FastifyRequest) {
  const userAgent = request.headers['user-agent'] || '';
  const referrer = request.headers['referer'] || '';
  const ip = request.ip;

  // Simple device detection logic
  let device = 'desktop';
  if (/mobile/i.test(userAgent)) device = 'mobile';
  if (/tablet/i.test(userAgent)) device = 'tablet';

  await prisma.clicksAnalytics.create({
    data: {
      linkId,
      device,
      referrer: typeof referrer === 'string' ? referrer : undefined,
      // Note: Real IP geolocation would happen here in a real-world scenario
      country: 'Unknown',
    },
  });
}
