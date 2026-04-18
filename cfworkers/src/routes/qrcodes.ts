import { Hono } from 'hono';
import { getPrisma } from '../lib/prisma';

const qrcodes = new Hono<{ Bindings: { DATABASE_URL: string }, Variables: { user: any } }>();

qrcodes.get('/', async (c) => {
  const user = c.get('user');
  if (!user) return c.json({ error: 'Unauthorized' }, 401);

  const prisma = await getPrisma(c.env.DATABASE_URL);
  try {
    const data = await prisma.qrCode.findMany({
      where: { link: { userId: user.uid } },
      include: { link: true },
      orderBy: { id: 'desc' }
    });
    return c.json(data);
  } catch (error) {
    return c.json({ error: 'Internal server error' }, 500);
  }
});

qrcodes.post('/', async (c) => {
  const user = c.get('user');
  if (!user) return c.json({ error: 'Unauthorized' }, 401);

  const prisma = await getPrisma(c.env.DATABASE_URL);
  const body = await c.req.json();

  try {
    const link = await prisma.link.findFirst({
      where: { id: body.linkId, userId: user.uid }
    });

    if (!link) return c.json({ error: 'Link not found or unauthorized' }, 404);

    const qrCode = await prisma.qrCode.create({
      data: {
        linkId: body.linkId,
        designConfig: body.designConfig,
        imageUrl: body.imageUrl
      }
    });
    return c.json(qrCode, 201);
  } catch (error) {
    return c.json({ error: 'Internal server error' }, 500);
  }
});

export default qrcodes;
