import type { FastifyRequest, FastifyReply } from 'fastify';
import prisma from '../utils/prisma.js';
import { slugGenerator } from '../services/slugGenerator.js';

interface CreateLinkBody {
  originalUrl: string;
  customSlug?: string;
  title?: string;
  tags?: string[];
}

/**
 * Controller for creating a new short link.
 * Implements duplicate prevention, custom slug validation, and user synchronization.
 */
export const createLink = async (
  request: FastifyRequest<{ Body: CreateLinkBody }>,
  reply: FastifyReply
) => {
  const { originalUrl, customSlug, title, tags } = request.body;
  const user = request.user;

  // This check is redundant due to authMiddleware but good for type safety
  if (!user || !user.email) {
    return reply.status(401).send({ error: 'Unauthorized: User email required' });
  }

  try {
    // 1. Sync Firebase User with our Local Database
    // We use email as the unique identifier to handle provider changes if needed
    const dbUser = await prisma.user.upsert({
      where: { email: user.email },
      update: {}, 
      create: {
        id: user.uid,
        email: user.email,
        role: (user.role as any) || 'USER',
      },
    });

    let shortSlug = customSlug;

    // 2. Slug Validation and Generation
    if (shortSlug) {
      // Custom slug validation: check for availability
      const existing = await prisma.link.findUnique({
        where: { shortSlug },
      });
      if (existing) {
        return reply.status(400).send({ error: 'Custom slug is already taken' });
      }
    } else {
      // Auto-generate a unique Base62 slug
      let isUnique = false;
      let attempts = 0;
      
      while (!isUnique && attempts < 5) {
        shortSlug = slugGenerator.generateRandom(6);
        const existing = await prisma.link.findUnique({
          where: { shortSlug },
        });
        if (!existing) {
          isUnique = true;
        }
        attempts++;
      }

      if (!isUnique) {
        return reply.status(500).send({ error: 'System busy: Could not generate a unique slug' });
      }
    }

    // 3. Persist the Link
    const link = await prisma.link.create({
      data: {
        userId: dbUser.id,
        originalUrl,
        shortSlug: shortSlug!,
        title: title || originalUrl, // Default title to URL if not provided
        tags: tags || [],
        status: 'ACTIVE',
      },
    });

    return reply.status(201).send(link);
  } catch (error: any) {
    request.log.error(error);
    
    // Handle specific Prisma errors (like P2002 Unique Constraint)
    if (error.code === 'P2002') {
      return reply.status(400).send({ error: 'The short slug is already in use' });
    }

    return reply.status(500).send({ error: 'Internal server error while creating link' });
  }
};

/**
 * Controller to list all links for the authenticated user.
 */
export const listLinks = async (request: FastifyRequest, reply: FastifyReply) => {
  const user = request.user;
  if (!user) return reply.status(401).send({ error: 'Unauthorized' });

  try {
    const links = await prisma.link.findMany({
      where: {
        user: {
          email: user.email
        }
      },
      orderBy: { createdAt: 'desc' },
    });

    return reply.send(links);
  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({ error: 'Internal server error' });
  }
};
