#!/bin/bash
# Quick deployment script for Fuaad's Portfolio

set -e

echo "🚀 Fuaad Portfolio - Deployment Helper"
echo "======================================"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Not in portfolio directory"
    exit 1
fi

# Build locally to catch errors before deploying
echo "📦 Running production build test..."
pnpm build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed. Fix errors before deploying."
    exit 1
fi

echo ""
echo "🎯 Next Steps:"
echo "-------------"
echo "1. Push to GitHub:"
echo "   git push origin main"
echo ""
echo "2. Deploy to Vercel:"
echo "   → Go to https://vercel.com/new"
echo "   → Import: fuaadabdullah/fuaad-portfolio"
echo "   → Click 'Deploy'"
echo ""
echo "3. Post-deployment (see DEPLOYMENT.md):"
echo "   ✓ Enable Analytics in Vercel dashboard"
echo "   ✓ Add custom domain"
echo "   ✓ Set environment variables"
echo "   ✓ Get Formspree ID and update services page"
echo "   ✓ Submit sitemap to Google Search Console"
echo ""
echo "📖 Full guide: See DEPLOYMENT.md"
