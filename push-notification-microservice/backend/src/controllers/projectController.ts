import { Response } from 'express';
import { ProjectService } from '../services/projectService';
import { projectSchema } from '../utils/validation';
import { AuthRequest } from '../types';

const projectService = new ProjectService();

export async function createProject(req: AuthRequest, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const data = projectSchema.parse(req.body);
    const project = await projectService.createProject(req.user.id, data.name, data.domain);
    res.status(201).json(project);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function getProjects(req: AuthRequest, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const projects = await projectService.getProjectsByUserId(req.user.id);
    res.json(projects);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function getProject(req: AuthRequest, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const project = await projectService.getProjectById(req.params.projectId, req.user.id);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json(project);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function updateProject(req: AuthRequest, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const project = await projectService.updateProject(req.params.projectId, req.user.id, req.body);
    res.json(project);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function deleteProject(req: AuthRequest, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    await projectService.deleteProject(req.params.projectId, req.user.id);
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function regenerateApiKey(req: AuthRequest, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const project = await projectService.regenerateApiKey(req.params.projectId, req.user.id);
    res.json(project);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function getProjectConfig(req: AuthRequest, res: Response) {
  try {
    const apiKey = req.params.apiKey;
    const project = await projectService.getProjectByApiKey(apiKey);

    if (!project || !project.isActive) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json({
      vapidPublicKey: project.vapidPublicKey,
      projectName: project.name,
      domain: project.domain,
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}
