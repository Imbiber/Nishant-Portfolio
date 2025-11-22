import { BrowserDetails } from './types';

export function getBrowserDetails(): BrowserDetails {
  const userAgent = navigator.userAgent;

  // Simple browser detection
  let browserName = 'Unknown';
  let browserVersion = 'Unknown';

  if (userAgent.indexOf('Firefox') > -1) {
    browserName = 'Firefox';
    browserVersion = userAgent.match(/Firefox\/([0-9.]+)/)?.[1] || 'Unknown';
  } else if (userAgent.indexOf('Chrome') > -1) {
    browserName = 'Chrome';
    browserVersion = userAgent.match(/Chrome\/([0-9.]+)/)?.[1] || 'Unknown';
  } else if (userAgent.indexOf('Safari') > -1) {
    browserName = 'Safari';
    browserVersion = userAgent.match(/Version\/([0-9.]+)/)?.[1] || 'Unknown';
  } else if (userAgent.indexOf('Edge') > -1) {
    browserName = 'Edge';
    browserVersion = userAgent.match(/Edge\/([0-9.]+)/)?.[1] || 'Unknown';
  }

  // OS detection
  let osName = 'Unknown';
  let osVersion = 'Unknown';

  if (userAgent.indexOf('Windows') > -1) {
    osName = 'Windows';
    const match = userAgent.match(/Windows NT ([0-9.]+)/);
    osVersion = match ? match[1] : 'Unknown';
  } else if (userAgent.indexOf('Mac OS X') > -1) {
    osName = 'macOS';
    const match = userAgent.match(/Mac OS X ([0-9_]+)/);
    osVersion = match ? match[1].replace(/_/g, '.') : 'Unknown';
  } else if (userAgent.indexOf('Linux') > -1) {
    osName = 'Linux';
  } else if (userAgent.indexOf('Android') > -1) {
    osName = 'Android';
    const match = userAgent.match(/Android ([0-9.]+)/);
    osVersion = match ? match[1] : 'Unknown';
  } else if (userAgent.indexOf('iOS') > -1 || userAgent.indexOf('iPhone') > -1 || userAgent.indexOf('iPad') > -1) {
    osName = 'iOS';
    const match = userAgent.match(/OS ([0-9_]+)/);
    osVersion = match ? match[1].replace(/_/g, '.') : 'Unknown';
  }

  // Device type
  let deviceType = 'desktop';
  if (/Mobile|Android|iPhone|iPad|iPod/i.test(userAgent)) {
    deviceType = /iPad|Tablet/i.test(userAgent) ? 'tablet' : 'mobile';
  }

  return {
    userAgent,
    browser: {
      name: browserName,
      version: browserVersion,
    },
    os: {
      name: osName,
      version: osVersion,
    },
    deviceType,
  };
}

export function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export function log(message: string, data?: any, debug = false) {
  if (debug) {
    console.log(`[PushNotify] ${message}`, data || '');
  }
}
