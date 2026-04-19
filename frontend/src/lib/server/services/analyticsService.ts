import { createServerClient } from '../supabase.js';

export class AnalyticsService {
  async getLinkAnalytics(userId: string, linkId: string) {
    const supabase = createServerClient();

    // 1. Verify link ownership
    const { data: link, error: linkError } = await supabase
      .from('links')
      .select('id')
      .eq('id', linkId)
      .eq('user_id', userId)
      .single();

    if (linkError || !link) {
      throw new Error('Link not found or unauthorized');
    }

    // 2. Fetch Clicks Timeline (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { data: clicks, error: clicksError } = await supabase
      .from('clicks_analytics')
      .select('*')
      .eq('link_id', linkId)
      .gte('clicked_at', thirtyDaysAgo.toISOString());

    if (clicksError) throw clicksError;

    // 3. Process data for the frontend
    // (This logic would normally be more extensive, but here's a summary)
    const totalClicks = clicks.length;
    const qrScans = clicks.filter(c => c.is_qr).length;
    
    // Group by country
    const countries = clicks.reduce((acc: any, c) => {
      acc[c.country || 'Unknown'] = (acc[c.country || 'Unknown'] || 0) + 1;
      return acc;
    }, {});

    return {
      totalClicks,
      qrScans,
      countries: Object.entries(countries).map(([name, value]) => ({ name, value })),
      timeline: [] // Simplified
    };
  }
}

export const analyticsService = new AnalyticsService();
