import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import prisma from '../utils/prisma.js';

interface RedirectionParams {
  slug: string;
}

/**
 * Public redirection routes.
 * These routes are handled outside the /api prefix for ultra-fast redirection.
 */
export default async function redirectionRoutes(fastify: FastifyInstance) {
  // GET /:slug - Redirect to the original URL
  fastify.get('/:slug', async (request: FastifyRequest<{ Params: RedirectionParams }>, reply: FastifyReply) => {
    const { slug } = request.params;

    // Fast-path: Skip database if the slug is obviously invalid
    if (!slug || slug.length < 3) {
      return reply.status(404).send({ error: 'Link not found' });
    }

    try {
      // 1. Fetch the original URL from the database
      // The shortSlug is indexed for sub-50ms query performance.
      const link = await prisma.link.findUnique({
        where: { shortSlug: slug },
        select: { id: true, originalUrl: true, status: true },
      });

      // 2. Handle missing or inactive links
      if (!link || link.status !== 'ACTIVE') {
        return reply.status(404).send({ error: 'Link not found or no longer active' });
      }

      // 3. Trigger asynchronous analytics (Non-blocking)
      // We don't 'await' this to prioritize redirection speed.
      recordAnalytics(link.id, request).catch((err) => {
        fastify.log.error(`Analytics error for slug "${slug}":`, err);
      });

      // 4. Perform the redirection
      // Use 302 Found to prevent aggressive browser caching and ensure 
      // every click is recorded on our end.
      return reply.redirect(302, link.originalUrl);
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({ error: 'Internal server error while redirecting' });
    }
  });
}

import geoip from 'geoip-lite';

/**
 * Background function to record click analytics.
 * Gathers user-agent, referrer, and other client data.
 */
async function recordAnalytics(linkId: string, request: FastifyRequest) {
  const userAgent = request.headers['user-agent'] || '';
  const referrer = request.headers['referer'] || '';
  const ip = request.ip;
  const isQr = (request.query as any).qr === '1' || (request.query as any).qr === 'true';

  // Simple device detection logic
  let device = 'desktop';
  if (/mobile/i.test(userAgent)) device = 'mobile';
  if (/tablet/i.test(userAgent)) device = 'tablet';

  // Geolocation using IP (if not local)
  let country = 'Unknown';
  if (ip && ip !== '127.0.0.1' && ip !== '::1') {
    const geo = geoip.lookup(ip);
    if (geo) {
      country = geo.country;
    }
  }

  // We perform the database insert in the background
  await prisma.clicksAnalytics.create({
    data: {
      linkId,
      ip,
      isQr,
      device,
      referrer: typeof referrer === 'string' && referrer !== '' ? referrer : 'Direct',
      country, 
    },
  });
}
