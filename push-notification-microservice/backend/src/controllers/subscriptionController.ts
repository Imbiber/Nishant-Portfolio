import { Request, Response } from 'express';
import { SubscriptionService } from '../services/subscriptionService';
import { ProjectService } from '../services/projectService';
import { subscribeSchema } from '../utils/validation';
import { AuthRequest } from '../types';

const subscriptionService = new SubscriptionService();
const projectService = new ProjectService();

export async function subscribe(req: Request, res: Response) {
  try {
    const apiKey = req.params.apiKey;
    const project = await projectService.getProjectByApiKey(apiKey);

    if (!project || !project.isActive) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const data = subscribeSchema.parse(req.body);
    const ipAddress = req.ip || req.headers['x-forwarded-for'] as string;

    const subscription = await subscriptionService.subscribe(project.id, data, ipAddress);

    res.status(201).json({
      subscriptionId: subscription.id,
      success: true,
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function unsubscribe(req: Request, res: Response) {
  try {
    const apiKey = req.params.apiKey;
    const endpoint = req.params.endpoint;

    const project = await projectService.getProjectByApiKey(apiKey);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    await subscriptionService.unsubscribe(project.id, decodeURIComponent(endpoint));

    res.json({ success: true });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function updateSubscription(req: Request, res: Response) {
  try {
    const apiKey = req.params.apiKey;
    const subscriptionId = req.params.subscriptionId;

    const project = await projectService.getProjectByApiKey(apiKey);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const subscription = await subscriptionService.updateSubscription(subscriptionId, project.id, req.body);

    res.json(subscription);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function getSubscriptions(req: AuthRequest, res: Response) {
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

    const options = {
      page: parseInt(req.query.page as string) || 1,
      limit: parseInt(req.query.limit as string) || 50,
      isActive: req.query.isActive === 'true' ? true : req.query.isActive === 'false' ? false : undefined,
      search: req.query.search as string,
    };

    const result = await subscriptionService.getSubscriptions(projectId, options);
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function getSubscription(req: AuthRequest, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const projectId = req.params.projectId;
    const subscriptionId = req.params.subscriptionId;

    // Verify project ownership
    const project = await projectService.getProjectById(projectId, req.user.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const subscription = await subscriptionService.getSubscriptionById(subscriptionId, projectId);

    if (!subscription) {
      return res.status(404).json({ error: 'Subscription not found' });
    }

    res.json(subscription);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}
