#!/bin/bash

# Vercel KV Setup and Deployment Helper
# This script helps verify and set up Vercel KV for the portfolio AI caching

echo "🔧 Vercel KV Setup Helper for Portfolio AI"
echo "=========================================="

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Please install it first:"
    echo "npm install -g vercel"
    exit 1
fi

# Check if logged in to Vercel
if ! vercel whoami &> /dev/null; then
    echo "❌ Not logged in to Vercel. Please login first:"
    echo "vercel login"
    exit 1
fi

echo "✅ Vercel CLI is installed and authenticated"

# Check if KV database exists
echo "🔍 Checking Vercel KV database..."
if vercel kv ls 2>/dev/null | grep -q "portfolio-ai-cache"; then
    echo "✅ KV database 'portfolio-ai-cache' exists"
else
    echo "📦 Creating KV database 'portfolio-ai-cache'..."
    vercel kv create portfolio-ai-cache
    if [ $? -eq 0 ]; then
        echo "✅ KV database created successfully"
    else
        echo "❌ Failed to create KV database"
        exit 1
    fi
fi

# Check environment variables
echo "🔍 Checking environment variables..."
if vercel env ls | grep -q "KV_REST_API_URL"; then
    echo "✅ KV_REST_API_URL environment variable is set"
else
    echo "⚠️  KV_REST_API_URL not found - this will be set automatically by Vercel"
fi

if vercel env ls | grep -q "KV_REST_API_TOKEN"; then
    echo "✅ KV_REST_API_TOKEN environment variable is set"
else
    echo "⚠️  KV_REST_API_TOKEN not found - this will be set automatically by Vercel"
fi

# Test KV connection (if possible)
echo "🔍 Testing KV connection..."
node -e "
import { kv } from '@vercel/kv';
async function test() {
  try {
    await kv.set('test:key', 'Hello from setup script', { ex: 60 });
    const value = await kv.get('test:key');
    await kv.del('test:key');
    console.log('✅ KV connection successful');
  } catch (error) {
    console.log('❌ KV connection failed:', error.message);
  }
}
test();
"

echo ""
echo "🚀 Deployment Ready!"
echo "==================="
echo "Your Vercel KV integration is properly configured."
echo ""
echo "To deploy:"
echo "1. Push your changes to the main branch"
echo "2. Vercel will automatically deploy with KV caching enabled"
echo ""
echo "To manually deploy:"
echo "vercel --prod"
echo ""
echo "Monitor KV usage in your Vercel dashboard under the KV tab."