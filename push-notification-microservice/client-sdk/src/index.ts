import { PushNotifyConfig, ProjectConfig, PushSubscriptionData } from './types';
import { getBrowserDetails, urlBase64ToUint8Array, log } from './utils';

class PushNotify {
  private config: PushNotifyConfig;
  private vapidPublicKey: string | null = null;
  private registration: ServiceWorkerRegistration | null = null;
  private subscriptionData: PushSubscriptionData | null = null;

  constructor(config: PushNotifyConfig) {
    this.config = {
      autoPrompt: false,
      promptDelay: 2000,
      serviceWorkerPath: '/push-sw.js',
      debug: false,
      ...config,
    };
  }

  async init(): Promise<void> {
    try {
      log('Initializing PushNotify...', null, this.config.debug);

      // Check browser support
      if (!this.isPushSupported()) {
        throw new Error('Push notifications are not supported in this browser');
      }

      // Fetch project config
      await this.fetchProjectConfig();

      // Register service worker
      await this.registerServiceWorker();

      // Check existing subscription
      const existingSubscription = await this.getSubscription();
      if (existingSubscription) {
        log('Found existing subscription', existingSubscription, this.config.debug);
        this.subscriptionData = {
          subscriptionId: localStorage.getItem('pushnotify_subscription_id') || '',
          endpoint: existingSubscription.endpoint,
        };
      }

      // Auto prompt if configured
      if (this.config.autoPrompt && !existingSubscription) {
        setTimeout(() => {
          this.subscribe().catch(console.error);
        }, this.config.promptDelay);
      }

      log('PushNotify initialized successfully', null, this.config.debug);
    } catch (error) {
      console.error('[PushNotify] Initialization error:', error);
      throw error;
    }
  }

  isPushSupported(): boolean {
    return 'serviceWorker' in navigator && 'PushManager' in window;
  }

  private async fetchProjectConfig(): Promise<void> {
    const url = `${this.config.apiUrl}/api/v1/projects/public/${this.config.apiKey}/config`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch project config: ${response.statusText}`);
      }

      const config: ProjectConfig = await response.json();
      this.vapidPublicKey = config.vapidPublicKey;

      log('Project config fetched', config, this.config.debug);
    } catch (error) {
      console.error('[PushNotify] Failed to fetch project config:', error);
      throw error;
    }
  }

  private async registerServiceWorker(): Promise<void> {
    try {
      this.registration = await navigator.serviceWorker.register(this.config.serviceWorkerPath!);
      log('Service worker registered', this.registration, this.config.debug);

      // Wait for service worker to be ready
      await navigator.serviceWorker.ready;
    } catch (error) {
      console.error('[PushNotify] Service worker registration failed:', error);
      throw error;
    }
  }

  async subscribe(): Promise<PushSubscriptionData | null> {
    try {
      // Request permission
      const permission = await Notification.requestPermission();

      if (permission !== 'granted') {
        log('Notification permission denied', null, this.config.debug);
        return null;
      }

      // Get push subscription
      const subscription = await this.registration!.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(this.vapidPublicKey!),
      });

      log('Push subscription created', subscription, this.config.debug);

      // Send to backend
      const browserDetails = getBrowserDetails();
      const metadata = {
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        language: navigator.language,
      };

      const url = `${this.config.apiUrl}/api/v1/public/${this.config.apiKey}/subscriptions`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          endpoint: subscription.endpoint,
          keys: {
            p256dh: btoa(String.fromCharCode(...new Uint8Array(subscription.getKey('p256dh')!))),
            auth: btoa(String.fromCharCode(...new Uint8Array(subscription.getKey('auth')!))),
          },
          browserDetails,
          metadata,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to save subscription: ${response.statusText}`);
      }

      const data = await response.json();
      this.subscriptionData = {
        subscriptionId: data.subscriptionId,
        endpoint: subscription.endpoint,
      };

      // Store subscription ID
      localStorage.setItem('pushnotify_subscription_id', data.subscriptionId);

      log('Subscription saved to backend', data, this.config.debug);

      // Call callback
      if (this.config.onSubscribe) {
        this.config.onSubscribe(this.subscriptionData);
      }

      return this.subscriptionData;
    } catch (error) {
      console.error('[PushNotify] Subscription error:', error);
      return null;
    }
  }

  async unsubscribe(): Promise<boolean> {
    try {
      const subscription = await this.getSubscription();

      if (!subscription) {
        log('No subscription to unsubscribe', null, this.config.debug);
        return false;
      }

      // Unsubscribe from browser
      await subscription.unsubscribe();

      // Notify backend
      const url = `${this.config.apiUrl}/api/v1/public/${this.config.apiKey}/subscriptions/${encodeURIComponent(
        subscription.endpoint
      )}`;

      await fetch(url, {
        method: 'DELETE',
      });

      // Clear local data
      localStorage.removeItem('pushnotify_subscription_id');
      this.subscriptionData = null;

      log('Unsubscribed successfully', null, this.config.debug);

      // Call callback
      if (this.config.onUnsubscribe) {
        this.config.onUnsubscribe();
      }

      return true;
    } catch (error) {
      console.error('[PushNotify] Unsubscribe error:', error);
      return false;
    }
  }

  async isSubscribed(): Promise<boolean> {
    const subscription = await this.getSubscription();
    return subscription !== null;
  }

  async getSubscription(): Promise<PushSubscription | null> {
    if (!this.registration) {
      return null;
    }

    return this.registration.pushManager.getSubscription();
  }

  async setTags(tags: Record<string, string>): Promise<void> {
    if (!this.subscriptionData) {
      throw new Error('Not subscribed');
    }

    const url = `${this.config.apiUrl}/api/v1/public/${this.config.apiKey}/subscriptions/${this.subscriptionData.subscriptionId}`;

    await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tags }),
    });

    log('Tags updated', tags, this.config.debug);
  }

  getPermission(): NotificationPermission {
    return Notification.permission;
  }
}

// Auto-initialize if config is provided via data attribute
if (typeof window !== 'undefined') {
  (window as any).PushNotify = PushNotify;

  // Auto-init from script tag data attributes
  const scripts = document.querySelectorAll('script[data-pushnotify-apikey]');
  if (scripts.length > 0) {
    const script = scripts[0] as HTMLScriptElement;
    const config: PushNotifyConfig = {
      apiKey: script.dataset.pushnotifyApikey!,
      apiUrl: script.dataset.pushnotifyApiurl || 'http://localhost:3001',
      autoPrompt: script.dataset.pushnotifyAutoprompt === 'true',
      promptDelay: parseInt(script.dataset.pushnotifyPromptdelay || '2000'),
      serviceWorkerPath: script.dataset.pushnotifySwpath || '/push-sw.js',
      debug: script.dataset.pushnotifyDebug === 'true',
    };

    const pushNotify = new PushNotify(config);
    pushNotify.init().catch(console.error);

    (window as any).pushNotifyInstance = pushNotify;
  }
}

export default PushNotify;
