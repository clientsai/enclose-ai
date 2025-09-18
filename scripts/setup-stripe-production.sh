#!/bin/bash

# Enclose.AI Production Stripe Setup Script
# This script sets up all LIVE products, prices, and webhooks

echo "🚀 Setting up PRODUCTION Stripe for Enclose.AI..."
echo ""
echo "⚠️  WARNING: This will create LIVE products and prices!"
echo "Press Ctrl+C to cancel, or Enter to continue..."
read

# Export the live API key for this session
# You must set STRIPE_API_KEY environment variable before running this script
if [ -z "$STRIPE_API_KEY" ]; then
    echo "Error: STRIPE_API_KEY environment variable is not set"
    echo "Please run: export STRIPE_API_KEY=your_live_secret_key"
    exit 1
fi

echo ""
echo "✅ Creating LIVE products and prices..."

# Create Starter Product
echo "Creating Starter product..."
STARTER_PRODUCT=$(curl -s https://api.stripe.com/v1/products \
  -u "$STRIPE_API_KEY:" \
  -d "name=Enclose.AI Starter" \
  -d "description=Perfect for small businesses and startups - Up to 100 transactions/month" \
  -d "metadata[tier]=starter" \
  -d "metadata[max_transactions]=100" \
  -d "metadata[team_members]=1" \
  | grep -o '"id": "[^"]*"' | head -1 | cut -d'"' -f4)

echo "Created Starter product: $STARTER_PRODUCT"

# Create Starter Monthly Price ($29/month)
echo "Creating Starter monthly price..."
STARTER_MONTHLY=$(curl -s https://api.stripe.com/v1/prices \
  -u "$STRIPE_API_KEY:" \
  -d "product=$STARTER_PRODUCT" \
  -d "unit_amount=2900" \
  -d "currency=usd" \
  -d "recurring[interval]=month" \
  -d "metadata[plan]=starter" \
  -d "metadata[billing]=monthly" \
  | grep -o '"id": "[^"]*"' | head -1 | cut -d'"' -f4)

echo "Created Starter monthly price: $STARTER_MONTHLY"

# Create Starter Yearly Price ($290/year - 2 months free)
echo "Creating Starter yearly price..."
STARTER_YEARLY=$(curl -s https://api.stripe.com/v1/prices \
  -u "$STRIPE_API_KEY:" \
  -d "product=$STARTER_PRODUCT" \
  -d "unit_amount=29000" \
  -d "currency=usd" \
  -d "recurring[interval]=year" \
  -d "metadata[plan]=starter" \
  -d "metadata[billing]=yearly" \
  | grep -o '"id": "[^"]*"' | head -1 | cut -d'"' -f4)

echo "Created Starter yearly price: $STARTER_YEARLY"

# Create Professional Product
echo "Creating Professional product..."
PRO_PRODUCT=$(curl -s https://api.stripe.com/v1/products \
  -u "$STRIPE_API_KEY:" \
  -d "name=Enclose.AI Professional" \
  -d "description=For growing businesses - Up to 1,000 transactions/month" \
  -d "metadata[tier]=professional" \
  -d "metadata[max_transactions]=1000" \
  -d "metadata[team_members]=5" \
  | grep -o '"id": "[^"]*"' | head -1 | cut -d'"' -f4)

echo "Created Professional product: $PRO_PRODUCT"

# Create Professional Monthly Price ($99/month)
echo "Creating Professional monthly price..."
PRO_MONTHLY=$(curl -s https://api.stripe.com/v1/prices \
  -u "$STRIPE_API_KEY:" \
  -d "product=$PRO_PRODUCT" \
  -d "unit_amount=9900" \
  -d "currency=usd" \
  -d "recurring[interval]=month" \
  -d "metadata[plan]=professional" \
  -d "metadata[billing]=monthly" \
  | grep -o '"id": "[^"]*"' | head -1 | cut -d'"' -f4)

echo "Created Professional monthly price: $PRO_MONTHLY"

# Create Professional Yearly Price ($990/year - 2 months free)
echo "Creating Professional yearly price..."
PRO_YEARLY=$(curl -s https://api.stripe.com/v1/prices \
  -u "$STRIPE_API_KEY:" \
  -d "product=$PRO_PRODUCT" \
  -d "unit_amount=99000" \
  -d "currency=usd" \
  -d "recurring[interval]=year" \
  -d "metadata[plan]=professional" \
  -d "metadata[billing]=yearly" \
  | grep -o '"id": "[^"]*"' | head -1 | cut -d'"' -f4)

echo "Created Professional yearly price: $PRO_YEARLY"

# Create Enterprise Product
echo "Creating Enterprise product..."
ENTERPRISE_PRODUCT=$(curl -s https://api.stripe.com/v1/products \
  -u "$STRIPE_API_KEY:" \
  -d "name=Enclose.AI Enterprise" \
  -d "description=Custom solutions for large organizations - Unlimited transactions" \
  -d "metadata[tier]=enterprise" \
  -d "metadata[max_transactions]=unlimited" \
  -d "metadata[team_members]=unlimited" \
  | grep -o '"id": "[^"]*"' | head -1 | cut -d'"' -f4)

echo "Created Enterprise product: $ENTERPRISE_PRODUCT"

echo ""
echo "📝 Creating .env.stripe.production file with LIVE product IDs..."

cat > .env.stripe.production << EOF
# LIVE Stripe Product and Price IDs
# Generated on $(date)
# ⚠️  THESE ARE LIVE PRODUCTION IDS

# Products
STRIPE_STARTER_PRODUCT_ID=$STARTER_PRODUCT
STRIPE_PRO_PRODUCT_ID=$PRO_PRODUCT
STRIPE_ENTERPRISE_PRODUCT_ID=$ENTERPRISE_PRODUCT

# Prices - Monthly
STRIPE_STARTER_MONTHLY_PRICE_ID=$STARTER_MONTHLY
STRIPE_PRO_MONTHLY_PRICE_ID=$PRO_MONTHLY

# Prices - Yearly
STRIPE_STARTER_YEARLY_PRICE_ID=$STARTER_YEARLY
STRIPE_PRO_YEARLY_PRICE_ID=$PRO_YEARLY
EOF

echo "✅ Created .env.stripe.production file"

echo ""
echo "🔗 Setting up PRODUCTION webhook endpoint..."

# Create production webhook endpoint
echo "Creating webhook for https://enclose.ai/api/stripe/webhooks..."
WEBHOOK_RESPONSE=$(curl -s https://api.stripe.com/v1/webhook_endpoints \
  -u "$STRIPE_API_KEY:" \
  -d "url=https://enclose.ai/api/stripe/webhooks" \
  -d "enabled_events[]=checkout.session.completed" \
  -d "enabled_events[]=payment_intent.succeeded" \
  -d "enabled_events[]=payment_intent.payment_failed" \
  -d "enabled_events[]=customer.subscription.created" \
  -d "enabled_events[]=customer.subscription.updated" \
  -d "enabled_events[]=customer.subscription.deleted" \
  -d "enabled_events[]=invoice.payment_succeeded" \
  -d "enabled_events[]=invoice.payment_failed" \
  -d "enabled_events[]=account.updated" \
  -d "enabled_events[]=account.application.deauthorized" \
  -d "metadata[environment]=production" \
  -d "metadata[created_by]=setup_script")

WEBHOOK_ID=$(echo "$WEBHOOK_RESPONSE" | grep -o '"id": "[^"]*"' | head -1 | cut -d'"' -f4)
WEBHOOK_SECRET=$(echo "$WEBHOOK_RESPONSE" | grep -o '"secret": "[^"]*"' | head -1 | cut -d'"' -f4)

if [ ! -z "$WEBHOOK_ID" ]; then
    echo "Created webhook endpoint: $WEBHOOK_ID"
    echo "Webhook secret: $WEBHOOK_SECRET"

    # Update .env.stripe.production with webhook info
    echo "" >> .env.stripe.production
    echo "# Webhook Configuration" >> .env.stripe.production
    echo "STRIPE_WEBHOOK_ENDPOINT_ID=$WEBHOOK_ID" >> .env.stripe.production
    echo "STRIPE_WEBHOOK_SECRET=$WEBHOOK_SECRET" >> .env.stripe.production
else
    echo "⚠️  Failed to create webhook endpoint. Response:"
    echo "$WEBHOOK_RESPONSE"
fi

echo ""
echo "✅ PRODUCTION Stripe setup complete!"
echo ""
echo "📋 Product IDs created:"
echo "  Starter: $STARTER_PRODUCT"
echo "  Professional: $PRO_PRODUCT"
echo "  Enterprise: $ENTERPRISE_PRODUCT"
echo ""
echo "💰 Pricing:"
echo "  Starter: $29/month or $290/year"
echo "  Professional: $99/month or $990/year"
echo "  Enterprise: Custom pricing"
echo ""
echo "🔐 IMPORTANT: Update your production environment with:"
echo "  STRIPE_WEBHOOK_SECRET=$WEBHOOK_SECRET"
echo ""
echo "⚡ Your Stripe account is now configured for production!"