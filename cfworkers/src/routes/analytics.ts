import { Hono } from 'hono';
import { getPrisma } from '../lib/prisma';
import { AnalyticsService } from '../services/analyticsService';

const analytics = new Hono<{ Bindings: { DATABASE_URL: string }, Variables: { user: any } }>();

analytics.get('/:linkId', async (c) => {
  const linkId = c.req.param('linkId');
  const user = c.get('user');

  const prisma = await getPrisma(c.env.DATABASE_URL);
  
  try {
    const link = await prisma.link.findFirst({
      where: { id: linkId, user: { email: user.email } }
    });

    if (!link) return c.json({ error: 'Link not found or unauthorized' }, 404);

    const analyticsService = new AnalyticsService(prisma);
    const data = await analyticsService.getLinkAnalytics(linkId);

    return c.json({
      link: {
        id: link.id,
        title: link.title,
        shortSlug: link.shortSlug,
        originalUrl: link.originalUrl
      },
      ...data
    });
  } catch (error) {
    return c.json({ error: 'Internal server error' }, 500);
  }
});

export default analytics;
