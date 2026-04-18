import type { PrismaClient } from '../generated/client';

export class DashboardService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  /**
   * Aggregates global dashboard statistics for a specific user.
   */
  async getUserStats(userEmail: string) {
    // 1. Fetch basic counts
    const [totalLinks, activeLinks, totalClicks, qrScans] = await Promise.all([
      // Total Links
      this.prisma.link.count({
        where: { user: { email: userEmail } },
      }),
      // Active Links
      this.prisma.link.count({
        where: { user: { email: userEmail }, status: 'ACTIVE' },
      }),
      // Total Clicks
      this.prisma.clicksAnalytics.count({
        where: { link: { user: { email: userEmail } } },
      }),
      // QR Scans
      this.prisma.clicksAnalytics.count({
        where: { link: { user: { email: userEmail } }, isQr: true },
      }),
    ]);

    const avgCtr = totalLinks > 0 ? (totalClicks / totalLinks) : 0;

    return {
      totalClicks,
      activeLinks,
      qrScans,
      averageCtr: parseFloat(avgCtr.toFixed(2)),
      totalLinks,
    };
  }

  /**
   * Retrieves usage limits and current consumption for a specific user.
   */
  async getUserUsage(userEmail: string) {
    const user = await this.prisma.user.findUnique({
      where: { email: userEmail },
      include: {
        planTier: true,
        _count: {
          select: { links: true },
        },
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const createdAt = new Date(user.createdAt);
    const now = new Date();
    let resetDate = new Date(now.getFullYear(), now.getMonth(), createdAt.getDate());
    
    if (resetDate <= now) {
      resetDate.setMonth(resetDate.getMonth() + 1);
    }

    const formattedResetDate = resetDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    return {
      used: user._count.links,
      total: user.planTier?.monthlyLinks || 0,
      plan: user.planTier?.tierName.toLowerCase() || 'free',
      resetDate: formattedResetDate,
    };
  }
}
