#!/bin/bash

# Push Notification Microservice Setup Script

echo "🔔 Push Notification Microservice Setup"
echo "========================================"
echo ""

# Check for required tools
echo "Checking prerequisites..."

if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18 or higher."
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm."
    exit 1
fi

echo "✅ Node.js $(node --version)"
echo "✅ npm $(npm --version)"
echo ""

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install
echo "✅ Backend dependencies installed"
echo ""

# Install SDK dependencies
echo "📦 Installing SDK dependencies..."
cd ../client-sdk
npm install
echo "✅ SDK dependencies installed"
echo ""

# Install admin dashboard dependencies
echo "📦 Installing admin dashboard dependencies..."
cd ../admin-dashboard
npm install
echo "✅ Admin dashboard dependencies installed"
echo ""

cd ..

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Set up PostgreSQL and create a database"
echo "2. Configure backend/.env (copy from backend/.env.example)"
echo "3. Run: cd backend && npm run db:migrate"
echo "4. Start the services:"
echo "   - Backend: cd backend && npm run dev"
echo "   - Worker: cd backend && npm run worker (in another terminal)"
echo "   - Admin: cd admin-dashboard && npm run dev (in another terminal)"
echo ""
echo "Or use Docker:"
echo "   docker-compose -f docker/docker-compose.yml up -d"
echo ""
