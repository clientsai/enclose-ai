#!/bin/bash

echo "========================================="
echo "VERCEL ENVIRONMENT SETUP FOR ENCLOSE.AI"
echo "========================================="
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "❌ .env.local file not found!"
    echo "Please run get-stripe-info.html first to generate your configuration"
    exit 1
fi

echo "Found .env.local file. Adding variables to Vercel..."
echo ""

# Function to add env var to Vercel
add_to_vercel() {
    local key=$1
    local value=$2
    echo "Adding $key..."
    echo "$value" | vercel env add "$key" production --yes 2>/dev/null
    echo "$value" | vercel env add "$key" preview --yes 2>/dev/null
    echo "$value" | vercel env add "$key" development --yes 2>/dev/null
}

# Read .env.local and add each variable
while IFS='=' read -r key value; do
    # Skip comments and empty lines
    if [[ ! "$key" =~ ^#.*$ ]] && [[ ! -z "$key" ]]; then
        # Remove any surrounding quotes from value
        value="${value%\"}"
        value="${value#\"}"
        value="${value%\'}"
        value="${value#\'}"

        add_to_vercel "$key" "$value"
    fi
done < .env.local

echo ""
echo "✅ Environment variables added to Vercel!"
echo ""
echo "========================================="
echo "FINAL STEPS:"
echo "========================================="
echo ""
echo "1. SUPABASE SETUP (if not done yet):"
echo "   - Go to: https://supabase.com"
echo "   - Create a new project"
echo "   - Run the SQL from supabase/schema.sql in SQL Editor"
echo "   - Get your keys from Settings → API"
echo "   - Update the Supabase variables in Vercel"
echo ""
echo "2. REDEPLOY YOUR APPLICATION:"
echo "   Run: vercel --prod --yes"
echo "   Or go to: https://vercel.com/clientsais-projects/enclose-ai"
echo "   Click 'Redeploy' on the latest deployment"
echo ""
echo "3. TEST YOUR APPLICATION:"
echo "   Visit: https://enclose-ai.vercel.app"
echo "   - Click 'Get Started' to create an account"
echo "   - Connect your Stripe account via OAuth"
echo "   - Create a test payment link"
echo ""
echo "Your app will be fully functional once Supabase is configured!"