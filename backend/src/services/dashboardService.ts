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
}

export const dashboardService = new DashboardService();
