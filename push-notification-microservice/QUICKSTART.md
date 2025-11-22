# 🚀 Quick Start Guide

Get your push notification microservice running in 5 minutes!

## Option 1: Docker (Easiest)

### Prerequisites
- Docker & Docker Compose installed

### Steps

1. **Clone and navigate to the project**
```bash
cd push-notification-service
```

2. **Start all services**
```bash
docker-compose -f docker/docker-compose.yml up -d
```

3. **Access the services**
- Admin Dashboard: http://localhost:3002
- Backend API: http://localhost:3001
- Default login: `admin@example.com` / `changeme123`

That's it! 🎉

---

## Option 2: Manual Setup

### Prerequisites
- Node.js 18+
- PostgreSQL 15+
- Redis 7+

### Steps

1. **Install dependencies**
```bash
chmod +x setup.sh
./setup.sh
```

2. **Set up PostgreSQL**
```bash
# Create database
createdb push_notifications
```

3. **Configure backend**
```bash
cd backend
cp .env.example .env
# Edit .env with your database credentials
```

4. **Run migrations**
```bash
npm run db:migrate
```

5. **Start Redis**
```bash
redis-server
```

6. **Start the services** (in separate terminals)

Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

Terminal 2 - Worker:
```bash
cd backend
npm run worker
```

Terminal 3 - Admin Dashboard:
```bash
cd admin-dashboard
npm run dev
```

7. **Access the admin dashboard**
- Open http://localhost:3002
- Login with: `admin@example.com` / `changeme123`

---

## Create Your First Project

1. Login to admin dashboard
2. Click "New Project"
3. Enter project name
4. Copy the API Key

---

## Integrate with Your Website

1. **Copy the service worker**
```bash
cp client-sdk/push-sw.js /path/to/your/website/public/
```

2. **Update service worker API URL**
```javascript
// In push-sw.js
const API_URL = 'http://localhost:3001';
```

3. **Add SDK to your HTML**
```html
<script src="path/to/client-sdk/dist/index.js"></script>
<script>
  const pushNotify = new PushNotify({
    apiKey: 'YOUR_API_KEY',
    apiUrl: 'http://localhost:3001',
    autoPrompt: true,
  });

  pushNotify.init();
</script>
```

4. **Test it!**
- Open your website
- Allow notifications when prompted
- Go to admin dashboard
- Send a test notification

---

## Try the Example

```bash
cd examples/simple-website

# 1. Update the API key in index.html
# 2. Copy service worker
cp ../../client-sdk/push-sw.js ./

# 3. Serve the files
python3 -m http.server 8000

# 4. Open http://localhost:8000
```

---

## Next Steps

- Read the [full documentation](README.md)
- Check the [API documentation](docs/API.md)
- Deploy to production
- Customize the notification UI

---

## Troubleshooting

**"Permission denied" or "Not subscribed"**
- Ensure you're using HTTPS (or localhost)
- Check browser console for errors
- Verify API key is correct

**Backend not starting**
- Check PostgreSQL is running
- Verify DATABASE_URL in .env
- Check Redis is running

**Notifications not received**
- Ensure backend and worker are both running
- Check notification permission in browser
- Verify service worker is registered (DevTools → Application → Service Workers)

---

Need help? Check the main [README.md](README.md) for more details!
