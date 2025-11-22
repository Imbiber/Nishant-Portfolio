export interface PushNotifyConfig {
  apiKey: string;
  apiUrl: string;
  autoPrompt?: boolean;
  promptDelay?: number;
  serviceWorkerPath?: string;
  onSubscribe?: (subscription: PushSubscriptionData) => void;
  onUnsubscribe?: () => void;
  onNotificationClick?: (notification: any) => void;
  debug?: boolean;
}

export interface PushSubscriptionData {
  subscriptionId: string;
  endpoint: string;
}

export interface ProjectConfig {
  vapidPublicKey: string;
  projectName: string;
  domain: string | null;
}

export interface BrowserDetails {
  userAgent: string;
  browser: {
    name: string;
    version: string;
  };
  os: {
    name: string;
    version: string;
  };
  deviceType: string;
}
