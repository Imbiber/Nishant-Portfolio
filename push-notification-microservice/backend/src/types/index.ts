import { Request } from 'express';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export interface BrowserDetails {
  userAgent?: string;
  browser?: {
    name?: string;
    version?: string;
  };
  os?: {
    name?: string;
    version?: string;
  };
  deviceType?: string;
}

export interface SubscriptionData {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
  browserDetails?: BrowserDetails;
  metadata?: {
    timezone?: string;
    language?: string;
  };
}

export interface NotificationPayload {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  image?: string;
  url?: string;
  targetType?: 'all' | 'segment' | 'individual';
  targetCriteria?: {
    tags?: Record<string, string>;
    browser?: string;
    os?: string;
    subscriptionIds?: string[];
  };
  schedule?: {
    sendAt: Date;
  };
}

export interface PushSubscription {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}
