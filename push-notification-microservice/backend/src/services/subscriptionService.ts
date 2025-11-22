import prisma from '../config/database';
import { SubscriptionData } from '../types';
import { parseUserAgent } from '../utils/parser';

export class SubscriptionService {
  async subscribe(projectId: string, data: SubscriptionData, ipAddress?: string) {
    const browserDetails = data.browserDetails?.userAgent
      ? parseUserAgent(data.browserDetails.userAgent)
      : data.browserDetails;

    // Check if subscription already exists
    const existing = await prisma.subscription.findFirst({
      where: {
        projectId,
        endpoint: data.endpoint,
      },
    });

    if (existing) {
      // Reactivate if previously unsubscribed
      return prisma.subscription.update({
        where: { id: existing.id },
        data: {
          isActive: true,
          unsubscribedAt: null,
          p256dhKey: data.keys.p256dh,
          authKey: data.keys.auth,
          lastSeenAt: new Date(),
          userAgent: browserDetails?.userAgent,
          browserName: browserDetails?.browser?.name,
          browserVersion: browserDetails?.browser?.version,
          osName: browserDetails?.os?.name,
          osVersion: browserDetails?.os?.version,
          deviceType: browserDetails?.deviceType,
          timezone: data.metadata?.timezone,
          language: data.metadata?.language,
          ipAddress,
        },
      });
    }

    // Create new subscription
    return prisma.subscription.create({
      data: {
        projectId,
        endpoint: data.endpoint,
        p256dhKey: data.keys.p256dh,
        authKey: data.keys.auth,
        userAgent: browserDetails?.userAgent,
        browserName: browserDetails?.browser?.name,
        browserVersion: browserDetails?.browser?.version,
        osName: browserDetails?.os?.name,
        osVersion: browserDetails?.os?.version,
        deviceType: browserDetails?.deviceType,
        timezone: data.metadata?.timezone,
        language: data.metadata?.language,
        ipAddress,
      },
    });
  }

  async unsubscribe(projectId: string, endpoint: string) {
    return prisma.subscription.updateMany({
      where: {
        projectId,
        endpoint,
      },
      data: {
        isActive: false,
        unsubscribedAt: new Date(),
      },
    });
  }

  async updateSubscription(
    subscriptionId: string,
    projectId: string,
    data: { tags?: Record<string, string>; lastSeen?: Date }
  ) {
    const updates: any = {};

    if (data.lastSeen) {
      updates.lastSeenAt = data.lastSeen;
    }

    const subscription = await prisma.subscription.update({
      where: { id: subscriptionId, projectId },
      data: updates,
    });

    // Handle tags if provided
    if (data.tags) {
      for (const [key, value] of Object.entries(data.tags)) {
        await prisma.subscriptionTag.upsert({
          where: {
            subscriptionId_tagKey: {
              subscriptionId,
              tagKey: key,
            },
          },
          create: {
            subscriptionId,
            tagKey: key,
            tagValue: value,
          },
          update: {
            tagValue: value,
          },
        });
      }
    }

    return subscription;
  }

  async getSubscriptions(
    projectId: string,
    options: {
      page?: number;
      limit?: number;
      isActive?: boolean;
      search?: string;
    }
  ) {
    const { page = 1, limit = 50, isActive, search } = options;
    const skip = (page - 1) * limit;

    const where: any = { projectId };

    if (isActive !== undefined) {
      where.isActive = isActive;
    }

    if (search) {
      where.OR = [
        { browserName: { contains: search, mode: 'insensitive' } },
        { osName: { contains: search, mode: 'insensitive' } },
        { deviceType: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [subscriptions, total] = await Promise.all([
      prisma.subscription.findMany({
        where,
        skip,
        take: limit,
        orderBy: { subscribedAt: 'desc' },
        include: {
          tags: true,
        },
      }),
      prisma.subscription.count({ where }),
    ]);

    return {
      subscriptions,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getSubscriptionById(subscriptionId: string, projectId: string) {
    return prisma.subscription.findFirst({
      where: { id: subscriptionId, projectId },
      include: {
        tags: true,
      },
    });
  }

  async getActiveSubscriptionsForProject(projectId: string) {
    return prisma.subscription.findMany({
      where: {
        projectId,
        isActive: true,
      },
    });
  }

  async filterSubscriptions(projectId: string, criteria: any) {
    const where: any = {
      projectId,
      isActive: true,
    };

    if (criteria.browser) {
      where.browserName = { contains: criteria.browser, mode: 'insensitive' };
    }

    if (criteria.os) {
      where.osName = { contains: criteria.os, mode: 'insensitive' };
    }

    if (criteria.subscriptionIds && criteria.subscriptionIds.length > 0) {
      where.id = { in: criteria.subscriptionIds };
    }

    let subscriptions = await prisma.subscription.findMany({
      where,
    });

    // Filter by tags if provided
    if (criteria.tags && Object.keys(criteria.tags).length > 0) {
      const subscriptionIds = subscriptions.map((s) => s.id);

      const tagsFilter = Object.entries(criteria.tags).map(([key, value]) => ({
        subscriptionId: { in: subscriptionIds },
        tagKey: key,
        tagValue: value as string,
      }));

      const matchingTags = await prisma.subscriptionTag.findMany({
        where: {
          OR: tagsFilter,
        },
        select: {
          subscriptionId: true,
        },
        distinct: ['subscriptionId'],
      });

      const matchingSubIds = matchingTags.map((t) => t.subscriptionId);
      subscriptions = subscriptions.filter((s) => matchingSubIds.includes(s.id));
    }

    return subscriptions;
  }
}
