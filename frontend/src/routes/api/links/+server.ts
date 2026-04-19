import { json } from '@sveltejs/kit';
import { linkService } from '$lib/server/services/linkService';
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

  const search = url.searchParams.get('search') || undefined;
  const status = url.searchParams.get('status') || undefined;
  const startDate = url.searchParams.get('startDate') || undefined;
  const endDate = url.searchParams.get('endDate') || undefined;

  try {
    const links = await linkService.getUserLinks(user.id, { search, status, startDate, endDate });
    return json(links);
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
    const link = await linkService.createLink({
      userId: user.id,
      userEmail: user.email!,
      originalUrl: body.originalUrl,
      customSlug: body.customSlug,
      title: body.title,
      tags: body.tags
    });
    return json(link, { status: 201 });
  } catch (err: any) {
    return json({ error: err.message }, { status: 400 });
  }
};
