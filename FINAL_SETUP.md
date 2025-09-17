# 🎯 FINAL SETUP - Complete Your Enclose.AI Deployment

## Current Status
✅ Code deployed to GitHub: https://github.com/clientsai/enclose-ai
✅ Application on Vercel: https://enclose-ai.vercel.app (or latest deployment URL)
✅ Helper tools created for configuration
⏳ Waiting for Stripe keys
⏳ Waiting for Supabase setup

## 📋 QUICK SETUP CHECKLIST

### 1️⃣ Get Your Stripe Keys (5 minutes)

**Option A: Use the HTML Helper (RECOMMENDED)**
1. Open the file that just opened in your browser: `get-stripe-info.html`
2. Follow the links to get your Stripe keys
3. Enter them in the form
4. Click "Generate Environment Variables"

**Option B: Manual Collection**
Get these from https://dashboard.stripe.com:
- Secret Key (sk_test_... or sk_live_...)
- Publishable Key (pk_test_... or pk_live_...)
- Connect Client ID (ca_...)
- Webhook Signing Secret (whsec_... - after creating webhook)

### 2️⃣ Configure Stripe Webhook (2 minutes)

1. Go to: https://dashboard.stripe.com/webhooks/create
2. Enter:
   - **Endpoint URL**: `https://enclose-ai.vercel.app/api/stripe/webhooks`
   - **Events**: Select these:
     - checkout.session.completed
     - payment_intent.succeeded
     - payment_intent.payment_failed
3. Copy the "Signing secret" (starts with whsec_)

### 3️⃣ Configure Stripe Connect OAuth (1 minute)

1. Go to: https://dashboard.stripe.com/settings/connect
2. Under OAuth settings, add:
   - **Redirect URI**: `https://enclose-ai.vercel.app/api/stripe/callback`
3. Save changes

### 4️⃣ Set Up Supabase (5 minutes)

1. **Create Account**: https://supabase.com (free)
2. **Create New Project**:
   - Choose a name (e.g., "enclose-ai")
   - Choose a database password (save it!)
   - Select region closest to you
3. **Run Database Schema**:
   - Go to SQL Editor
   - Click "New query"
   - Copy everything from `supabase/schema.sql`
   - Paste and click "Run"
4. **Get Your Keys**:
   - Go to Settings → API
   - Copy:
     - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
     - anon/public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - service_role key → `SUPABASE_SERVICE_ROLE_KEY`
5. **Enable Authentication**:
   - Go to Authentication → Providers
   - Enable "Email" provider

### 5️⃣ Add Environment Variables to Vercel (3 minutes)

**Option A: Use the Script (After creating .env.local)**
```bash
./setup-vercel-env.sh
```

**Option B: Manual via Dashboard**
1. Go to: https://vercel.com/clientsais-projects/enclose-ai/settings/environment-variables
2. Add each variable for Production, Preview, and Development:

```
NEXT_PUBLIC_APP_URL=https://enclose-ai.vercel.app

# From Stripe
STRIPE_SECRET_KEY=[your_key]
STRIPE_PUBLISHABLE_KEY=[your_key]
STRIPE_CLIENT_ID=[your_key]
STRIPE_WEBHOOK_SECRET=[your_key]

# From Supabase
NEXT_PUBLIC_SUPABASE_URL=[your_url]
NEXT_PUBLIC_SUPABASE_ANON_KEY=[your_key]
SUPABASE_SERVICE_ROLE_KEY=[your_key]

# Generated
ENCRYPTION_KEY=[use: openssl rand -base64 32]
```

### 6️⃣ Redeploy Application (1 minute)

After adding all environment variables:

**Option A: Command Line**
```bash
vercel --prod --yes
```

**Option B: Vercel Dashboard**
1. Go to: https://vercel.com/clientsais-projects/enclose-ai
2. Click on latest deployment
3. Click "..." menu → "Redeploy"
4. Choose "Use existing Build Cache"

## ✅ VERIFICATION CHECKLIST

After deployment, test everything:

### Test 1: Homepage
- [ ] Visit https://enclose-ai.vercel.app
- [ ] Page loads without errors
- [ ] "Get Started" button visible

### Test 2: Registration
- [ ] Click "Get Started"
- [ ] Fill out registration form
- [ ] Submit successfully
- [ ] Redirected to dashboard

### Test 3: Stripe OAuth
- [ ] In dashboard, click "Connect Stripe Account"
- [ ] Redirected to Stripe OAuth
- [ ] Authorize connection
- [ ] Redirected back to dashboard

### Test 4: Payment Link Creation
- [ ] Create a test payment link
- [ ] Copy the link
- [ ] Open in new tab
- [ ] Shows Stripe checkout

### Test 5: API Keys
- [ ] Go to Settings
- [ ] Create an API key
- [ ] Key displayed once
- [ ] Key appears in list

## 🚨 TROUBLESHOOTING

### "Application error" on Vercel
- Check all environment variables are set
- Check Vercel function logs
- Redeploy after fixing

### "Database connection failed"
- Verify Supabase project is not paused
- Check Supabase keys are correct
- Ensure schema.sql was run

### "Stripe OAuth fails"
- Verify redirect URI in Stripe Connect settings
- Check STRIPE_CLIENT_ID is correct
- Ensure using correct account (Safe Checkout)

### "Webhook not receiving events"
- Check webhook URL is correct
- Verify signing secret
- Check Stripe dashboard for webhook attempts

## 🎊 SUCCESS INDICATORS

You know everything is working when:
1. ✅ You can create an account
2. ✅ You can log in
3. ✅ Dashboard loads without errors
4. ✅ Stripe OAuth connects successfully
5. ✅ Payment links can be created
6. ✅ API keys can be generated

## 📞 QUICK COMMANDS

```bash
# Check deployment status
vercel ls

# View logs
vercel logs

# Redeploy
vercel --prod --yes

# Run locally with production env
vercel dev
```

## 🏁 FINAL NOTES

- **Stripe Account**: Using "Safe Checkout" account
- **No Impact on Clients.AI**: Separate webhooks, separate products
- **Test Mode First**: Use test keys until everything works
- **Custom Domain**: Can be added later in Vercel settings

---

**Your Enclose.AI platform is ready to go live as soon as you complete these steps!**

The application is fully functional and waiting for your configuration. No code changes needed!