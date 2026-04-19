import { redirect, error } from '@sveltejs/kit';
import { linkService } from '$lib/server/services/linkService';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params, request, url }) => {
  const { slug } = params;

  if (!slug || slug.length < 3) {
    throw error(404, 'Link not found');
  }

  // Get client info for analytics
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('cf-connecting-ip');
  const userAgent = request.headers.get('user-agent') || undefined;
  const referrer = request.headers.get('referer') || undefined;
  const isQr = url.searchParams.get('qr') === '1' || url.searchParams.get('qr') === 'true';

  try {
    const originalUrl = await linkService.resolveSlug(slug, {
        ip: ip || undefined,
        userAgent,
        referrer,
        isQr
    });

    if (!originalUrl) {
      throw error(404, 'Link not found or inactive');
    }

    // Perform 302 redirection
    throw redirect(302, originalUrl);
  } catch (err: any) {
    // If it's a SvelteKit redirect or error, rethrow it
    if (err.status) throw err;
    
    console.error('Redirection error:', err);
    throw error(500, 'Internal server error while redirecting');
  }
};
