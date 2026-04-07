import prisma from '../utils/prisma.js';
import { slugGenerator } from './slugGenerator.js';

interface CreateLinkOptions {
  userId: string;
  userEmail: string;
  userRole?: string;
  originalUrl: string;
  customSlug?: string;
  title?: string;
  tags?: string[];
}

export class LinkService {
  /**
   * Core business logic for creating a short link.
   * Handles user syncing, plan limit validation, slug collision detection, and persistence.
   */
  async createLink(options: CreateLinkOptions) {
    const { userId, userEmail, userRole, originalUrl, customSlug, title, tags } = options;

    // 1. Synchronize or Fetch User with Plan details
    const user = await prisma.user.upsert({
      where: { email: userEmail },
      update: {},
      create: {
        id: userId,
        email: userEmail,
        role: (userRole as any) || 'USER',
        plan: 'free',
        planTier: {
          connect: { tierName: 'FREE' },
        },
      },
      include: {
        planTier: true,
        _count: {
          select: { links: true },
        },
      },
    });

    // 2. Validate Plan Limits
    if (user.planTier && user._count.links >= user.planTier.monthlyLinks) {
      throw new Error(`Usage limit reached: Your current plan allows up to ${user.planTier.monthlyLinks} links.`);
    }

    let shortSlug = customSlug;

    // 3. Collision Check & Slug Generation
    if (shortSlug) {
      const existing = await prisma.link.findUnique({
        where: { shortSlug },
      });
      if (existing) {
        throw new Error('Collision: The requested custom slug is already in use.');
      }
    } else {
      let isUnique = false;
      let attempts = 0;
      const MAX_ATTEMPTS = 5;

      while (!isUnique && attempts < MAX_ATTEMPTS) {
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
        throw new Error('System error: Failed to generate a unique slug after several attempts.');
      }
    }

    // 4. Persist the Link
    return await prisma.link.create({
      data: {
        userId: user.id,
        originalUrl,
        shortSlug: shortSlug!,
        title: title || originalUrl,
        tags: tags || [],
        status: 'ACTIVE',
      },
    });
  }

  /**
   * Retrieves all links for a specific user with advanced search and filtering.
   */
  async getUserLinks(options: {
    email: string;
    search?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
  }) {
    const { email, search, status, startDate, endDate } = options;

    const where: any = {
      user: { email: email },
    };

    // 1. Status Filter
    if (status) {
      where.status = status;
    }

    // 2. Date Range Filter
    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = new Date(startDate);
      if (endDate) where.createdAt.lte = new Date(endDate);
    }

    // 3. Search Filter (Text match in title, slug, url or tags)
    if (search) {
      where.AND = [
        {
          OR: [
            { title: { contains: search, mode: 'insensitive' } },
            { shortSlug: { contains: search, mode: 'insensitive' } },
            { originalUrl: { contains: search, mode: 'insensitive' } },
            { tags: { has: search } },
          ],
        },
      ];
    }

    return await prisma.link.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { clicksAnalytics: true },
        },
      },
    });
  }
}

export const linkService = new LinkService();
