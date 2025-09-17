#!/bin/bash

echo "🚀 Enclose.AI Setup Script"
echo "=========================="
echo ""

# Check if .env.local exists
if [ -f .env.local ]; then
    echo "⚠️  .env.local already exists. Backing up to .env.local.backup"
    cp .env.local .env.local.backup
fi

# Copy example env file
cp .env.example .env.local

echo "✅ Created .env.local from .env.example"
echo ""
echo "📝 Please update the following in .env.local:"
echo ""
echo "1. Supabase Configuration:"
echo "   - NEXT_PUBLIC_SUPABASE_URL"
echo "   - NEXT_PUBLIC_SUPABASE_ANON_KEY"
echo "   - SUPABASE_SERVICE_ROLE_KEY"
echo ""
echo "2. Stripe Configuration:"
echo "   - STRIPE_SECRET_KEY"
echo "   - STRIPE_PUBLISHABLE_KEY"
echo "   - STRIPE_WEBHOOK_SECRET"
echo "   - STRIPE_CLIENT_ID (for Stripe Connect)"
echo ""
echo "3. Generate Encryption Key:"
echo "   Run: openssl rand -base64 32"
echo "   Update: ENCRYPTION_KEY"
echo ""
echo "4. (Optional) Clients.AI Integration:"
echo "   - CLIENTS_AI_WEBHOOK_URL"
echo "   - CLIENTS_AI_WEBHOOK_SECRET"
echo ""
echo "📚 Database Setup:"
echo "1. Go to your Supabase dashboard"
echo "2. Navigate to SQL Editor"
echo "3. Run the SQL from supabase/schema.sql"
echo "4. Run the SQL from supabase/enhanced-schema.sql"
echo ""
echo "🔗 Stripe Webhook Setup:"
echo "1. Go to https://dashboard.stripe.com/webhooks"
echo "2. Add endpoint: https://your-domain.vercel.app/api/stripe/webhooks"
echo "3. Select events:"
echo "   - checkout.session.completed"
echo "   - payment_intent.succeeded"
echo "   - payment_intent.payment_failed"
echo "   - account.updated"
echo "   - account.application.deauthorized"
echo "4. Copy the signing secret to STRIPE_WEBHOOK_SECRET"
echo ""
echo "🎉 Setup complete! Run 'npm run dev' to start the application."