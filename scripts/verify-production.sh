#!/bin/bash

echo "🔍 Verifying Production Environment Variables..."
echo ""

# Check if the Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI is not installed. Please install it first:"
    echo "   npm i -g vercel"
    exit 1
fi

echo "📋 Environment Variables Required for Production:"
echo "================================================"

# List of required environment variables
REQUIRED_VARS=(
    "NEXT_PUBLIC_SUPABASE_URL"
    "NEXT_PUBLIC_SUPABASE_ANON_KEY"
    "SUPABASE_SERVICE_ROLE_KEY"
    "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
    "STRIPE_SECRET_KEY"
    "NEXT_PUBLIC_APP_URL"
)

echo ""
echo "Please ensure these are set in Vercel:"
echo ""

for var in "${REQUIRED_VARS[@]}"; do
    echo "  ✓ $var"
done

echo ""
echo "📝 To add environment variables to Vercel:"
echo "==========================================="
echo ""
echo "Option 1: Use Vercel Dashboard"
echo "  1. Go to https://vercel.com/dashboard"
echo "  2. Select your project (enclose-ai)"
echo "  3. Go to Settings → Environment Variables"
echo "  4. Add each variable from .env.production"
echo ""
echo "Option 2: Use Vercel CLI"
echo "  Run: vercel env add"
echo ""
echo "Option 3: Push all at once from .env.production"
echo "  Run the following command:"
echo ""
echo "  vercel env pull .env.production"
echo ""
echo "🚀 Quick Setup Script:"
echo "====================="
echo ""
cat << 'EOF'
# Copy and run this to set all variables at once:

while IFS='=' read -r key value; do
    # Skip comments and empty lines
    if [[ ! "$key" =~ ^# ]] && [[ -n "$key" ]]; then
        # Remove any trailing comments
        value=$(echo "$value" | sed 's/#.*//' | xargs)

        # Add to Vercel (production environment)
        echo "$value" | vercel env add "$key" production
    fi
done < .env.production

echo "✅ All environment variables have been added to Vercel!"
EOF

echo ""
echo "⚠️  IMPORTANT: After adding variables, redeploy your application:"
echo "   vercel --prod"
echo ""