#!/bin/bash

# Enclose.AI Stripe Setup Script
# This script sets up all Stripe products, prices, and webhooks

STRIPE_CLI="$HOME/.local/bin/stripe"

echo "🔧 Setting up Stripe for Enclose.AI..."
echo ""
echo "This script will:"
echo "1. Create products in Stripe"
echo "2. Set up pricing"
echo "3. Configure webhooks"
echo "4. Set up test data"
echo ""

# Check if Stripe CLI is logged in
if ! $STRIPE_CLI config --list >/dev/null 2>&1; then
    echo "📝 Please log in to Stripe CLI first:"
    $STRIPE_CLI login
fi

echo ""
echo "✅ Creating products and prices..."

# Create Starter Product
STARTER_PRODUCT=$($STRIPE_CLI products create \
  --name="Enclose.AI Starter" \
  --description="Perfect for small businesses and startups" \
  --metadata="tier=starter" \
  --metadata="max_transactions=100" \
  --metadata="team_members=1" \
  -d \
  | grep -o '"id": "[^"]*"' | head -1 | cut -d'"' -f4)

echo "Created Starter product: $STARTER_PRODUCT"

# Create Starter Monthly Price
STARTER_MONTHLY=$($STRIPE_CLI prices create \
  --product=$STARTER_PRODUCT \
  --unit-amount=2900 \
  --currency=usd \
  --recurring="interval=month" \
  --metadata="plan=starter" \
  --metadata="billing=monthly" \
  -d \
  | grep -o '"id": "[^"]*"' | head -1 | cut -d'"' -f4)

echo "Created Starter monthly price: $STARTER_MONTHLY"

# Create Starter Yearly Price
STARTER_YEARLY=$($STRIPE_CLI prices create \
  --product=$STARTER_PRODUCT \
  --unit-amount=29000 \
  --currency=usd \
  --recurring="interval=year" \
  --metadata="plan=starter" \
  --metadata="billing=yearly" \
  -d \
  | grep -o '"id": "[^"]*"' | head -1 | cut -d'"' -f4)

echo "Created Starter yearly price: $STARTER_YEARLY"

# Create Professional Product
PRO_PRODUCT=$($STRIPE_CLI products create \
  --name="Enclose.AI Professional" \
  --description="For growing businesses with higher volume" \
  --metadata="tier=professional" \
  --metadata="max_transactions=1000" \
  --metadata="team_members=5" \
  -d \
  | grep -o '"id": "[^"]*"' | head -1 | cut -d'"' -f4)

echo "Created Professional product: $PRO_PRODUCT"

# Create Professional Monthly Price
PRO_MONTHLY=$($STRIPE_CLI prices create \
  --product=$PRO_PRODUCT \
  --unit-amount=9900 \
  --currency=usd \
  --recurring="interval=month" \
  --metadata="plan=professional" \
  --metadata="billing=monthly" \
  -d \
  | grep -o '"id": "[^"]*"' | head -1 | cut -d'"' -f4)

echo "Created Professional monthly price: $PRO_MONTHLY"

# Create Professional Yearly Price
PRO_YEARLY=$($STRIPE_CLI prices create \
  --product=$PRO_PRODUCT \
  --unit-amount=99000 \
  --currency=usd \
  --recurring="interval=year" \
  --metadata="plan=professional" \
  --metadata="billing=yearly" \
  -d \
  | grep -o '"id": "[^"]*"' | head -1 | cut -d'"' -f4)

echo "Created Professional yearly price: $PRO_YEARLY"

# Create Enterprise Product
ENTERPRISE_PRODUCT=$($STRIPE_CLI products create \
  --name="Enclose.AI Enterprise" \
  --description="Custom solutions for large organizations" \
  --metadata="tier=enterprise" \
  --metadata="max_transactions=unlimited" \
  --metadata="team_members=unlimited" \
  -d \
  | grep -o '"id": "[^"]*"' | head -1 | cut -d'"' -f4)

echo "Created Enterprise product: $ENTERPRISE_PRODUCT"

# Enterprise pricing is custom - no fixed price created

echo ""
echo "📝 Creating .env.stripe file with product IDs..."

cat > .env.stripe << EOF
# Stripe Product and Price IDs
# Generated on $(date)

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

# Webhook Endpoint (will be set after creation)
STRIPE_WEBHOOK_ENDPOINT_ID=
EOF

echo "✅ Created .env.stripe file"

echo ""
echo "🔗 Setting up webhook endpoint..."

# Create webhook endpoint for local testing
WEBHOOK_ENDPOINT=$($STRIPE_CLI webhooks create \
  --url="http://localhost:47832/api/stripe/webhooks" \
  --enabled-events="checkout.session.completed" \
  --enabled-events="payment_intent.succeeded" \
  --enabled-events="payment_intent.payment_failed" \
  --enabled-events="customer.subscription.created" \
  --enabled-events="customer.subscription.updated" \
  --enabled-events="customer.subscription.deleted" \
  --enabled-events="invoice.payment_succeeded" \
  --enabled-events="invoice.payment_failed" \
  --metadata="environment=local" \
  -d \
  | grep -o '"id": "[^"]*"' | head -1 | cut -d'"' -f4)

if [ ! -z "$WEBHOOK_ENDPOINT" ]; then
    echo "Created webhook endpoint: $WEBHOOK_ENDPOINT"

    # Update .env.stripe with webhook endpoint ID
    sed -i '' "s/STRIPE_WEBHOOK_ENDPOINT_ID=/STRIPE_WEBHOOK_ENDPOINT_ID=$WEBHOOK_ENDPOINT/" .env.stripe

    echo ""
    echo "⚠️  To receive webhooks locally, run in a separate terminal:"
    echo "~/.local/bin/stripe listen --forward-to localhost:47832/api/stripe/webhooks"
else
    echo "⚠️  Failed to create webhook endpoint. You can create it manually."
fi

echo ""
echo "📝 Updating .env.local with Stripe configuration..."

# Check if .env.local exists
if [ -f ".env.local" ]; then
    echo ""
    echo "⚠️  .env.local already exists. Please add the following manually:"
    echo ""
    cat .env.stripe
    echo ""
    echo "And update these values in .env.local:"
    echo "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=<your publishable key>"
    echo "STRIPE_SECRET_KEY=<your secret key>"
    echo "STRIPE_WEBHOOK_SECRET=<webhook secret from 'stripe listen'>"
else
    echo "Creating new .env.local with Stripe configuration..."
    cat > .env.local << 'EOF'
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret

# OAuth Configuration
STRIPE_CLIENT_ID=your_stripe_client_id

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:47832
ENCRYPTION_KEY=your_32_character_encryption_key_here

# Clients.AI Configuration (Optional)
CLIENTS_AI_WEBHOOK_URL=http://localhost:3000
CLIENTS_AI_WEBHOOK_SECRET=your_webhook_secret
EOF

    # Append product IDs
    cat .env.stripe >> .env.local
fi

echo ""
echo "✅ Stripe setup complete!"
echo ""
echo "Next steps:"
echo "1. Add your Stripe API keys to .env.local"
echo "2. Run webhook listener: ~/.local/bin/stripe listen --forward-to localhost:47832/api/stripe/webhooks"
echo "3. Start the app: npm run dev"
echo ""
echo "Test cards:"
echo "  Success: 4242 4242 4242 4242"
echo "  Decline: 4000 0000 0000 0002"
echo "  Auth Required: 4000 0025 0000 3155"