import { Request, Response } from 'express';
import { NotificationService } from '../services/notificationService';
import { ProjectService } from '../services/projectService';
import { notificationSchema } from '../utils/validation';
import { AuthRequest } from '../types';
import { notificationQueue } from '../queue/notificationQueue';

const notificationService = new NotificationService();
const projectService = new ProjectService();

export async function sendNotification(req: AuthRequest, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const projectId = req.params.projectId;

    // Verify project ownership
    const project = await projectService.getProjectById(projectId, req.user.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const data = notificationSchema.parse(req.body);

    // Create notification
    const notification = await notificationService.createNotification(projectId, data);

    // Queue for sending
    if (data.schedule?.sendAt) {
      const delay = new Date(data.schedule.sendAt).getTime() - Date.now();
      await notificationQueue.add(
        'send-notification',
        { notificationId: notification.id },
        { delay: delay > 0 ? delay : 0 }
      );
    } else {
      await notificationQueue.add('send-notification', { notificationId: notification.id });
    }

    res.status(201).json(notification);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function getNotifications(req: AuthRequest, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const projectId = req.params.projectId;

    // Verify project ownership
    const project = await projectService.getProjectById(projectId, req.user.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 50;

    const result = await notificationService.getNotifications(projectId, page, limit);
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function getNotification(req: AuthRequest, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const projectId = req.params.projectId;
    const notificationId = req.params.notificationId;

    // Verify project ownership
    const project = await projectService.getProjectById(projectId, req.user.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const notification = await notificationService.getNotificationById(notificationId, projectId);

    if (!notification) {
      return res.status(404).json({ error: 'Notification not found' });
    }

    res.json(notification);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function getNotificationStats(req: AuthRequest, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const projectId = req.params.projectId;
    const notificationId = req.params.notificationId;

    // Verify project ownership
    const project = await projectService.getProjectById(projectId, req.user.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const stats = await notificationService.getNotificationStats(notificationId, projectId);

    if (!stats) {
      return res.status(404).json({ error: 'Notification not found' });
    }

    res.json(stats);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function getAnalytics(req: AuthRequest, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const projectId = req.params.projectId;

    // Verify project ownership
    const project = await projectService.getProjectById(projectId, req.user.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const analytics = await notificationService.getAnalytics(projectId);
    res.json(analytics);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function recordDelivery(req: Request, res: Response) {
  try {
    const { notificationId, subscriptionId, status } = req.body;

    if (status === 'delivered') {
      await notificationService.recordDelivery(notificationId, subscriptionId);
    } else if (status === 'clicked') {
      await notificationService.recordClick(notificationId, subscriptionId);
    }

    res.json({ success: true });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}
