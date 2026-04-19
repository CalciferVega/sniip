import { json } from '@sveltejs/kit';
import { domainService } from '$lib/server/services/domainService';
import { createServerClient } from '$lib/server/supabase';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ request }) => {
  const authHeader = request.headers.get('Authorization');
  const token = authHeader?.split(' ')[1];
  
  const supabase = createServerClient(token);
  const { data: { user }, error } = await supabase.auth.getUser(token);
  
  if (error || !user) {
    return json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const domains = await domainService.getUserDomains(user.id);
    return json(domains);
  } catch (err: any) {
    return json({ error: err.message }, { status: 500 });
  }
};

export const POST: RequestHandler = async ({ request }) => {
  const authHeader = request.headers.get('Authorization');
  const token = authHeader?.split(' ')[1];
  
  const supabase = createServerClient(token);
  const { data: { user }, error } = await supabase.auth.getUser(token);
  
  if (error || !user) {
    return json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  try {
    const domain = await domainService.createDomain(user.id, body.hostname);
    return json(domain, { status: 201 });
  } catch (err: any) {
    return json({ error: err.message }, { status: 400 });
  }
};
