#!/bin/bash

echo "========================================="
echo "STRIPE CONFIGURATION HELPER FOR ENCLOSE.AI"
echo "========================================="
echo ""
echo "Please follow these steps to get your Stripe keys:"
echo ""
echo "1. OPEN STRIPE DASHBOARD"
echo "   Go to: https://dashboard.stripe.com"
echo ""
echo "2. GET YOUR API KEYS (Safe Checkout account)"
echo "   - Click 'Developers' → 'API keys'"
echo "   - Copy your keys:"
echo ""
echo "   TEST MODE:"
echo "   Publishable key (starts with pk_test_): ___________"
echo "   Secret key (starts with sk_test_): ___________"
echo ""
echo "   LIVE MODE (if ready for production):"
echo "   Publishable key (starts with pk_live_): ___________"
echo "   Secret key (starts with sk_live_): ___________"
echo ""
echo "3. SET UP STRIPE CONNECT (for OAuth)"
echo "   - Go to: https://dashboard.stripe.com/settings/connect"
echo "   - Under 'OAuth settings', configure:"
echo "     - Redirect URI: https://enclose-ai.vercel.app/api/stripe/callback"
echo "   - Copy your Connect Client ID (starts with ca_): ___________"
echo ""
echo "4. CREATE WEBHOOK ENDPOINT"
echo "   - Go to: https://dashboard.stripe.com/webhooks"
echo "   - Click 'Add endpoint'"
echo "   - Endpoint URL: https://enclose-ai.vercel.app/api/stripe/webhooks"
echo "   - Select events:"
echo "     ✓ checkout.session.completed"
echo "     ✓ payment_intent.succeeded"
echo "     ✓ payment_intent.payment_failed"
echo "   - After creating, copy the 'Signing secret' (starts with whsec_): ___________"
echo ""
echo "5. GENERATE ENCRYPTION KEY"
echo "   Run this command:"
echo "   openssl rand -base64 32"
echo ""
echo "========================================="
echo "COPY THESE VALUES:"
echo "========================================="

# Generate encryption key
ENCRYPTION_KEY=$(openssl rand -base64 32)
echo "ENCRYPTION_KEY=$ENCRYPTION_KEY"
echo ""

echo "Now paste your Stripe values here:"
echo ""
read -p "Enter your Stripe TEST/LIVE Secret Key (sk_test_ or sk_live_): " STRIPE_SECRET_KEY
read -p "Enter your Stripe TEST/LIVE Publishable Key (pk_test_ or pk_live_): " STRIPE_PUBLISHABLE_KEY
read -p "Enter your Stripe Connect Client ID (ca_): " STRIPE_CLIENT_ID
read -p "Enter your Webhook Signing Secret (whsec_): " STRIPE_WEBHOOK_SECRET

# Create .env.local file
cat > .env.local << EOF
# Enclose.AI Production Environment Variables
# Generated on $(date)

# Application URL (update when you add custom domain)
NEXT_PUBLIC_APP_URL=https://enclose-ai.vercel.app

# Supabase (we'll set these up next)
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SUPABASE_SERVICE_ROLE_KEY

# Stripe Configuration (Safe Checkout)
STRIPE_SECRET_KEY=$STRIPE_SECRET_KEY
STRIPE_PUBLISHABLE_KEY=$STRIPE_PUBLISHABLE_KEY
STRIPE_WEBHOOK_SECRET=$STRIPE_WEBHOOK_SECRET
STRIPE_CLIENT_ID=$STRIPE_CLIENT_ID

# Encryption Key (auto-generated)
ENCRYPTION_KEY=$ENCRYPTION_KEY
EOF

echo ""
echo "✅ Created .env.local with your Stripe configuration!"
echo ""
echo "========================================="
echo "NEXT STEPS:"
echo "========================================="
echo "1. Set up Supabase (free account at supabase.com)"
echo "2. Add these environment variables to Vercel"
echo "3. Deploy the application"
echo ""
echo "Would you like me to add these to Vercel now? (requires Vercel CLI)"
read -p "Add to Vercel? (y/n): " ADD_TO_VERCEL

if [ "$ADD_TO_VERCEL" = "y" ]; then
    echo "Adding environment variables to Vercel..."

    vercel env add NEXT_PUBLIC_APP_URL production < <(echo "https://enclose-ai.vercel.app")
    vercel env add STRIPE_SECRET_KEY production < <(echo "$STRIPE_SECRET_KEY")
    vercel env add STRIPE_PUBLISHABLE_KEY production < <(echo "$STRIPE_PUBLISHABLE_KEY")
    vercel env add STRIPE_WEBHOOK_SECRET production < <(echo "$STRIPE_WEBHOOK_SECRET")
    vercel env add STRIPE_CLIENT_ID production < <(echo "$STRIPE_CLIENT_ID")
    vercel env add ENCRYPTION_KEY production < <(echo "$ENCRYPTION_KEY")

    echo "✅ Added Stripe keys to Vercel!"
    echo "Note: You still need to add Supabase keys once you create your project"
fi

echo ""
echo "Script complete!"