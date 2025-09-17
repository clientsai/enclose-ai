# Enclose.AI - Payment Integration for Conversion Agents

A secure, scalable payment processing platform that seamlessly integrates Stripe payments with Clients.AI conversion agents.

## Features

- 🚀 **Instant Stripe Integration** - Connect via OAuth in seconds
- 🔒 **Enterprise Security** - PCI DSS Level 1 compliant infrastructure
- 🌍 **Global Payments** - Support for 135+ currencies
- 📊 **Real-time Analytics** - Track conversions and revenue instantly
- 🔌 **API-First Design** - RESTful API for seamless integration
- 💳 **Payment Links** - Generate secure payment links on demand

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Supabase
- **Payments**: Stripe Connect, Stripe Checkout
- **Database**: PostgreSQL (Supabase)
- **Authentication**: Supabase Auth

## Prerequisites

Before you begin, ensure you have:

- Node.js 18+ installed
- npm or yarn package manager
- Supabase account (free tier works)
- Stripe account (test mode for development)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/enclose-ai.git
cd enclose-ai
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run the schema from `supabase/schema.sql`
3. Enable Email/Password authentication in Authentication settings
4. Copy your project URL and anon key from Settings > API

### 4. Configure Stripe

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your API keys from the Stripe Dashboard
3. For Stripe Connect OAuth:
   - Go to Settings > Connect settings
   - Configure OAuth settings
   - Get your Connect client ID

### 5. Set Up Environment Variables

1. Copy the example environment file:
```bash
cp .env.example .env.local
```

2. Update `.env.local` with your actual values:

```env
# YOUR DOMAIN - Update this with your actual domain when deploying
NEXT_PUBLIC_APP_URL=http://localhost:3000  # Change to https://yourdomain.com in production

# Supabase Configuration (from Supabase dashboard)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Stripe Configuration (from Stripe dashboard)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Stripe OAuth (from Connect settings)
STRIPE_CLIENT_ID=ca_your_stripe_connect_client_id

# Encryption Key (generate this!)
ENCRYPTION_KEY=your_32_byte_base64_key_here
```

3. Generate an encryption key:
```bash
openssl rand -base64 32
```

### 6. Configure Your Domain

When deploying to production, update the `NEXT_PUBLIC_APP_URL` in your environment variables:

```env
# For production
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

Also update:
- Stripe webhook endpoints to `https://yourdomain.com/api/stripe/webhooks`
- Stripe OAuth redirect URL to `https://yourdomain.com/api/stripe/callback`

### 7. Run Development Server

```bash
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your application.

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add all environment variables in Vercel's dashboard
4. Deploy!

### Deploy to Other Platforms

The app is a standard Next.js application and can be deployed to:
- AWS Amplify
- Netlify
- Railway
- Render
- DigitalOcean App Platform

## Setting Up Your Custom Domain

### 1. Domain Configuration

After purchasing your domain, point it to your hosting platform:

**For Vercel:**
1. Go to your Vercel project settings
2. Navigate to Domains
3. Add your custom domain
4. Follow the DNS configuration instructions

**DNS Records to Add:**
- A Record: Points to Vercel's IP (76.76.21.21)
- CNAME: www subdomain points to cname.vercel-dns.com

### 2. Update Environment Variables

Update your production environment variables:
```env
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

### 3. Update Stripe Settings

1. Add production webhook endpoint: `https://yourdomain.com/api/stripe/webhooks`
2. Update OAuth redirect URL: `https://yourdomain.com/api/stripe/callback`
3. Switch to live API keys when ready

### 4. SSL Certificate

Most platforms (Vercel, Netlify, etc.) provide automatic SSL certificates. Ensure HTTPS is enforced.

## API Documentation

### Authentication

Include your API key in the Authorization header:
```
Authorization: Bearer encl_your_api_key_here
```

### Endpoints

**Create Checkout Session**
```
POST /api/v1/checkout
```

**List Payments**
```
GET /api/v1/payments
```

## Testing

### Test Cards

Use Stripe's test cards for development:
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- Requires authentication: `4000 0025 0000 3155`

### Run Tests

```bash
npm run test
npm run lint
npm run type-check
```

## Security

- All API keys are encrypted using AES-256
- Webhook signatures are verified
- PCI compliance through Stripe
- Row-level security in Supabase
- HTTPS enforced in production

## Support

- Documentation: [docs.enclose.ai](https://docs.enclose.ai)
- Email: support@enclose.ai
- GitHub Issues: [github.com/yourusername/enclose-ai/issues](https://github.com/yourusername/enclose-ai/issues)

## License

MIT License - see LICENSE file for details

---

Built with ❤️ by the Enclose.AI team