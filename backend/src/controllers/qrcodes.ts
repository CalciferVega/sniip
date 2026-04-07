import type { FastifyRequest, FastifyReply } from 'fastify';
import prisma from '../utils/prisma.js';

interface CreateQrCodeBody {
  linkId: string;
  designConfig: any;
  imageUrl: string;
}

/**
 * Controller to create a new QR code record.
 */
export const createQrCode = async (request: FastifyRequest<{ Body: CreateQrCodeBody }>, reply: FastifyReply) => {
  const { linkId, designConfig, imageUrl } = request.body;

  if (!linkId || !designConfig || !imageUrl) {
    return reply.status(400).send({ error: 'Missing required fields: linkId, designConfig, or imageUrl' });
  }

  try {
    // 1. Verify that the link exists and belongs to the user
    const link = await prisma.link.findFirst({
      where: {
        id: linkId,
        userId: (request as any).user.id,
      },
    });

    if (!link) {
      return reply.status(404).send({ error: 'Link not found or unauthorized' });
    }

    // 2. Create the QR Code record
    const qrCode = await prisma.qrCode.create({
      data: {
        linkId,
        designConfig,
        imageUrl,
      },
    });

    return reply.status(201).send(qrCode);
  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({ error: 'Internal server error while creating QR code' });
  }
};

/**
 * Controller to list all QR codes for the current user.
 */
export const listQrCodes = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const userId = (request as any).user.id;

    const qrCodes = await prisma.qrCode.findMany({
      where: {
        link: {
          userId,
        },
      },
      include: {
        link: true,
      },
      orderBy: {
        id: 'desc', // Simple ordering since we don't have createdAt on QrCode model yet
      },
    });

    return reply.send(qrCodes);
  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({ error: 'Internal server error while fetching QR codes' });
  }
};
