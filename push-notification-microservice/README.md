# 🔔 Push Notification Microservice

A complete, production-ready push notification microservice that can be integrated into any web application. Built with modern technologies and best practices.

## 🌟 Features

- **Self-Hosted**: Full control over your notification infrastructure
- **Multi-Project Support**: Manage multiple applications from one instance
- **VAPID Protocol**: Standard web push notifications
- **Queue System**: Reliable notification delivery with retry logic
- **Analytics**: Track delivery, clicks, and engagement
- **Segmentation**: Target specific users with tags and filters
- **Admin Dashboard**: Beautiful UI for managing projects and notifications
- **TypeScript SDK**: Easy integration with any website
- **Docker Ready**: Simple deployment with Docker Compose

## 📦 Components

### 1. Backend API (Node.js + Express)
- RESTful API for all operations
- PostgreSQL for data persistence
- Redis for queue management
- BullMQ for background jobs
- JWT authentication

### 2. Client SDK (TypeScript)
- Easy integration with any website
- Browser compatibility detection
- Auto-subscription management
- Service worker handling

### 3. Admin Dashboard (Next.js)
- Project management
- Send notifications
- View subscriptions
- Analytics dashboard

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL 15+
- Redis 7+
- Docker & Docker Compose (optional)

### Option 1: Docker Compose (Recommended)

```bash
# Clone the repository
cd push-notification-service

# Start all services
docker-compose -f docker/docker-compose.yml up -d

# The services will be available at:
# - Backend API: http://localhost:3001
# - Admin Dashboard: http://localhost:3002
# - PostgreSQL: localhost:5432
# - Redis: localhost:6379
```

### Option 2: Manual Setup

#### 1. Setup Database

```bash
# Create PostgreSQL database
createdb push_notifications

# Start Redis
redis-server
```

#### 2. Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your database credentials

# Run migrations
npm run db:migrate

# Start server
npm run dev

# In another terminal, start worker
npm run worker
```

#### 3. Setup Admin Dashboard

```bash
cd admin-dashboard

# Install dependencies
npm install

# Configure environment
cp .env.local.example .env.local

# Start development server
npm run dev
```

#### 4. Build Client SDK

```bash
cd client-sdk

# Install dependencies
npm install

# Build SDK
npm run build
```

## 📝 Integration Guide

### Step 1: Create a Project

1. Open Admin Dashboard: http://localhost:3002
2. Login with default credentials:
   - Email: `admin@example.com`
   - Password: `changeme123`
3. Click "New Project" and create your project
4. Copy the **API Key** and **VAPID Public Key**

### Step 2: Add SDK to Your Website

#### Option A: Using CDN

```html
<!-- Add to your website's <head> -->
<script src="https://yourcdn.com/push-sdk.js"></script>
<script>
  const pushNotify = new PushNotify({
    apiKey: 'YOUR_API_KEY',
    apiUrl: 'http://localhost:3001',
    autoPrompt: true,
    promptDelay: 2000,
    serviceWorkerPath: '/push-sw.js',
    debug: true
  });

  pushNotify.init();
</script>
```

#### Option B: Using npm

```bash
npm install @pushnotify/client-sdk
```

```javascript
import PushNotify from '@pushnotify/client-sdk';

const pushNotify = new PushNotify({
  apiKey: 'YOUR_API_KEY',
  apiUrl: 'http://localhost:3001',
  autoPrompt: true,
});

pushNotify.init();
```

### Step 3: Add Service Worker

Copy `client-sdk/push-sw.js` to your website's public folder and update the API_URL:

```javascript
// In push-sw.js
const API_URL = 'http://localhost:3001';
```

### Step 4: Send Notifications

Use the Admin Dashboard or API to send notifications:

```javascript
// Using API directly
fetch('http://localhost:3001/api/v1/YOUR_PROJECT_ID/notifications/send', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: 'Hello World!',
    body: 'This is your first notification',
    icon: '/icon.png',
    url: 'https://yourwebsite.com',
    targetType: 'all'
  })
});
```

## 🔧 API Documentation

### Authentication

All admin endpoints require JWT authentication:

```
Authorization: Bearer YOUR_TOKEN
```

Get token by logging in:

```bash
POST /api/v1/auth/login
{
  "email": "admin@example.com",
  "password": "changeme123"
}
```

### Public Endpoints (SDK)

#### Get Project Config
```
GET /api/v1/projects/public/:apiKey/config
```

#### Subscribe User
```
POST /api/v1/public/:apiKey/subscriptions
{
  "endpoint": "https://...",
  "keys": {
    "p256dh": "...",
    "auth": "..."
  },
  "browserDetails": {...},
  "metadata": {...}
}
```

#### Unsubscribe User
```
DELETE /api/v1/public/:apiKey/subscriptions/:endpoint
```

### Admin Endpoints

#### Create Project
```
POST /api/v1/projects
{
  "name": "My Website",
  "domain": "https://example.com"
}
```

#### Send Notification
```
POST /api/v1/:projectId/notifications/send
{
  "title": "Hello!",
  "body": "Your notification message",
  "icon": "/icon.png",
  "url": "https://example.com",
  "targetType": "all",
  "targetCriteria": {
    "tags": {"premium": "true"},
    "browser": "Chrome",
    "os": "Windows"
  }
}
```

#### Get Analytics
```
GET /api/v1/:projectId/analytics
```

## 📊 Database Schema

The system uses PostgreSQL with the following main tables:

- **users**: Admin users
- **projects**: Your applications
- **subscriptions**: User subscriptions with browser details
- **notifications**: Sent notifications
- **notification_logs**: Delivery tracking
- **subscription_tags**: User segmentation

## 🎨 Customization

### Custom Notification Icons

Update the service worker to use your icons:

```javascript
// In push-sw.js
const options = {
  icon: '/your-icon-192x192.png',
  badge: '/your-badge-72x72.png',
  // ...
};
```

### Custom Prompt UI

The SDK provides hooks for custom UI:

```javascript
const pushNotify = new PushNotify({
  apiKey: 'YOUR_API_KEY',
  apiUrl: 'http://localhost:3001',
  autoPrompt: false, // Disable auto-prompt
  onSubscribe: (subscription) => {
    console.log('User subscribed!', subscription);
  },
  onUnsubscribe: () => {
    console.log('User unsubscribed!');
  }
});

// Show your custom prompt
document.getElementById('myButton').addEventListener('click', () => {
  pushNotify.subscribe();
});
```

## 🔒 Security Best Practices

1. **Change Default Credentials**: Update admin password immediately
2. **Use HTTPS**: Always use HTTPS in production
3. **Rotate API Keys**: Regenerate API keys periodically
4. **Set CORS**: Configure `ALLOWED_ORIGINS` in backend `.env`
5. **Rate Limiting**: Built-in rate limiting protects your API
6. **Environment Variables**: Never commit `.env` files

## 🌍 Production Deployment

### Environment Variables

**Backend:**
```env
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@host:5432/dbname
REDIS_HOST=your-redis-host
REDIS_PORT=6379
JWT_SECRET=your-super-secret-key
ALLOWED_ORIGINS=https://yourdomain.com
API_BASE_URL=https://api.yourdomain.com
```

**Admin Dashboard:**
```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

### Deployment Platforms

- **AWS**: EC2, RDS (PostgreSQL), ElastiCache (Redis)
- **Google Cloud**: Cloud Run, Cloud SQL, Memorystore
- **DigitalOcean**: Droplets, Managed PostgreSQL, Managed Redis
- **Railway**: Simplest option, all-in-one platform

## 📈 Monitoring

Monitor your microservice with:

- Health check endpoint: `GET /health`
- Queue dashboard: Access BullMQ Board (optional)
- Database monitoring: PostgreSQL logs
- Application logs: Check Docker logs or PM2 logs

## 🤝 Contributing

This is a complete, working microservice ready for production use. Feel free to customize and extend it for your needs!

## 📄 License

MIT License - Use it however you want!

## 🆘 Support

For issues or questions:
1. Check the documentation
2. Review the example integration
3. Examine the API responses
4. Check Docker logs: `docker-compose logs -f`

## 🎯 Roadmap

- [ ] Email fallback for failed notifications
- [ ] Scheduled notification campaigns
- [ ] A/B testing for notifications
- [ ] More analytics charts
- [ ] Webhook integrations
- [ ] Multi-language support

---

Built with ❤️ for the developer community
