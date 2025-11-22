import prisma from '../config/database';
import { NotificationPayload } from '../types';
import { SubscriptionService } from './subscriptionService';
import webpush from 'web-push';
import { setVAPIDDetails } from '../utils/vapid';

export class NotificationService {
  private subscriptionService: SubscriptionService;

  constructor() {
    this.subscriptionService = new SubscriptionService();
  }

  async createNotification(projectId: string, payload: NotificationPayload) {
    const notification = await prisma.notification.create({
      data: {
        projectId,
        title: payload.title,
        body: payload.body,
        icon: payload.icon,
        badge: payload.badge,
        image: payload.image,
        url: payload.url,
        targetType: payload.targetType || 'all',
        targetCriteria: payload.targetCriteria || {},
        status: payload.schedule ? 'scheduled' : 'draft',
        scheduledAt: payload.schedule?.sendAt,
      },
    });

    return notification;
  }

  async sendNotification(notificationId: string) {
    const notification = await prisma.notification.findUnique({
      where: { id: notificationId },
      include: {
        project: true,
      },
    });

    if (!notification) {
      throw new Error('Notification not found');
    }

    if (!notification.project.isActive) {
      throw new Error('Project is inactive');
    }

    // Get target subscriptions
    let subscriptions;

    if (notification.targetType === 'all') {
      subscriptions = await this.subscriptionService.getActiveSubscriptionsForProject(notification.projectId);
    } else if (notification.targetType === 'segment' || notification.targetType === 'individual') {
      subscriptions = await this.subscriptionService.filterSubscriptions(
        notification.projectId,
        notification.targetCriteria as any
      );
    } else {
      subscriptions = [];
    }

    if (subscriptions.length === 0) {
      await prisma.notification.update({
        where: { id: notificationId },
        data: { status: 'sent', sentAt: new Date() },
      });
      return { sent: 0, failed: 0 };
    }

    // Update status to sending
    await prisma.notification.update({
      where: { id: notificationId },
      data: { status: 'sending' },
    });

    // Set VAPID details
    setVAPIDDetails(
      notification.project.vapidEmail,
      notification.project.vapidPublicKey,
      notification.project.vapidPrivateKey
    );

    // Prepare payload
    const pushPayload = {
      title: notification.title,
      body: notification.body,
      icon: notification.icon,
      badge: notification.badge,
      image: notification.image,
      url: notification.url,
      id: notification.id,
    };

    let totalSent = 0;
    let totalFailed = 0;

    // Send to all subscriptions
    const sendPromises = subscriptions.map(async (subscription) => {
      try {
        await webpush.sendNotification(
          {
            endpoint: subscription.endpoint,
            keys: {
              p256dh: subscription.p256dhKey,
              auth: subscription.authKey,
            },
          },
          JSON.stringify(pushPayload)
        );

        // Log success
        await prisma.notificationLog.create({
          data: {
            notificationId,
            subscriptionId: subscription.id,
            status: 'sent',
            sentAt: new Date(),
          },
        });

        totalSent++;
      } catch (error: any) {
        // Log failure
        await prisma.notificationLog.create({
          data: {
            notificationId,
            subscriptionId: subscription.id,
            status: 'failed',
            errorMessage: error.message,
            sentAt: new Date(),
          },
        });

        // If subscription is gone (410), mark as inactive
        if (error.statusCode === 410) {
          await prisma.subscription.update({
            where: { id: subscription.id },
            data: { isActive: false, unsubscribedAt: new Date() },
          });
        }

        totalFailed++;
      }
    });

    await Promise.all(sendPromises);

    // Update notification stats
    await prisma.notification.update({
      where: { id: notificationId },
      data: {
        status: 'sent',
        sentAt: new Date(),
        totalSent,
        totalFailed,
      },
    });

    return { sent: totalSent, failed: totalFailed };
  }

  async getNotifications(projectId: string, page = 1, limit = 50) {
    const skip = (page - 1) * limit;

    const [notifications, total] = await Promise.all([
      prisma.notification.findMany({
        where: { projectId },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.notification.count({ where: { projectId } }),
    ]);

    return {
      notifications,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getNotificationById(notificationId: string, projectId: string) {
    return prisma.notification.findFirst({
      where: { id: notificationId, projectId },
    });
  }

  async getNotificationStats(notificationId: string, projectId: string) {
    const notification = await prisma.notification.findFirst({
      where: { id: notificationId, projectId },
      include: {
        logs: true,
      },
    });

    if (!notification) {
      return null;
    }

    const delivered = await prisma.notificationLog.count({
      where: {
        notificationId,
        status: 'delivered',
      },
    });

    const clicked = await prisma.notificationLog.count({
      where: {
        notificationId,
        status: 'clicked',
      },
    });

    return {
      ...notification,
      totalDelivered: delivered,
      totalClicked: clicked,
      clickRate: notification.totalSent > 0 ? (clicked / notification.totalSent) * 100 : 0,
    };
  }

  async recordDelivery(notificationId: string, subscriptionId: string) {
    const log = await prisma.notificationLog.findFirst({
      where: {
        notificationId,
        subscriptionId,
        status: 'sent',
      },
    });

    if (log) {
      await prisma.notificationLog.update({
        where: { id: log.id },
        data: {
          status: 'delivered',
          deliveredAt: new Date(),
        },
      });

      await prisma.notification.update({
        where: { id: notificationId },
        data: {
          totalDelivered: { increment: 1 },
        },
      });
    }
  }

  async recordClick(notificationId: string, subscriptionId: string) {
    const log = await prisma.notificationLog.findFirst({
      where: {
        notificationId,
        subscriptionId,
      },
    });

    if (log) {
      await prisma.notificationLog.update({
        where: { id: log.id },
        data: {
          status: 'clicked',
          clickedAt: new Date(),
        },
      });

      await prisma.notification.update({
        where: { id: notificationId },
        data: {
          totalClicked: { increment: 1 },
        },
      });
    }
  }

  async getAnalytics(projectId: string) {
    const now = new Date();
    const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const [totalSubscriptions, activeSubscriptions, totalNotifications, recentNotifications] = await Promise.all([
      prisma.subscription.count({ where: { projectId } }),
      prisma.subscription.count({ where: { projectId, isActive: true } }),
      prisma.notification.count({ where: { projectId } }),
      prisma.notification.count({
        where: {
          projectId,
          createdAt: { gte: last30Days },
        },
      }),
    ]);

    const notificationStats = await prisma.notification.aggregate({
      where: { projectId },
      _sum: {
        totalSent: true,
        totalDelivered: true,
        totalClicked: true,
        totalFailed: true,
      },
    });

    return {
      subscriptions: {
        total: totalSubscriptions,
        active: activeSubscriptions,
      },
      notifications: {
        total: totalNotifications,
        last30Days: recentNotifications,
      },
      stats: {
        totalSent: notificationStats._sum.totalSent || 0,
        totalDelivered: notificationStats._sum.totalDelivered || 0,
        totalClicked: notificationStats._sum.totalClicked || 0,
        totalFailed: notificationStats._sum.totalFailed || 0,
      },
    };
  }
}
