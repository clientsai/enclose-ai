# Deployment Checklist for Enclose.AI

## Pre-Deployment Checklist

### ✅ Environment Setup
- [ ] All environment variables configured in `.env.local`
- [ ] Encryption key generated and saved securely
- [ ] Database schema deployed to Supabase
- [ ] Stripe account created and configured

### ✅ Code Quality
- [ ] Run `npm run build` - builds successfully
- [ ] Run `npm run lint` - no errors
- [ ] Run `npm run type-check` - no TypeScript errors
- [ ] All console.log statements removed from production code

### ✅ Security Verification
- [ ] API keys are NOT committed to repository
- [ ] Environment variables are NOT exposed in client code
- [ ] HTTPS enforced on production domain
- [ ] Row Level Security enabled in Supabase

## Production Deployment Steps

### Step 1: Domain Setup
1. Purchase domain from provider (Namecheap, GoDaddy, Google Domains, etc.)
2. Keep domain registrar DNS for now (will update after deployment)

### Step 2: Deploy to Vercel
1. Push code to GitHub repository
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Configure project:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: `.next`

### Step 3: Add Environment Variables in Vercel
Go to Project Settings > Environment Variables and add:

```
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NEXT_PUBLIC_SUPABASE_URL=[from Supabase]
NEXT_PUBLIC_SUPABASE_ANON_KEY=[from Supabase]
SUPABASE_SERVICE_ROLE_KEY=[from Supabase]
STRIPE_SECRET_KEY=[from Stripe - use live keys]
STRIPE_PUBLISHABLE_KEY=[from Stripe - use live keys]
STRIPE_WEBHOOK_SECRET=[will get after webhook setup]
STRIPE_CLIENT_ID=[from Stripe Connect]
ENCRYPTION_KEY=[your generated key]
```

### Step 4: Deploy
1. Click "Deploy"
2. Wait for build to complete (usually 2-3 minutes)
3. Note your Vercel deployment URL (e.g., enclose-ai.vercel.app)

### Step 5: Configure Custom Domain in Vercel
1. Go to Project Settings > Domains
2. Add your custom domain (e.g., enclose.ai)
3. Choose configuration:
   - Add both: `enclose.ai` and `www.enclose.ai`
   - Set one as primary (recommend apex domain)

### Step 6: Update DNS Records
Go to your domain registrar's DNS settings and add:

**For apex domain (enclose.ai):**
- Type: A
- Name: @ (or blank)
- Value: 76.76.21.21

**For www subdomain:**
- Type: CNAME
- Name: www
- Value: cname.vercel-dns.com

Wait 5-30 minutes for DNS propagation.

### Step 7: Configure Stripe Production
1. Switch to Live mode in Stripe Dashboard
2. Add webhook endpoint:
   - URL: `https://yourdomain.com/api/stripe/webhooks`
   - Events: Select all payment events
   - Copy the signing secret
3. Update Stripe Connect OAuth:
   - Redirect URL: `https://yourdomain.com/api/stripe/callback`
4. Update Vercel environment variable:
   - `STRIPE_WEBHOOK_SECRET` with the new signing secret

### Step 8: Final Verification
- [ ] Visit https://yourdomain.com - site loads with SSL
- [ ] Test user registration flow
- [ ] Test Stripe OAuth connection
- [ ] Create a test payment link
- [ ] Process a test payment (use real card in production)
- [ ] Verify webhook receives payment confirmation

## Post-Deployment

### Monitoring Setup
1. Enable Vercel Analytics (optional)
2. Set up error tracking (Sentry recommended)
3. Configure uptime monitoring (UptimeRobot, Pingdom)
4. Set up Stripe radar for fraud protection

### Backup Strategy
1. Enable Supabase point-in-time recovery
2. Export database backups weekly
3. Keep environment variables backed up securely

### Scaling Considerations
- Monitor Vercel function usage
- Watch Supabase database size
- Track Stripe API rate limits
- Consider CDN for static assets if needed

## Troubleshooting Common Issues

### Domain Not Working
- Verify DNS records are correct
- Wait up to 48 hours for full propagation
- Clear browser cache and try incognito mode

### Environment Variables Not Loading
- Ensure variables are added to Vercel dashboard
- Redeploy after adding new variables
- Check for typos in variable names

### Stripe Webhooks Failing
- Verify webhook secret is correct
- Check endpoint URL includes /api/stripe/webhooks
- Ensure HTTPS is working on domain

### Database Connection Issues
- Verify Supabase project is not paused
- Check service role key is correct
- Ensure RLS policies are configured

## Support Channels

- Vercel Support: [vercel.com/support](https://vercel.com/support)
- Supabase Support: [supabase.com/support](https://supabase.com/support)
- Stripe Support: [stripe.com/support](https://stripe.com/support)

---

Remember to test everything in staging before going live with real payments!