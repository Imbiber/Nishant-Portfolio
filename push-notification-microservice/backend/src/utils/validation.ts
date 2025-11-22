import { z } from 'zod';

export const subscribeSchema = z.object({
  endpoint: z.string().url(),
  keys: z.object({
    p256dh: z.string(),
    auth: z.string(),
  }),
  browserDetails: z.object({
    userAgent: z.string().optional(),
    browser: z.object({
      name: z.string().optional(),
      version: z.string().optional(),
    }).optional(),
    os: z.object({
      name: z.string().optional(),
      version: z.string().optional(),
    }).optional(),
    deviceType: z.string().optional(),
  }).optional(),
  metadata: z.object({
    timezone: z.string().optional(),
    language: z.string().optional(),
  }).optional(),
});

export const notificationSchema = z.object({
  title: z.string().min(1).max(255),
  body: z.string().min(1).max(1000),
  icon: z.string().url().optional(),
  badge: z.string().url().optional(),
  image: z.string().url().optional(),
  url: z.string().url().optional(),
  targetType: z.enum(['all', 'segment', 'individual']).default('all'),
  targetCriteria: z.object({
    tags: z.record(z.string()).optional(),
    browser: z.string().optional(),
    os: z.string().optional(),
    subscriptionIds: z.array(z.string()).optional(),
  }).optional(),
  schedule: z.object({
    sendAt: z.string().datetime().or(z.date()),
  }).optional(),
});

export const projectSchema = z.object({
  name: z.string().min(1).max(255),
  domain: z.string().url().optional(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(1).optional(),
});
