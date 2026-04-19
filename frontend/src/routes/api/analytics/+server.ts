import { json } from '@sveltejs/kit';
import { analyticsService } from '$lib/server/services/analyticsService';
import { createServerClient } from '$lib/server/supabase';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ request, url }) => {
  const authHeader = request.headers.get('Authorization');
  const token = authHeader?.split(' ')[1];
  
  const supabase = createServerClient(token);
  const { data: { user }, error } = await supabase.auth.getUser(token);
  
  if (error || !user) {
    return json({ error: 'Unauthorized' }, { status: 401 });
  }

  const linkId = url.searchParams.get('id');
  if (!linkId) {
    return json({ error: 'Missing link id' }, { status: 400 });
  }

  try {
    const analytics = await analyticsService.getLinkAnalytics(user.id, linkId);
    return json(analytics);
  } catch (err: any) {
    return json({ error: err.message }, { status: 500 });
  }
};
