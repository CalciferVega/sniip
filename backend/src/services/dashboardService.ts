import prisma from '../utils/prisma.js';

export class DashboardService {
  /**
   * Aggregates global dashboard statistics for a specific user.
   */
  async getUserStats(userEmail: string) {
    // 1. Fetch basic counts
    const [totalLinks, activeLinks, totalClicks, qrScans] = await Promise.all([
      // Total Links
      prisma.link.count({
        where: { user: { email: userEmail } },
      }),
      // Active Links
      prisma.link.count({
        where: { user: { email: userEmail }, status: 'ACTIVE' },
      }),
      // Total Clicks
      prisma.clicksAnalytics.count({
        where: { link: { user: { email: userEmail } } },
      }),
      // QR Scans
      prisma.clicksAnalytics.count({
        where: { link: { user: { email: userEmail } }, isQr: true },
      }),
    ]);

    /**
     * CTR (Click-Through Rate) Logic:
     * In a professional shortener, without explicit "impressions" tracking,
     * we can use a representative ratio or a simplified "Clicks per Link" metric.
     * Here we calculate it as Average Clicks per Total Link.
     */
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
    const user = await prisma.user.findUnique({
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

    // Calculate reset date (e.g., 30 days after creation or next month)
    // For now, let's say it resets at the same day next month
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

export const dashboardService = new DashboardService();
