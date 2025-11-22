# API Documentation

Complete API reference for the Push Notification Microservice.

## Base URL

```
http://localhost:3001/api/v1
```

## Authentication

Admin endpoints require JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

Get a token by calling the login endpoint.

---

## Auth Endpoints

### Register

Create a new admin user.

```http
POST /auth/register
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

**Response:**
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "admin"
  },
  "token": "jwt_token_here"
}
```

### Login

Authenticate and get a token.

```http
POST /auth/login
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "admin"
  },
  "token": "jwt_token_here"
}
```

### Get Profile

Get current user profile.

```http
GET /auth/profile
```

**Headers:**
```
Authorization: Bearer YOUR_TOKEN
```

**Response:**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "name": "John Doe",
  "role": "admin",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

---

## Project Endpoints

### Get Project Config (Public)

Get project configuration for SDK initialization.

```http
GET /projects/public/:apiKey/config
```

**Response:**
```json
{
  "vapidPublicKey": "BG7x...",
  "projectName": "My Website",
  "domain": "https://example.com"
}
```

### List Projects

Get all projects for the authenticated user.

```http
GET /projects
```

**Headers:**
```
Authorization: Bearer YOUR_TOKEN
```

**Response:**
```json
[
  {
    "id": "uuid",
    "name": "My Website",
    "apiKey": "uuid",
    "vapidPublicKey": "BG7x...",
    "domain": "https://example.com",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "_count": {
      "subscriptions": 150,
      "notifications": 25
    }
  }
]
```

### Create Project

Create a new project.

```http
POST /projects
```

**Headers:**
```
Authorization: Bearer YOUR_TOKEN
```

**Request Body:**
```json
{
  "name": "My Website",
  "domain": "https://example.com"
}
```

**Response:**
```json
{
  "id": "uuid",
  "name": "My Website",
  "apiKey": "uuid",
  "vapidPublicKey": "BG7x...",
  "domain": "https://example.com",
  "isActive": true,
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

### Update Project

Update project details.

```http
PUT /projects/:projectId
```

**Headers:**
```
Authorization: Bearer YOUR_TOKEN
```

**Request Body:**
```json
{
  "name": "Updated Name",
  "domain": "https://newdomain.com",
  "isActive": false
}
```

### Delete Project

Delete a project and all its data.

```http
DELETE /projects/:projectId
```

**Headers:**
```
Authorization: Bearer YOUR_TOKEN
```

---

## Subscription Endpoints

### Subscribe (Public)

Subscribe a user to push notifications.

```http
POST /public/:apiKey/subscriptions
```

**Request Body:**
```json
{
  "endpoint": "https://fcm.googleapis.com/fcm/send/...",
  "keys": {
    "p256dh": "BG7x...",
    "auth": "abc123..."
  },
  "browserDetails": {
    "userAgent": "Mozilla/5.0...",
    "browser": {
      "name": "Chrome",
      "version": "120.0"
    },
    "os": {
      "name": "Windows",
      "version": "10"
    },
    "deviceType": "desktop"
  },
  "metadata": {
    "timezone": "America/New_York",
    "language": "en-US"
  }
}
```

**Response:**
```json
{
  "subscriptionId": "uuid",
  "success": true
}
```

### Unsubscribe (Public)

Unsubscribe a user.

```http
DELETE /public/:apiKey/subscriptions/:endpoint
```

Note: `endpoint` should be URL-encoded.

**Response:**
```json
{
  "success": true
}
```

### Update Subscription (Public)

Update subscription metadata or tags.

```http
PATCH /public/:apiKey/subscriptions/:subscriptionId
```

**Request Body:**
```json
{
  "tags": {
    "premium": "true",
    "interests": "sports,tech"
  },
  "lastSeen": "2024-01-01T00:00:00.000Z"
}
```

### List Subscriptions (Admin)

Get all subscriptions for a project.

```http
GET /admin/:projectId/subscriptions?page=1&limit=50&isActive=true&search=chrome
```

**Headers:**
```
Authorization: Bearer YOUR_TOKEN
```

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 50)
- `isActive` (boolean): Filter by active status
- `search` (string): Search in browser/OS/device fields

**Response:**
```json
{
  "subscriptions": [
    {
      "id": "uuid",
      "endpoint": "https://fcm.googleapis.com/...",
      "browserName": "Chrome",
      "browserVersion": "120.0",
      "osName": "Windows",
      "osVersion": "10",
      "deviceType": "desktop",
      "isActive": true,
      "subscribedAt": "2024-01-01T00:00:00.000Z",
      "tags": []
    }
  ],
  "total": 150,
  "page": 1,
  "limit": 50,
  "totalPages": 3
}
```

---

## Notification Endpoints

### Send Notification

Create and send a notification.

```http
POST /:projectId/notifications/send
```

**Headers:**
```
Authorization: Bearer YOUR_TOKEN
```

**Request Body:**
```json
{
  "title": "Hello World!",
  "body": "This is your notification message",
  "icon": "https://example.com/icon.png",
  "badge": "https://example.com/badge.png",
  "image": "https://example.com/image.png",
  "url": "https://example.com/article",
  "targetType": "segment",
  "targetCriteria": {
    "tags": {
      "premium": "true"
    },
    "browser": "Chrome",
    "os": "Windows",
    "subscriptionIds": ["uuid1", "uuid2"]
  },
  "schedule": {
    "sendAt": "2024-01-01T12:00:00.000Z"
  }
}
```

**Target Types:**
- `all`: Send to all active subscriptions
- `segment`: Send to filtered subscriptions
- `individual`: Send to specific subscription IDs

**Response:**
```json
{
  "id": "uuid",
  "title": "Hello World!",
  "body": "This is your notification message",
  "status": "scheduled",
  "scheduledAt": "2024-01-01T12:00:00.000Z",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

### List Notifications

Get all notifications for a project.

```http
GET /:projectId/notifications?page=1&limit=50
```

**Headers:**
```
Authorization: Bearer YOUR_TOKEN
```

**Response:**
```json
{
  "notifications": [
    {
      "id": "uuid",
      "title": "Hello World!",
      "body": "This is your notification",
      "status": "sent",
      "totalSent": 150,
      "totalDelivered": 145,
      "totalClicked": 23,
      "totalFailed": 5,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "sentAt": "2024-01-01T00:05:00.000Z"
    }
  ],
  "total": 25,
  "page": 1,
  "limit": 50,
  "totalPages": 1
}
```

### Get Notification Stats

Get detailed stats for a notification.

```http
GET /:projectId/notifications/:notificationId/stats
```

**Headers:**
```
Authorization: Bearer YOUR_TOKEN
```

**Response:**
```json
{
  "id": "uuid",
  "title": "Hello World!",
  "totalSent": 150,
  "totalDelivered": 145,
  "totalClicked": 23,
  "totalFailed": 5,
  "clickRate": 15.33,
  "logs": [
    {
      "id": "uuid",
      "status": "clicked",
      "sentAt": "2024-01-01T00:05:00.000Z",
      "deliveredAt": "2024-01-01T00:05:02.000Z",
      "clickedAt": "2024-01-01T00:05:10.000Z"
    }
  ]
}
```

### Get Analytics

Get project analytics.

```http
GET /:projectId/analytics
```

**Headers:**
```
Authorization: Bearer YOUR_TOKEN
```

**Response:**
```json
{
  "subscriptions": {
    "total": 150,
    "active": 145
  },
  "notifications": {
    "total": 25,
    "last30Days": 10
  },
  "stats": {
    "totalSent": 3750,
    "totalDelivered": 3625,
    "totalClicked": 575,
    "totalFailed": 125
  }
}
```

---

## Webhook Endpoints

### Record Delivery/Click

Record notification delivery or click (called by service worker).

```http
POST /webhooks/delivery
```

**Request Body:**
```json
{
  "notificationId": "uuid",
  "subscriptionId": "uuid",
  "status": "delivered"
}
```

**Status values:**
- `delivered`: Notification was delivered
- `clicked`: User clicked the notification

**Response:**
```json
{
  "success": true
}
```

---

## Error Responses

All endpoints return errors in this format:

```json
{
  "error": "Error message here"
}
```

Common HTTP status codes:
- `400`: Bad Request (validation error)
- `401`: Unauthorized (missing or invalid token)
- `403`: Forbidden (invalid token)
- `404`: Not Found
- `500`: Internal Server Error
