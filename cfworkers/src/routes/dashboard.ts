import { Hono } from 'hono';
import { getPrisma } from '../lib/prisma';
import { DashboardService } from '../services/dashboardService';

const dashboard = new Hono<{ Bindings: { DATABASE_URL: string }, Variables: { user: any } }>();

dashboard.get('/stats', async (c) => {
  const user = c.get('user');
  const prisma = await getPrisma(c.env.DATABASE_URL);
  const dashboardService = new DashboardService(prisma);

  try {
    const stats = await dashboardService.getUserStats(user.email);
    return c.json(stats);
  } catch (error) {
    return c.json({ error: 'Internal server error' }, 500);
  }
});

dashboard.get('/usage', async (c) => {
  const user = c.get('user');
  const prisma = await getPrisma(c.env.DATABASE_URL);
  const dashboardService = new DashboardService(prisma);

  try {
    const usage = await dashboardService.getUserUsage(user.email);
    return c.json(usage);
  } catch (error) {
    return c.json({ error: 'Internal server error' }, 500);
  }
});

export default dashboard;
