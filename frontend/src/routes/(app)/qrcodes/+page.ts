import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
  // TODO: Check if user has QR codes from backend
  const hasQRCodes = false; // Mocking 0 QR codes for now

  if (!hasQRCodes) {
    throw redirect(302, '/qrcodes/new');
  }

  return {
    hasQRCodes
  };
};
