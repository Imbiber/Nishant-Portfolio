#!/bin/bash

# Script to push the push-notification-service to GitHub
# Run this on your Mac terminal

echo "🚀 Pushing Push Notification Service to GitHub"
echo "==============================================="
echo ""

# Check if directory exists
if [ ! -d "push-notification-service" ]; then
  echo "❌ Directory 'push-notification-service' not found in current location"
  echo "Please make sure you're in the right directory or download the project first"
  exit 1
fi

cd push-notification-service

# Check if git is initialized
if [ ! -d ".git" ]; then
  echo "Initializing git repository..."
  git init
  git add .
  git commit -m "feat: complete push notification microservice"
fi

# Rename branch to main
echo "Setting branch to main..."
git branch -M main

# Add remote if not exists
if ! git remote | grep -q "origin"; then
  echo "Adding GitHub remote..."
  git remote add origin https://github.com/Imbiber/web-push.git
fi

# Push to GitHub
echo ""
echo "Pushing to GitHub..."
echo "You may be asked for your GitHub credentials..."
echo ""

git push -u origin main

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ Successfully pushed to GitHub!"
  echo "🔗 View your repository at: https://github.com/Imbiber/web-push"
else
  echo ""
  echo "❌ Push failed. Please check your GitHub credentials."
  echo ""
  echo "Troubleshooting:"
  echo "1. Make sure you're logged into GitHub"
  echo "2. Try using SSH instead:"
  echo "   git remote set-url origin git@github.com:Imbiber/web-push.git"
  echo "   git push -u origin main"
  echo ""
  echo "3. Or use GitHub CLI:"
  echo "   gh auth login"
  echo "   git push -u origin main"
fi
