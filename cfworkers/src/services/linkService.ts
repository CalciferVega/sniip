import { slugGenerator } from './slugGenerator.js';
import type { PrismaClient } from '../generated/client';

export class LinkService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  /**
   * Core business logic for creating a short link.
   */
  async createLink(options: {
    userId: string;
    userEmail: string;
    userRole?: string;
    originalUrl: string;
    customSlug?: string;
    title?: string;
    tags?: string[];
  }) {
    const { userId, userEmail, userRole, originalUrl, customSlug, title, tags } = options;

    // 1. Synchronize or Fetch User with Plan details
    const user = await this.prisma.user.upsert({
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
      const existing = await this.prisma.link.findUnique({
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
        shortSlug = slugGenerator.generate(6);
        const existing = await this.prisma.link.findUnique({
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
    return await this.prisma.link.create({
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

    if (status) where.status = status;

    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = new Date(startDate);
      if (endDate) where.createdAt.lte = new Date(endDate);
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { shortSlug: { contains: search, mode: 'insensitive' } },
        { originalUrl: { contains: search, mode: 'insensitive' } },
        { tags: { hasSome: [search] } },
      ];
    }

    return await this.prisma.link.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { clicksAnalytics: true },
        },
      },
    });
  }

  async resolveSlug(slug: string) {
    return this.prisma.link.findUnique({
      where: { shortSlug: slug },
      include: { user: true },
    });
  }
}
