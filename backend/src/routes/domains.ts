import type { FastifyInstance } from 'fastify';
import { getDomains, createDomain, verifyDomain, deleteDomain } from '../controllers/domains.js';

export default async function domainRoutes(fastify: FastifyInstance) {
  // GET /api/domains - List all domains for the user's organization
  fastify.get('/', getDomains);

  // POST /api/domains - Register a new domain
  fastify.post('/', createDomain);

  // POST /api/domains/:id/verify - Trigger CNAME verification
  fastify.post('/:id/verify', verifyDomain);

  // DELETE /api/domains/:id - Remove a domain
  fastify.delete('/:id', deleteDomain);
}
