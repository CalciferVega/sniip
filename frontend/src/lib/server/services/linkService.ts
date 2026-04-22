import { createServerClient } from '../supabase.js';
import { slugGenerator } from './slugGenerator.js';
import geoip from 'geoip-lite';

interface CreateLinkOptions {
  userId: string;
  userEmail: string;
  originalUrl: string;
  customSlug?: string;
  title?: string;
  tags?: string[];
}

export class LinkService {
  /**
   * Core business logic for creating a short link using Supabase.
   */
  async createLink(options: CreateLinkOptions) {
    const { userId, userEmail, originalUrl, customSlug, title, tags } = options;
    const supabase = createServerClient();

    // 1. Sync user and check limits
    // Note: We assume the users table exists and is synced with auth.users
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*, plans(*), links(count)')
      .eq('email', userEmail)
      .single();

    if (userError && userError.code !== 'PGRST116') { // PGRST116 is "no rows returned"
      throw new Error('Error fetching user data');
    }

    let dbUser = user;

    if (!dbUser) {
      // Auto-provision user if not found
      const { data: newUser, error: createError } = await supabase
        .from('users')
        .insert({
          id: userId,
          email: userEmail,
          role: 'USER',
          plan: 'free'
        })
        .select('*, plans(*)')
        .single();
      
      if (createError) throw new Error('Failed to provision user');
      dbUser = newUser;
    }

    // 2. Validate Plan Limits
    // In this simplified version, we'll fetch the count separately if needed
    const { count: linkCount, error: countError } = await supabase
      .from('links')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);
    
    if (countError) throw new Error('Error checking usage limits');

    const monthlyLinks = dbUser.plans?.monthly_links || 25; // Fallback to 25
    if ((linkCount || 0) >= monthlyLinks) {
      throw new Error(`Usage limit reached: Your current plan allows up to ${monthlyLinks} links.`);
    }

    let shortSlug = customSlug;

    // 3. Collision Check & Slug Generation
    if (shortSlug) {
      const { data: existing } = await supabase
        .from('links')
        .select('id')
        .eq('short_slug', shortSlug)
        .single();
      
      if (existing) {
        throw new Error('Collision: The requested custom slug is already in use.');
      }
    } else {
      let isUnique = false;
      let attempts = 0;
      const MAX_ATTEMPTS = 5;

      while (!isUnique && attempts < MAX_ATTEMPTS) {
        shortSlug = slugGenerator.generateRandom(6);
        const { data: existing } = await supabase
          .from('links')
          .select('id')
          .eq('short_slug', shortSlug)
          .single();
        
        if (!existing) {
          isUnique = true;
        }
        attempts++;
      }

      if (!isUnique) {
        throw new Error('System error: Failed to generate a unique slug.');
      }
    }

    // 4. Persist the Link
    const { data: newLink, error: insertError } = await supabase
      .from('links')
      .insert({
        user_id: userId,
        original_url: originalUrl,
        short_slug: shortSlug,
        title: title || originalUrl,
        tags: tags || [],
        status: 'ACTIVE'
      })
      .select()
      .single();

    if (insertError) throw new Error(insertError.message);

    return {
      ...newLink,
      userId: newLink.user_id,
      originalUrl: newLink.original_url,
      shortSlug: newLink.short_slug
    };
  }

  /**
   * Retrieves all links for a specific user with filtering.
   */
  async getUserLinks(userId: string, options: {
    search?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
  }) {
    const supabase = createServerClient();
    let query = supabase
      .from('links')
      .select('*, _count:clicks_analytics(count)')
      .eq('user_id', userId)
      .order('createdAt', { ascending: false });

    if (options.status) {
      query = query.eq('status', options.status);
    }

    if (options.startDate) {
      query = query.gte('createdAt', options.startDate);
    }

    if (options.endDate) {
      query = query.lte('createdAt', options.endDate);
    }

    if (options.search) {
      // Supabase text search or OR filter
      query = query.or(`title.ilike.%${options.search}%,short_slug.ilike.%${options.search}%,original_url.ilike.%${options.search}%`);
    }

    const { data, error } = await query;
    if (error) throw error;
    
    return (data || []).map(link => ({
      ...link,
      userId: link.user_id,
      originalUrl: link.original_url,
      shortSlug: link.short_slug,
      _count: {
        clicksAnalytics: link._count?.[0]?.count || 0
      }
    }));
  }

  /**
   * Resolves a short slug to its original URL and records a click.
   */
  async resolveSlug(slug: string, options: { ip?: string, userAgent?: string, referrer?: string, isQr?: boolean }) {
    const supabase = createServerClient();

    // 1. Fetch the link
    const { data: link, error } = await supabase
      .from('links')
      .select('id, original_url, status')
      .eq('short_slug', slug)
      .single();

    if (error || !link || link.status !== 'ACTIVE') {
      return null;
    }

    // 2. Record analytics (Fire and forget in Supabase)
    // We don't await this to keep the redirect fast
    this.recordClick(link.id, options);

    return link.original_url;
  }

  private async recordClick(linkId: string, options: { ip?: string, userAgent?: string, referrer?: string, isQr?: boolean }) {
    const supabase = createServerClient();
    
    // Simple device detection
    let device = 'desktop';
    if (options.userAgent) {
      if (/mobile/i.test(options.userAgent)) device = 'mobile';
      else if (/tablet/i.test(options.userAgent)) device = 'tablet';
    }

    // Country detection using geoip-lite
    let country = 'Unknown';
    if (options.ip) {
      // Handle x-forwarded-for which can be a comma-separated list
      const firstIp = options.ip.split(',')[0].trim();
      const geo = geoip.lookup(firstIp);
      if (geo) {
        country = geo.country; // e.g. "US", "ES", etc.
      }
    }

    await supabase
      .from('clicks_analytics')
      .insert({
        link_id: linkId,
        ip: options.ip,
        is_qr: options.isQr || false,
        device,
        referrer: options.referrer || 'Direct',
        country 
      });
  }
}

export const linkService = new LinkService();
