import { json } from '@sveltejs/kit';
import { dashboardService } from '$lib/server/services/dashboardService';
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
    const usage = await dashboardService.getUsage(user.id);
    return json(usage);
  } catch (err: any) {
    return json({ error: err.message }, { status: 500 });
  }
};
