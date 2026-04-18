import type { PrismaClient } from '../generated/client';

export class AnalyticsService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  /**
   * Records a click event.
   * In Workers, we get Geolocation for free from the request!
   */
  async recordClick(linkId: string, options: {
    ip?: string;
    country?: string;
    city?: string;
    userAgent?: string;
    referrer?: string;
    isQr?: boolean;
  }) {
    const { ip, country, userAgent, referrer, isQr } = options;

    return await this.prisma.clicksAnalytics.create({
      data: {
        linkId,
        ip,
        country,
        device: this.parseDevice(userAgent),
        referrer: this.parseReferrer(referrer),
        isQr: isQr || false,
      },
    });
  }

  private parseDevice(userAgent?: string): string {
    if (!userAgent) return 'Unknown';
    if (/mobile/i.test(userAgent)) return 'Mobile';
    if (/tablet/i.test(userAgent)) return 'Tablet';
    return 'Desktop';
  }

  private parseReferrer(referrer?: string): string {
    if (!referrer) return 'Direct';
    try {
      const url = new URL(referrer);
      return url.hostname;
    } catch {
      return 'Other';
    }
  }

  /**
   * Fetches analytics for a specific link over the last 30 days.
   */
  async getLinkAnalytics(linkId: string) {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const [clicks, stats] = await Promise.all([
      this.prisma.clicksAnalytics.findMany({
        where: { linkId, clickedAt: { gte: thirtyDaysAgo } },
        orderBy: { clickedAt: 'asc' },
      }),
      this.prisma.clicksAnalytics.groupBy({
        by: ['country', 'device', 'referrer'],
        where: { linkId },
        _count: { _all: true },
      }),
    ]);

    return { clicks, stats };
  }
}
