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
    return qrCode;
  }

  async getUserQrCodes(userId: string) {
    const supabase = createServerClient();
    
    // In Supabase, we can join on the link to filter by user_id
    const { data, error } = await supabase
      .from('qr_codes')
      .select('*, links!inner(*)')
      .eq('links.user_id', userId);

    if (error) throw error;
    return data;
  }
}

export const qrService = new QrService();
