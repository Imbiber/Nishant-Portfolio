import prisma from '../config/database';
import { generateVAPIDKeys } from '../utils/vapid';

export class ProjectService {
  async createProject(userId: string, name: string, domain?: string) {
    const vapidKeys = generateVAPIDKeys();

    const project = await prisma.project.create({
      data: {
        name,
        domain,
        userId,
        vapidPublicKey: vapidKeys.publicKey,
        vapidPrivateKey: vapidKeys.privateKey,
      },
      select: {
        id: true,
        name: true,
        apiKey: true,
        vapidPublicKey: true,
        domain: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return project;
  }

  async getProjectsByUserId(userId: string) {
    return prisma.project.findMany({
      where: { userId },
      select: {
        id: true,
        name: true,
        apiKey: true,
        vapidPublicKey: true,
        domain: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            subscriptions: {
              where: { isActive: true },
            },
            notifications: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getProjectById(projectId: string, userId: string) {
    return prisma.project.findFirst({
      where: { id: projectId, userId },
      select: {
        id: true,
        name: true,
        apiKey: true,
        vapidPublicKey: true,
        domain: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async getProjectByApiKey(apiKey: string) {
    return prisma.project.findUnique({
      where: { apiKey },
      select: {
        id: true,
        name: true,
        apiKey: true,
        vapidPublicKey: true,
        vapidPrivateKey: true,
        vapidEmail: true,
        domain: true,
        isActive: true,
      },
    });
  }

  async updateProject(projectId: string, userId: string, data: { name?: string; domain?: string; isActive?: boolean }) {
    return prisma.project.update({
      where: { id: projectId, userId },
      data,
      select: {
        id: true,
        name: true,
        apiKey: true,
        vapidPublicKey: true,
        domain: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async deleteProject(projectId: string, userId: string) {
    await prisma.project.delete({
      where: { id: projectId, userId },
    });
  }

  async regenerateApiKey(projectId: string, userId: string) {
    const crypto = await import('crypto');
    const newApiKey = crypto.randomUUID();

    return prisma.project.update({
      where: { id: projectId, userId },
      data: { apiKey: newApiKey },
      select: {
        id: true,
        name: true,
        apiKey: true,
        vapidPublicKey: true,
        domain: true,
        isActive: true,
      },
    });
  }
}
