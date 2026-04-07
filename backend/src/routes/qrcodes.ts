import type { FastifyInstance } from 'fastify';
import { createQrCode, listQrCodes } from '../controllers/qrcodes.js';

/**
 * Routes for QR code management.
 */
export default async function qrCodeRoutes(fastify: FastifyInstance) {
  // POST /api/qrcodes - Create a new QR code
  fastify.post('/', createQrCode);

  // GET /api/qrcodes - List all QR codes for the current user
  fastify.get('/', listQrCodes);
}
