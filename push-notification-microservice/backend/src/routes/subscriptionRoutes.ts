import { Router } from 'express';
import * as subscriptionController from '../controllers/subscriptionController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Public routes for SDK
router.post('/public/:apiKey/subscriptions', subscriptionController.subscribe);
router.delete('/public/:apiKey/subscriptions/:endpoint', subscriptionController.unsubscribe);
router.patch('/public/:apiKey/subscriptions/:subscriptionId', subscriptionController.updateSubscription);

// Protected admin routes
router.get('/admin/:projectId/subscriptions', authenticateToken, subscriptionController.getSubscriptions);
router.get('/admin/:projectId/subscriptions/:subscriptionId', authenticateToken, subscriptionController.getSubscription);

export default router;
