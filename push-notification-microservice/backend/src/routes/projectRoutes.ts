import { Router } from 'express';
import * as projectController from '../controllers/projectController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Public route for SDK
router.get('/public/:apiKey/config', projectController.getProjectConfig);

// Protected admin routes
router.use(authenticateToken);
router.post('/', projectController.createProject);
router.get('/', projectController.getProjects);
router.get('/:projectId', projectController.getProject);
router.put('/:projectId', projectController.updateProject);
router.delete('/:projectId', projectController.deleteProject);
router.post('/:projectId/regenerate-key', projectController.regenerateApiKey);

export default router;
