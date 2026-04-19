import { createServerClient } from '../supabase.js';

export class DashboardService {
  /**
   * Aggregates real-time statistics for the user dashboard.
   */
  async getUserStats(userId: string) {
    const supabase = createServerClient();

    // 1. Total Links
    const { count: totalLinks } = await supabase
      .from('links')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('status', 'ACTIVE');

    // 2. Total Clicks (sum across all user's links)
    // This is more complex in Supabase without a joined count or RPC
    // For now, we'll fetch links and their counts, or use a specific query
    const { data: links } = await supabase
      .from('links')
      .select('id, clicks_analytics(count)')
      .eq('user_id', userId);

    const totalClicks = links?.reduce((acc, link: any) => acc + (link.clicks_analytics?.[0]?.count || 0), 0) || 0;

    // 3. QR Scans (clicks where is_qr = true)
    const { data: qrLinks } = await supabase
      .from('links')
      .select('id, clicks_analytics(count)')
      .eq('user_id', userId);
    
    // Note: To filter by is_qr, we really need a more direct query on clicks_analytics
    const { count: qrScans } = await supabase
      .from('clicks_analytics')
      .select('id', { count: 'exact', head: true })
      .eq('is_qr', true)
      .in('link_id', links?.map(l => l.id) || []);

    // 4. Calculate Average CTR
    // (Total Clicks / (Active Links * arbitrary constant if we had impressions, but we don't))
    // Usually CTR = Clicks / Impressions. Since we don't track impressions, 
    // we'll return a placeholder or based on some other metric.
    const averageCtr = totalLinks ? Math.round((totalClicks / (totalLinks * 100)) * 100) : 0;

    return {
      totalClicks,
      activeLinks: totalLinks || 0,
      qrScans: qrScans || 0,
      averageCtr,
      totalLinks: totalLinks || 0
    };
  }

  /**
   * Calculates usage consumption against plan limits.
   */
  async getUsage(userId: string) {
    const supabase = createServerClient();

    const { data: user } = await supabase
      .from('users')
      .select('*, plans(*)')
      .eq('id', userId)
      .single();

    const { count: used } = await supabase
      .from('links')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);

    const total = user?.plans?.monthly_links || 25;

    return {
      used: used || 0,
      total,
      resetDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString() // Placeholder
    };
  }
}

export const dashboardService = new DashboardService();
