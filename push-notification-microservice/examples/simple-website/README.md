# Simple Website Example

This example demonstrates how to integrate the push notification SDK into a simple HTML website.

## Setup

1. **Get your API Key:**
   - Start the backend and admin dashboard
   - Login to admin dashboard at http://localhost:3002
   - Create a new project
   - Copy the API Key

2. **Configure the example:**
   - Open `index.html`
   - Replace `YOUR_API_KEY_HERE` with your actual API key
   - Update `apiUrl` if needed

3. **Copy service worker:**
   ```bash
   cp ../../client-sdk/push-sw.js ./push-sw.js
   ```

4. **Serve the files:**
   ```bash
   # Using Python
   python3 -m http.server 8000

   # OR using Node.js
   npx serve .

   # OR using PHP
   php -S localhost:8000
   ```

5. **Test it:**
   - Open http://localhost:8000
   - Click "Subscribe to Notifications"
   - Grant permission
   - Send a test notification from the admin dashboard

## Files

- `index.html` - Main demo page
- `push-sw.js` - Service worker (copy from client-sdk)
- `README.md` - This file

## Notes

- HTTPS is required for push notifications (except on localhost)
- Make sure the backend is running at http://localhost:3001
- Check browser console for detailed logs
