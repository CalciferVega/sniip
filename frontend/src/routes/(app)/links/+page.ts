import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
  // TODO: Check if user has links from backend
  const hasLinks = false; // Mocking 0 links for now

  if (!hasLinks) {
    throw redirect(302, '/links/new');
  }

  return {
    hasLinks
  };
};
