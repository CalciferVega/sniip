import prisma from '../utils/prisma.js';

export class AnalyticsService {
  /**
   * Aggregates comprehensive analytics for a specific link.
   */
  async getLinkAnalytics(linkId: string) {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // 1. Fetch all analytics for the last 30 days + totals
    const [totalClicks, uniqueVisitors, countryStats, referrerStats, timeline] = await Promise.all([
      // Total Clicks
      prisma.clicksAnalytics.count({ where: { linkId } }),

      // Unique Visitors (based on IP)
      prisma.clicksAnalytics.groupBy({
        by: ['ip'],
        where: { linkId },
        _count: true,
      }).then(res => res.length),

      // Top Countries
      prisma.clicksAnalytics.groupBy({
        by: ['country'],
        where: { linkId },
        _count: { _all: true },
        orderBy: { _count: { country: 'desc' } },
        take: 5,
      }),

      // Top Referrers (Traffic Sources)
      prisma.clicksAnalytics.groupBy({
        by: ['referrer'],
        where: { linkId },
        _count: { _all: true },
        orderBy: { _count: { referrer: 'desc' } },
        take: 5,
      }),

      // Timeline (Last 30 days)
      prisma.$queryRaw`
        SELECT 
          TO_CHAR(clicked_at, 'YYYY-MM-DD') as date, 
          COUNT(*)::int as count
        FROM clicks_analytics
        WHERE link_id = ${linkId} AND clicked_at >= ${thirtyDaysAgo}
        GROUP BY date
        ORDER BY date ASC
      ` as Promise<any[]>,
    ]);

    // Format top stats for the frontend
    const topCountries = countryStats.map(c => ({
      country: c.country || 'Unknown',
      count: c._count._all,
    }));

    const topReferrers = referrerStats.map(r => ({
      referrer: r.referrer || 'Direct',
      count: r._count._all,
    }));

    // Ensure timeline has all 30 days (even those with 0 clicks)
    const formattedTimeline = this.fillTimelineGaps(timeline, thirtyDaysAgo);

    return {
      totalClicks,
      uniqueVisitors,
      topCountry: topCountries[0]?.country || 'Unknown',
      top5Countries: topCountries,
      top5TrafficSources: topReferrers,
      timeline: formattedTimeline,
    };
  }

  /**
   * Fills in missing dates in the timeline with 0 counts.
   */
  private fillTimelineGaps(timeline: any[], startDate: Date) {
    const map = new Map(timeline.map(item => [item.date, item.count]));
    const result = [];
    
    for (let i = 0; i <= 30; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];
      
      result.push({
        date: dateStr,
        count: map.get(dateStr) || 0
      });
    }
    
    return result;
  }
}

export const analyticsService = new AnalyticsService();
