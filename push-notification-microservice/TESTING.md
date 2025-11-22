# 🧪 Testing Guide

Complete guide to test your push notification microservice.

## Prerequisites Check

```bash
# Check Docker is installed
docker --version
docker-compose --version

# Check Node.js (for manual testing)
node --version
npm --version
```

## Method 1: Docker Testing (Easiest)

### Step 1: Start All Services

```bash
cd /home/user/push-notification-service

# Start everything
docker-compose -f docker/docker-compose.yml up -d

# Check all services are running
docker-compose -f docker/docker-compose.yml ps

# Watch logs (optional)
docker-compose -f docker/docker-compose.yml logs -f
```

Expected output:
```
NAME                          STATUS
push-notification-admin       Up
push-notification-backend     Up
push-notification-db          Up (healthy)
push-notification-redis       Up (healthy)
push-notification-worker      Up
```

### Step 2: Wait for Services to Initialize

```bash
# Wait about 30 seconds for migrations to run
# Check backend logs
docker-compose -f docker/docker-compose.yml logs backend

# You should see: "🚀 Server running on port 3001"
```

### Step 3: Access Admin Dashboard

1. Open browser: **http://localhost:3002**
2. You should see a login page
3. Login with:
   - Email: `admin@example.com`
   - Password: `changeme123`

**Expected:** You should see the dashboard with "Your Projects" heading

### Step 4: Create a Test Project

1. Click **"New Project"** button
2. Enter name: `Test Website`
3. Click **"Create"**
4. You should see a new project card with:
   - API Key (copy this!)
   - 0 subscriptions
   - 0 notifications

### Step 5: Test the Example Website

```bash
# Open new terminal
cd /home/user/push-notification-service/examples/simple-website

# Copy service worker
cp ../../client-sdk/push-sw.js ./

# Update API URL in push-sw.js
sed -i 's|http://localhost:3001|http://localhost:3001|g' push-sw.js
```

Now edit `index.html`:
```javascript
// Find this line (around line 135):
apiKey: 'YOUR_API_KEY_HERE',

// Replace with your actual API key from Step 4:
apiKey: 'your-actual-api-key-from-dashboard',
```

Start the example:
```bash
# Serve the example
python3 -m http.server 8000

# OR if Python not available:
npx serve . -p 8000
```

### Step 6: Test Subscription

1. Open browser: **http://localhost:8000**
2. You should see the Push Notification Demo page
3. Check the status:
   - Push Support: ✅ Supported
   - Permission: Not requested
   - Subscription: ❌ Inactive

4. Click **"Subscribe to Notifications"**
5. Allow notifications when browser prompts
6. Status should change to: ✅ Subscribed

7. Check logs at bottom of page - you should see:
   ```
   [time] Initializing Push Notification SDK...
   [time] ✅ SDK initialized successfully
   [time] Requesting notification permission...
   [time] ✅ Successfully subscribed!
   [time] Subscription ID: <some-uuid>
   ```

### Step 7: Verify in Dashboard

1. Go back to admin dashboard (http://localhost:3002)
2. Refresh the page
3. Your project should now show:
   - Subscriptions: **1**
   - Notifications: 0

### Step 8: Send Test Notification

In the admin dashboard:

1. Click on your project card (or "View Details")
2. You should see project details
3. (For now, we'll use API to send - dashboard send UI can be added)

Use this command:
```bash
# First, login and get token
curl -X POST http://localhost:3001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "changeme123"
  }'

# Copy the "token" from response
# Then send notification (replace TOKEN and PROJECT_ID):
curl -X POST http://localhost:3001/api/v1/YOUR_PROJECT_ID/notifications/send \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "Hello World!",
    "body": "This is your first test notification!",
    "icon": "https://via.placeholder.com/192",
    "url": "http://localhost:8000",
    "targetType": "all"
  }'
```

**Expected:** You should see a notification pop up!

### Step 9: Verify Notification

1. Check your browser - you should see the notification
2. Click the notification - it should open http://localhost:8000
3. Check admin dashboard - Notifications count should be 1

### Step 10: Stop Services

```bash
# Stop all services
docker-compose -f docker/docker-compose.yml down

# Stop and remove all data
docker-compose -f docker/docker-compose.yml down -v
```

---

## Method 2: Manual Testing (Without Docker)

### Step 1: Install Dependencies

```bash
cd /home/user/push-notification-service

# Run setup script
chmod +x setup.sh
./setup.sh
```

This will install dependencies for:
- Backend
- Client SDK
- Admin Dashboard

### Step 2: Setup PostgreSQL

```bash
# Create database
createdb push_notifications

# Or using psql:
psql -U postgres -c "CREATE DATABASE push_notifications;"
```

### Step 3: Setup Redis

```bash
# Start Redis
redis-server

# OR if using Homebrew (macOS):
brew services start redis

# OR if using apt (Ubuntu):
sudo systemctl start redis
```

### Step 4: Configure Backend

```bash
cd backend

# Copy environment file
cp .env.example .env

# Edit .env
nano .env  # or vim, code, etc.
```

Update these values in `.env`:
```env
PORT=3001
NODE_ENV=development
DATABASE_URL="postgresql://postgres:password@localhost:5432/push_notifications?schema=public"
REDIS_HOST=localhost
REDIS_PORT=6379
JWT_SECRET=your-super-secret-key-change-this
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3002,http://localhost:8000
API_BASE_URL=http://localhost:3001
```

### Step 5: Run Database Migrations

```bash
cd backend
npm run db:migrate

# You should see migration success messages
```

### Step 6: Create Admin User

```bash
# Start backend temporarily
npm run dev

# In another terminal, create admin user:
curl -X POST http://localhost:3001/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "changeme123",
    "name": "Admin User"
  }'

# Stop backend (Ctrl+C)
```

### Step 7: Build Client SDK

```bash
cd ../client-sdk
npm run build

# You should see dist/index.js and dist/index.esm.js created
```

### Step 8: Start All Services

Open **3 terminals**:

**Terminal 1 - Backend:**
```bash
cd /home/user/push-notification-service/backend
npm run dev

# Should see: "🚀 Server running on port 3001"
```

**Terminal 2 - Worker:**
```bash
cd /home/user/push-notification-service/backend
npm run worker

# Should see: "Worker started and waiting for jobs..."
```

**Terminal 3 - Admin Dashboard:**
```bash
cd /home/user/push-notification-service/admin-dashboard
npm run dev

# Should see: "ready - started server on 0.0.0.0:3002"
```

### Step 9: Follow Docker Steps 3-9

Continue with Steps 3-9 from the Docker method above:
- Access dashboard at http://localhost:3002
- Create project
- Test example website
- Send notification

---

## Quick Health Checks

### Check Backend API
```bash
curl http://localhost:3001/health
# Should return: {"status":"ok","timestamp":"..."}
```

### Check Admin Dashboard
```bash
curl http://localhost:3002
# Should return HTML
```

### Check Database Connection
```bash
cd backend
npx prisma studio
# Opens database GUI at http://localhost:5555
```

### Check Redis
```bash
redis-cli ping
# Should return: PONG
```

---

## Testing Checklist

- [ ] Services start without errors
- [ ] Can access admin dashboard
- [ ] Can login with default credentials
- [ ] Can create a project
- [ ] Receive API key
- [ ] Example website loads
- [ ] SDK initializes successfully
- [ ] Can subscribe to notifications
- [ ] Subscription appears in dashboard
- [ ] Can send notification via API
- [ ] Notification appears in browser
- [ ] Clicking notification works
- [ ] Analytics show correct counts

---

## Common Issues & Solutions

### Issue: Port already in use
```bash
# Find and kill process
lsof -ti:3001 | xargs kill -9  # Backend
lsof -ti:3002 | xargs kill -9  # Dashboard
lsof -ti:5432 | xargs kill -9  # PostgreSQL
lsof -ti:6379 | xargs kill -9  # Redis
```

### Issue: Database connection failed
```bash
# Check PostgreSQL is running
pg_isready

# Check connection
psql -U postgres -d push_notifications -c "SELECT 1"
```

### Issue: Redis connection failed
```bash
# Check Redis is running
redis-cli ping

# Start Redis
redis-server
```

### Issue: Permission denied for notifications
- Clear browser data
- Try in incognito/private window
- Check browser settings: Settings → Privacy → Notifications
- Ensure using HTTPS or localhost

### Issue: Service worker not registering
- Check browser console for errors
- Ensure push-sw.js is in public folder
- Clear service workers: DevTools → Application → Service Workers → Unregister
- Hard refresh (Ctrl+Shift+R)

### Issue: Notification not received
- Check backend logs for errors
- Check worker logs - should show "Processing notification job..."
- Verify subscription is active in database
- Check browser console for service worker errors
- Ensure notification permission is granted

---

## Testing Specific Features

### Test Segmentation

Send to Chrome users only:
```bash
curl -X POST http://localhost:3001/api/v1/YOUR_PROJECT_ID/notifications/send \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "Chrome Users Only",
    "body": "This notification targets Chrome browsers",
    "targetType": "segment",
    "targetCriteria": {
      "browser": "Chrome"
    }
  }'
```

### Test Scheduled Notification

Schedule for 1 minute from now:
```bash
# Get timestamp 1 minute from now
SEND_AT=$(date -u -d '+1 minute' +"%Y-%m-%dT%H:%M:%SZ")

curl -X POST http://localhost:3001/api/v1/YOUR_PROJECT_ID/notifications/send \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d "{
    \"title\": \"Scheduled Notification\",
    \"body\": \"This was scheduled!\",
    \"targetType\": \"all\",
    \"schedule\": {
      \"sendAt\": \"$SEND_AT\"
    }
  }"
```

### Test Tags

Add tags to subscription:
```bash
curl -X PATCH http://localhost:3001/api/v1/public/YOUR_API_KEY/subscriptions/YOUR_SUBSCRIPTION_ID \
  -H "Content-Type: application/json" \
  -d '{
    "tags": {
      "premium": "true",
      "region": "us-east"
    }
  }'
```

Then send to premium users:
```bash
curl -X POST http://localhost:3001/api/v1/YOUR_PROJECT_ID/notifications/send \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "Premium Feature",
    "body": "Exclusive for premium users",
    "targetType": "segment",
    "targetCriteria": {
      "tags": {"premium": "true"}
    }
  }'
```

---

## Performance Testing

### Test with Multiple Subscriptions

```bash
# Subscribe from multiple browsers/devices
# Or use this script to simulate:

for i in {1..10}; do
  curl -X POST http://localhost:3001/api/v1/public/YOUR_API_KEY/subscriptions \
    -H "Content-Type: application/json" \
    -d "{
      \"endpoint\": \"https://fcm.googleapis.com/fcm/send/test-$i\",
      \"keys\": {
        \"p256dh\": \"test-key-$i\",
        \"auth\": \"test-auth-$i\"
      }
    }"
done
```

### Monitor Queue

```bash
# Check queue status
docker exec -it push-notification-redis redis-cli

# In redis-cli:
KEYS bull:notifications:*
LLEN bull:notifications:waiting
LLEN bull:notifications:completed
```

---

## Clean Up After Testing

```bash
# Docker cleanup
docker-compose -f docker/docker-compose.yml down -v

# Manual cleanup
dropdb push_notifications
redis-cli FLUSHALL

# Clear browser data
# Settings → Privacy → Clear browsing data → Cached images and files
```

---

## Next Steps After Testing

1. ✅ Integrate with your portfolio (replace OneSignal)
2. ✅ Customize notification icons and styling
3. ✅ Deploy to production
4. ✅ Set up monitoring
5. ✅ Configure backup strategy

---

**Happy Testing! 🚀**
