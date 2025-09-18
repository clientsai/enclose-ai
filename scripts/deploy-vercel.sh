#!/bin/bash

# Vercel Deployment Script for Enclose.AI
# This script sets up all environment variables and deploys to production

echo "🚀 Deploying Enclose.AI to Vercel..."
echo ""

# Source the production environment file
source .env.production

echo "📝 Setting production environment variables in Vercel..."

# Set all environment variables
vercel env add NEXT_PUBLIC_APP_URL production <<< "https://enclose.ai"
vercel env add NEXT_PUBLIC_SUPABASE_URL production <<< "$NEXT_PUBLIC_SUPABASE_URL"
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production <<< "$NEXT_PUBLIC_SUPABASE_ANON_KEY"
vercel env add SUPABASE_SERVICE_ROLE_KEY production <<< "$SUPABASE_SERVICE_ROLE_KEY"
vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY production <<< "$NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
vercel env add STRIPE_SECRET_KEY production <<< "$STRIPE_SECRET_KEY"
vercel env add STRIPE_WEBHOOK_SECRET production <<< "$STRIPE_WEBHOOK_SECRET"
vercel env add STRIPE_CLIENT_ID production <<< "$STRIPE_CLIENT_ID"
vercel env add ENCRYPTION_KEY production <<< "$ENCRYPTION_KEY"
vercel env add NODE_ENV production <<< "production"
vercel env add STRIPE_TEST_MODE production <<< "false"
vercel env add CLIENTS_AI_WEBHOOK_URL production <<< "$CLIENTS_AI_WEBHOOK_URL"
vercel env add CLIENTS_AI_WEBHOOK_SECRET production <<< "$CLIENTS_AI_WEBHOOK_SECRET"

# Add Stripe product and price IDs
vercel env add STRIPE_STARTER_PRODUCT_ID production <<< "prod_T4kMgP5RUbofDl"
vercel env add STRIPE_PRO_PRODUCT_ID production <<< "prod_T4kM6JDOrK1JzK"
vercel env add STRIPE_ENTERPRISE_PRODUCT_ID production <<< "prod_T4kM7bOugxFmHp"
vercel env add STRIPE_STARTER_MONTHLY_PRICE_ID production <<< "price_1S8arnE48xgU8owVYDg8V69z"
vercel env add STRIPE_PRO_MONTHLY_PRICE_ID production <<< "price_1S8aroE48xgU8owVTLpQbaKz"
vercel env add STRIPE_STARTER_YEARLY_PRICE_ID production <<< "price_1S8aroE48xgU8owVyLWsdHcr"
vercel env add STRIPE_PRO_YEARLY_PRICE_ID production <<< "price_1S8arpE48xgU8owV2FKFOqvU"

echo ""
echo "✅ Environment variables set!"
echo ""
echo "🚀 Deploying to Vercel production..."

# Deploy to production
vercel --prod --yes

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📋 Next steps:"
echo "1. Add custom domain 'enclose.ai' in Vercel dashboard"
echo "2. Update DNS records to point to Vercel"
echo "3. Test the live payment flow at https://enclose.ai"
echo ""
echo "🎉 Enclose.AI is now LIVE in production!"