import { createServerClient } from '../supabase.js';

export class DomainService {
  async getUserDomains(userId: string) {
    const supabase = createServerClient();
    
    // Domains are linked to organizations, and users are members/owners of organizations
    const { data: user } = await supabase
      .from('users')
      .select('organization_id')
      .eq('id', userId)
      .single();

    if (!user?.organization_id) return [];

    const { data, error } = await supabase
      .from('domains')
      .select('*')
      .eq('organization_id', user.organization_id)
      .order('createdAt', { ascending: false });

    if (error) throw error;
    return data;
  }

  async createDomain(userId: string, hostname: string) {
    const supabase = createServerClient();
    
    const { data: user } = await supabase
      .from('users')
      .select('organization_id')
      .eq('id', userId)
      .single();

    if (!user?.organization_id) throw new Error('User not associated with an organization');

    const { data, error } = await supabase
      .from('domains')
      .insert({
        hostname,
        organization_id: user.organization_id,
        verified: false
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}

export const domainService = new DomainService();
