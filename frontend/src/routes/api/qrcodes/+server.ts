import { json } from '@sveltejs/kit';
import { qrService } from '$lib/server/services/qrService';
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
    const qrCodes = await qrService.getUserQrCodes(user.id);
    return json(qrCodes);
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
    const qrCode = await qrService.createQrCode(user.id, body);
    return json(qrCode, { status: 201 });
  } catch (err: any) {
    return json({ error: err.message }, { status: 400 });
  }
};
