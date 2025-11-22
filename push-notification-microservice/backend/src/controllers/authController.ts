import { Request, Response } from 'express';
import { AuthService } from '../services/authService';
import { loginSchema, registerSchema } from '../utils/validation';
import { AuthRequest } from '../types';

const authService = new AuthService();

export async function register(req: Request, res: Response) {
  try {
    const data = registerSchema.parse(req.body);
    const result = await authService.register(data.email, data.password, data.name);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const data = loginSchema.parse(req.body);
    const result = await authService.login(data.email, data.password);
    res.json(result);
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
}

export async function getProfile(req: AuthRequest, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const profile = await authService.getProfile(req.user.id);
    res.json(profile);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}
