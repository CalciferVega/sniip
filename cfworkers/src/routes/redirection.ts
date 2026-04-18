import { Hono } from 'hono';
import { getPrisma } from '../lib/prisma';
import { AnalyticsService } from '../services/analyticsService';

const redirection = new Hono<{ Bindings: { DATABASE_URL: string } }>();

redirection.get('/:slug', async (c) => {
  const slug = c.req.param('slug');
  const prisma = await getPrisma(c.env.DATABASE_URL);

  if (!slug || slug.length < 3) {
    return c.json({ error: 'Link not found' }, 404);
  }

  try {
    const link = await prisma.link.findUnique({
      where: { shortSlug: slug },
      select: { id: true, originalUrl: true, status: true },
    });

    if (!link || link.status !== 'ACTIVE') {
      return c.json({ error: 'Link not found or inactive' }, 404);
    }

    // Record analytics in the background (Non-blocking)
    const analytics = new AnalyticsService(prisma);
    const ip = c.req.header('cf-connecting-ip') || c.req.header('x-real-ip');
    const userAgent = c.req.header('user-agent');
    const referrer = c.req.header('referer');
    const isQr = c.req.query('qr') === '1' || c.req.query('qr') === 'true';

    // Cloudflare provides geolocation for free!
    const country = c.req.header('cf-ipcountry');

    c.executionCtx.waitUntil(
      analytics.recordClick(link.id, {
        ip,
        country,
        userAgent,
        referrer,
        isQr
      }).catch(err => console.error('Analytics error:', err))
    );

    return c.redirect(link.originalUrl, 302);
  } catch (error) {
    console.error('Redirection error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

export default redirection;
