# Supabase Setup Instructions

## Quick Setup

1. **Update .env.local with your Supabase credentials**

2. **Go to your Supabase Dashboard**:
   - https://supabase.com/dashboard
   - Select your project
   - Go to **SQL Editor**

3. **Copy and paste the entire contents of**:
   - File: `enclose-ai-schema.sql`
   - Located: `/Users/ktown/Desktop/enclose-ai-schema.sql`

4. **Click "Run" to execute the schema**

## What This Creates:

- ✅ All required tables (users, payments, etc.)
- ✅ Row Level Security policies
- ✅ Indexes for performance
- ✅ Webhook tracking
- ✅ API key management

## Test Your Setup:

After running the schema and updating .env.local:

1. Restart the server (it's running on port 3003)
2. Go to: http://localhost:3003/register
3. Create an account
4. You should be able to access the dashboard

## Troubleshooting:

If you get errors:
- Make sure all 3 Supabase keys are correct
- Check that the schema ran without errors
- Verify your Supabase project is active