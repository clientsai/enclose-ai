#!/bin/bash

# Set Vercel Environment Variables for Production

echo "🔧 Setting Vercel production environment variables..."
echo ""

# Function to add environment variable
add_env() {
    local key=$1
    local value=$2
    echo "Setting $key..."
    echo "$value" | vercel env add "$key" production 2>/dev/null || echo "  $key already exists"
}

# App Configuration
add_env "NEXT_PUBLIC_APP_URL" "https://enclose.ai"

# Supabase Configuration
add_env "NEXT_PUBLIC_SUPABASE_URL" "https://tkewnicadlfvgjqnwwqo.supabase.co"
add_env "NEXT_PUBLIC_SUPABASE_ANON_KEY" "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRrZXduaWNhZGxmdmdqcW53d3FvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYyNjE0NTIsImV4cCI6MjA1MTgzNzQ1Mn0.u-5XiobGJkTJkUyQb0S2SEPZt-r0loQhQ-3dKkLqhVo"
add_env "SUPABASE_SERVICE_ROLE_KEY" "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRrZXduaWNhZGxmdmdqcW53d3FvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlYXQiOjE3MzYyNjE0NTIsImV4cCI6MjA1MTgzNzQ1Mn0.z_lsQQKYLB3dzylK2wJkOLKu_fc9pFFDcWEYvq8f9tY"

# Stripe Configuration - LIVE KEYS (must be set via environment or .env.production)
# These should be loaded from .env.production file
if [ -f ".env.production" ]; then
    source .env.production
fi

add_env "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY" "${NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:-your_publishable_key}"
add_env "STRIPE_SECRET_KEY" "${STRIPE_SECRET_KEY:-your_secret_key}"
add_env "STRIPE_WEBHOOK_SECRET" "whsec_IhZqBY72eMi95Bnj7Y5QVcVY1QQuOaHf"
add_env "STRIPE_CLIENT_ID" "ca_RzQKXnOiN2ZUIRONnmxsP4JrZzQnWF8U"

# Stripe Product IDs
add_env "STRIPE_STARTER_PRODUCT_ID" "prod_T4kMgP5RUbofDl"
add_env "STRIPE_PRO_PRODUCT_ID" "prod_T4kM6JDOrK1JzK"
add_env "STRIPE_ENTERPRISE_PRODUCT_ID" "prod_T4kM7bOugxFmHp"

# Stripe Price IDs
add_env "STRIPE_STARTER_MONTHLY_PRICE_ID" "price_1S8arnE48xgU8owVYDg8V69z"
add_env "STRIPE_PRO_MONTHLY_PRICE_ID" "price_1S8aroE48xgU8owVTLpQbaKz"
add_env "STRIPE_STARTER_YEARLY_PRICE_ID" "price_1S8aroE48xgU8owVyLWsdHcr"
add_env "STRIPE_PRO_YEARLY_PRICE_ID" "price_1S8arpE48xgU8owV2FKFOqvU"

# Other Configuration
add_env "ENCRYPTION_KEY" "32_char_production_encryption_key_2024secure"
add_env "NODE_ENV" "production"
add_env "STRIPE_TEST_MODE" "false"
add_env "CLIENTS_AI_WEBHOOK_URL" "https://clients.ai/webhooks"
add_env "CLIENTS_AI_WEBHOOK_SECRET" "prod_webhook_secret_2024"

echo ""
echo "✅ All environment variables have been set!"
echo ""
echo "You can now deploy with: vercel --prod"