/* eslint-disable no-restricted-globals */
// Push Notification Service Worker
// This file should be placed in the public root of your website

// Configuration - will be injected by the SDK
const API_URL = 'http://localhost:3001'; // Replace with your API URL
const API_KEY = ''; // Will be set dynamically

self.addEventListener('install', (event) => {
  console.log('[PushNotify SW] Service worker installed');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('[PushNotify SW] Service worker activated');
  event.waitUntil(self.clients.claim());
});

self.addEventListener('push', (event) => {
  console.log('[PushNotify SW] Push received');

  let data = {
    title: 'Notification',
    body: 'You have a new notification',
    icon: '/icon-192x192.png',
    badge: '/badge-72x72.png',
  };

  try {
    if (event.data) {
      data = event.data.json();
    }
  } catch (error) {
    console.error('[PushNotify SW] Error parsing push data:', error);
  }

  const options = {
    body: data.body,
    icon: data.icon || '/icon-192x192.png',
    badge: data.badge || '/badge-72x72.png',
    image: data.image,
    data: {
      url: data.url || '/',
      notificationId: data.id,
    },
    vibrate: [200, 100, 200],
    tag: data.id || 'default',
    requireInteraction: false,
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options).then(() => {
      // Report delivery to backend
      if (data.id) {
        const subscriptionId = getStoredSubscriptionId();
        if (subscriptionId) {
          reportDelivery(data.id, subscriptionId, 'delivered');
        }
      }
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  console.log('[PushNotify SW] Notification clicked');

  event.notification.close();

  const url = event.notification.data.url || '/';
  const notificationId = event.notification.data.notificationId;

  // Report click to backend
  if (notificationId) {
    const subscriptionId = getStoredSubscriptionId();
    if (subscriptionId) {
      reportDelivery(notificationId, subscriptionId, 'clicked');
    }
  }

  event.waitUntil(
    self.clients
      .matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        // Check if there's already a window open with this URL
        for (const client of clientList) {
          if (client.url === url && 'focus' in client) {
            return client.focus();
          }
        }

        // Otherwise, open a new window
        if (self.clients.openWindow) {
          return self.clients.openWindow(url);
        }
      })
  );
});

self.addEventListener('notificationclose', (event) => {
  console.log('[PushNotify SW] Notification closed', event.notification.tag);
});

// Helper function to report delivery/click to backend
function reportDelivery(notificationId, subscriptionId, status) {
  const url = `${API_URL}/api/v1/webhooks/delivery`;

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      notificationId,
      subscriptionId,
      status,
    }),
  }).catch((error) => {
    console.error('[PushNotify SW] Error reporting delivery:', error);
  });
}

// Helper function to get stored subscription ID
function getStoredSubscriptionId() {
  // This will be read from IndexedDB or passed via message
  // For now, we'll rely on the client to pass it
  return null; // Will be improved in production
}

// Listen for messages from the client
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SET_CONFIG') {
    // Update API_URL and API_KEY
    console.log('[PushNotify SW] Config updated', event.data);
  }
});
