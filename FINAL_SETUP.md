# 🎉 Enclose.AI - Final Setup Steps

## ✅ What's Complete
- **Supabase Connected**: All credentials configured
- **Server Running**: http://localhost:3002
- **Stripe Integration**: Platform keys ready
- **Clients.AI Integration**: Webhook endpoints configured

## 🔴 ONE CRITICAL STEP: Run Database Schema

**I've opened your Supabase SQL Editor. Now:**

1. **Copy the ENTIRE contents** of this file:
   ```
   /Users/ktown/Desktop/enclose-ai/COPY_TO_SUPABASE.sql
   ```

2. **Paste into the SQL Editor** that just opened

3. **Click "Run"** (bottom right button)

4. **You should see**: "Success. No rows returned"

## 🧪 Test Your Setup

### 1. Test Registration
```bash
# Open registration page
open http://localhost:3002/register
```

- Create an account with any email
- You'll be redirected to dashboard

### 2. Test Stripe Connect
In the dashboard, click "Connect Stripe Account":
- It will open Stripe OAuth
- Use your Stripe test account
- Complete the connection

### 3. Create a Payment Link
After connecting Stripe:
- Enter product name: "Test Product"
- Enter amount: 99.99
- Click "Create Link"
- Copy the generated link

### 4. Test Payment
- Open the payment link
- Use test card: `4242 4242 4242 4242`
- Any future date, any CVC
- Payment should succeed

## 📊 How It All Works

### For Enclose.AI Users:
1. **Sign up** → Creates account in your Supabase
2. **Connect Stripe** → Links THEIR Stripe account
3. **Create Payment Links** → Generates links for THEIR products
4. **Receive Payments** → Money goes to THEIR Stripe

### For Clients.AI Integration:
1. **API Key** → User generates in Settings
2. **Conversion Agent** → Calls Enclose API
3. **Payment Link Created** → Returns checkout URL
4. **Customer Pays** → Webhook notifies both systems

## 🔑 Important URLs

- **Homepage**: http://localhost:3002
- **Dashboard**: http://localhost:3002/dashboard
- **Settings/API Keys**: http://localhost:3002/settings
- **Supabase Dashboard**: https://supabase.com/dashboard/project/jwimrbdqsqwjobdninhi

## 💡 Stripe Connect Note

The Client ID I added (`ca_RGDpx5...`) is a test ID. To get your real one:

1. Go to: https://dashboard.stripe.com/test/connect/settings
2. Find **OAuth settings** → **Client ID**
3. Replace in `.env.local` if different

## 🚨 Troubleshooting

### If registration fails:
- Check that you ran the SQL schema
- Verify all tables were created in Supabase

### If Stripe Connect fails:
- Make sure you're in TEST mode in Stripe
- Check that Connect is enabled in your Stripe account

### If payment links don't work:
- Ensure user has connected their Stripe account first
- Check browser console for errors

## 🔄 Clients.AI Integration Test

To test with Clients.AI:

1. **Get API Key** from Settings page
2. **Call the API**:
```bash
curl -X POST http://localhost:3002/api/v1/checkout \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "agent_id": "test_agent",
    "customer_email": "test@example.com",
    "product_name": "Test Product",
    "amount": 99.99
  }'
```

3. **Response** will contain `checkout_url`
4. **Webhook** will fire to Clients.AI on payment

## ✅ Success Checklist

- [ ] Database schema ran successfully
- [ ] Can register new account
- [ ] Can connect Stripe account
- [ ] Can create payment link
- [ ] Can process test payment
- [ ] API key generation works
- [ ] API endpoint responds

## 🎊 You're Done!

Once the database schema is run, Enclose.AI is fully functional!

---

**Need help?** The app logs errors to browser console and terminal.