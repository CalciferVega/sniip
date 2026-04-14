import type { FastifyRequest, FastifyReply } from 'fastify';
import prisma from '../utils/prisma.js';

/**
 * Retrieves all custom domains for the authenticated user's organization.
 */
export const getDomains = async (request: FastifyRequest, reply: FastifyReply) => {
  const { organizationId } = request.user as any;

  if (!organizationId) {
    return reply.send([]);
  }

  try {
    const domains = await prisma.domain.findMany({
      where: { organizationId },
      orderBy: { createdAt: 'desc' },
    });
    return reply.send(domains);
  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({ error: 'Failed to fetch domains' });
  }
};

/**
 * Registers a new custom domain for an organization.
 * Validates plan limits and basic hostname format.
 */
export const createDomain = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id: userId, organizationId } = request.user as any;
  const { hostname } = request.body as { hostname: string };

  if (!hostname) {
    return reply.status(400).send({ error: 'Hostname is required' });
  }

  // Basic hostname validation
  const hostnameRegex = /^[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i;
  if (!hostnameRegex.test(hostname)) {
    return reply.status(400).send({ error: 'Invalid hostname format' });
  }

  try {
    // 1. If user doesn't have an organization yet, create one (Enterprise logic)
    let orgId = organizationId;
    if (!orgId) {
      // Check if user's plan allows organizations
      const userWithPlan = await prisma.user.findUnique({
        where: { id: userId },
        include: { planTier: true }
      });

      if (!userWithPlan || userWithPlan.planTier.maxOrganizations === 0) {
        return reply.status(403).send({ 
          error: 'Your current plan does not support custom domains. Please upgrade to Pro or higher.' 
        });
      }

      // Create a default organization for the user
      const newOrg = await prisma.organization.create({
        data: {
          name: `${userWithPlan.email.split('@')[0]}'s Org`,
          ownerId: userId,
        }
      });

      // Link user to this org
      await prisma.user.update({
        where: { id: userId },
        data: { organizationId: newOrg.id }
      });

      orgId = newOrg.id;
    }

    // 2. Check if domain already exists
    const existing = await prisma.domain.findUnique({
      where: { hostname }
    });

    if (existing) {
      return reply.status(409).send({ error: 'This domain is already registered in our system.' });
    }

    // 3. Create the domain
    const domain = await prisma.domain.create({
      data: {
        hostname,
        organizationId: orgId,
        verified: false, // Default to unverified
      }
    });

    return reply.status(201).send(domain);
  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({ error: 'Internal server error while adding domain' });
  }
};

/**
 * Simulates domain verification (checking CNAME records).
 */
export const verifyDomain = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };

  try {
    const domain = await prisma.domain.findUnique({
      where: { id }
    });

    if (!domain) {
      return reply.status(404).send({ error: 'Domain not found' });
    }

    // In a real production app, we would use 'dns.resolveCname' here
    // For this prototype, we'll simulate a 80% success rate if the user clicks verify
    const isSuccess = Math.random() > 0.2;

    if (isSuccess) {
      const updated = await prisma.domain.update({
        where: { id },
        data: { verified: true }
      });
      return reply.send({ success: true, domain: updated });
    } else {
      return reply.status(400).send({ 
        error: 'CNAME record not found. Please ensure your domain points to cname.sniip.io and wait a few minutes for propagation.' 
      });
    }
  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({ error: 'Verification failed' });
  }
};

/**
 * Removes a domain.
 */
export const deleteDomain = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };

  try {
    await prisma.domain.delete({
      where: { id }
    });
    return reply.status(204).send();
  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({ error: 'Failed to delete domain' });
  }
};
