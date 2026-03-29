import type { FastifyInstance } from 'fastify';
import { createLink, listLinks } from '../controllers/links.js';

/**
 * Routes for link management.
 * All these routes are intended to be protected by authMiddleware.
 */
export default async function linksRoutes(fastify: FastifyInstance) {
  // POST /links - Create a new short link
  fastify.post('/', {
    schema: {
      body: {
        type: 'object',
        required: ['originalUrl'],
        properties: {
          originalUrl: { type: 'string', format: 'uri' },
          customSlug: { type: 'string', minLength: 3, maxLength: 50 },
          title: { type: 'string', maxLength: 100 },
          tags: { type: 'array', items: { type: 'string' } }
        }
      }
    }
  }, createLink);

  // GET /links - List all links for the current user
  fastify.get('/', listLinks);
}
