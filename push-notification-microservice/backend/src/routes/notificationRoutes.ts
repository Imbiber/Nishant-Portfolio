import { Router } from 'express';
import * as notificationController from '../controllers/notificationController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Public webhook route
router.post('/webhooks/delivery', notificationController.recordDelivery);

// Protected admin routes
router.use(authenticateToken);
router.post('/:projectId/notifications/send', notificationController.sendNotification);
router.get('/:projectId/notifications', notificationController.getNotifications);
router.get('/:projectId/notifications/:notificationId', notificationController.getNotification);
router.get('/:projectId/notifications/:notificationId/stats', notificationController.getNotificationStats);
router.get('/:projectId/analytics', notificationController.getAnalytics);

export default router;
