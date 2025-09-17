# Enclose.AI - Payment Integration Platform

Enclose.AI is a complete payment integration platform that allows users to connect their Stripe accounts and manage payment links for Clients.AI conversion agents.

## Features

### Standalone Web Application
- **Stripe Connect OAuth**: Secure OAuth flow to connect Stripe accounts
- **Payment Link Management**: Create and manage Stripe Payment Links
- **Dashboard Analytics**: Real-time payment tracking and analytics
- **Product Management**: Create and manage products with custom pricing
- **Mobile Responsive**: Works perfectly on all devices

### API Service for Clients.AI
- **REST API**: Complete API for conversion agent integration
- **Webhook Support**: Real-time payment notifications
- **Secure Authentication**: API key-based authentication
- **Payment Tracking**: Monitor payment status and conversions

## Setup Instructions

### 1. Prerequisites
- Node.js 18+ installed
- Stripe account with Connect enabled
- Supabase account
- Vercel account (for deployment)

### 2. Database Setup

1. Go to your Supabase dashboard
2. Navigate to SQL Editor
3. Run the SQL schema from `enclose-ai-schema.sql`
4. This will create all necessary tables and RLS policies

### 3. Stripe Setup

1. **Create a Stripe Connect Platform**:
   - Go to https://dashboard.stripe.com/test/connect/accounts/overview
   - Enable Stripe Connect
   - Get your Connect settings from https://dashboard.stripe.com/test/connect/settings

2. **Configure OAuth**:
   - Set redirect URI to: `http://localhost:3000/api/stripe/callback` (development)
   - Set redirect URI to: `https://your-domain.com/api/stripe/callback` (production)

3. **Get API Keys**:
   - Publishable key: `pk_test_...`
   - Secret key: `sk_test_...`
   - Client ID: `ca_...` (from Connect settings)

4. **Setup Webhooks**:
   - Add endpoint URL: `http://localhost:3000/api/stripe/webhooks`
   - Select events:
     - `checkout.session.completed`
     - `payment_intent.succeeded`
     - `payment_intent.payment_failed`
     - `account.updated`
     - `account.application.deauthorized`

### 4. Environment Variables

1. Copy `.env.local.example` to `.env.local`
2. Fill in your credentials:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-key

# Stripe
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_CLIENT_ID=ca_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Encryption (generate with: openssl rand -hex 32)
ENCRYPTION_KEY=your-32-byte-hex-key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret
```

### 5. Install Dependencies

```bash
cd enclose-ai
npm install
```

### 6. Run Development Server

```bash
npm run dev
```

Visit http://localhost:3000 to see the application.

## Testing

### Test Stripe Integration

1. **Test OAuth Flow**:
   - Click "Connect Stripe Account"
   - Use Stripe test account credentials
   - Verify connection in dashboard

2. **Test Payment Links**:
   - Create a payment link
   - Use test card: `4242 4242 4242 4242`
   - Any future expiry and any CVC

3. **Test API**:
   ```bash
   curl -X POST http://localhost:3000/api/v1/checkout \
     -H "Authorization: Bearer your-api-key" \
     -H "Content-Type: application/json" \
     -d '{
       "agent_id": "test_agent",
       "product_name": "Test Product",
       "amount": 99.99
     }'
   ```

## Deployment

### Deploy to Vercel

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin your-repo-url
   git push -u origin main
   ```

2. **Connect to Vercel**:
   - Go to https://vercel.com
   - Import GitHub repository
   - Add environment variables
   - Deploy

3. **Update Stripe Webhooks**:
   - Change webhook URL to: `https://your-domain.vercel.app/api/stripe/webhooks`
   - Update OAuth redirect URI

## API Documentation

### Authentication
All API requests require an API key in the Authorization header:
```
Authorization: Bearer encl_your_api_key_here
```

### Endpoints

#### Create Checkout
```
POST /api/v1/checkout
```

Request:
```json
{
  "agent_id": "agent_123",
  "customer_email": "customer@example.com",
  "product_name": "Premium Package",
  "amount": 99.99,
  "currency": "usd",
  "metadata": {}
}
```

Response:
```json
{
  "success": true,
  "checkout_url": "https://checkout.stripe.com/pay/...",
  "payment_link_id": "link_abc123",
  "stripe_payment_link_id": "plink_..."
}
```

#### Get Payments
```
GET /api/v1/payments?agent_id=agent_123
```

Response:
```json
{
  "success": true,
  "payments": [...]
}
```

## Security

- All sensitive data is encrypted using AES-256-GCM
- API keys are hashed using SHA-256
- Stripe webhooks are verified using signatures
- Row Level Security (RLS) enabled in Supabase
- HTTPS required in production

## Support

For issues or questions, please create an issue in the GitHub repository.

## License

MIT
