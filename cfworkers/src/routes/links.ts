import { Hono } from 'hono';
import { getPrisma } from '../lib/prisma';
import { LinkService } from '../services/linkService';

const links = new Hono<{ Bindings: { DATABASE_URL: string }, Variables: { user: any } }>();

// Auth middleware will inject the 'user' variable later
// For now we assume user is present or we skip validation

links.get('/', async (c) => {
  const user = c.get('user');
  if (!user) return c.json({ error: 'Unauthorized' }, 401);

  const prisma = await getPrisma(c.env.DATABASE_URL);
  const linkService = new LinkService(prisma);
  
  const search = c.req.query('search');
  const status = c.req.query('status');

  try {
    const results = await linkService.getUserLinks({
      email: user.email,
      search,
      status
    });
    return c.json(results);
  } catch (error) {
    console.error(error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

links.post('/', async (c) => {
  const user = c.get('user');
  if (!user) return c.json({ error: 'Unauthorized' }, 401);

  const body = await c.req.json();
  const prisma = await getPrisma(c.env.DATABASE_URL);
  const linkService = new LinkService(prisma);

  try {
    const link = await linkService.createLink({
      userId: user.uid,
      userEmail: user.email,
      userRole: user.role,
      originalUrl: body.originalUrl,
      customSlug: body.customSlug,
      title: body.title,
      tags: body.tags
    });
    return c.json(link, 201);
  } catch (error: any) {
    console.error(error);
    return c.json({ error: error.message }, 400);
  }
});

export default links;
