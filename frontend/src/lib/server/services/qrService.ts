import { createServerClient } from '../supabase.js';

export class QrService {
  async createQrCode(userId: string, data: { linkId: string, designConfig: any, imageUrl: string }) {
    const supabase = createServerClient();

    // 1. Verify link ownership
    const { data: link, error: linkError } = await supabase
      .from('links')
      .select('id')
      .eq('id', data.linkId)
      .eq('user_id', userId)
      .single();

    if (linkError || !link) {
      throw new Error('Link not found or unauthorized');
    }

    // 2. Create QR Code
    const { data: qrCode, error: qrError } = await supabase
      .from('qr_codes')
      .insert({
        link_id: data.linkId,
        design_config: data.designConfig,
        image_url: data.imageUrl
      })
      .select()
      .single();

    if (qrError) throw qrError;
    
    return {
      ...qrCode,
      imageUrl: qrCode.image_url,
      designConfig: qrCode.design_config,
      linkId: qrCode.link_id
    };
  }

  async getUserQrCodes(userId: string) {
    const supabase = createServerClient();
    
    // In Supabase, we can join on the link to filter by user_id
    const { data, error } = await supabase
      .from('qr_codes')
      .select('*, links!inner(*)')
      .eq('links.user_id', userId)
      .order('id', { ascending: false });

    if (error) throw error;
    
    return (data || []).map(qr => ({
      ...qr,
      imageUrl: qr.image_url,
      designConfig: qr.design_config,
      linkId: qr.link_id,
      link: qr.links ? {
        ...qr.links,
        shortSlug: qr.links.short_slug,
        originalUrl: qr.links.original_url,
        userId: qr.links.user_id,
        createdAt: qr.links.createdAt
      } : null
    }));
  }
}

export const qrService = new QrService();
