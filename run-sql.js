const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Essential tables creation - simplified version
const sqlStatements = [
  // Create enclose_users table
  `CREATE TABLE IF NOT EXISTS enclose_users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    password_hash TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  )`,

  // Create stripe_accounts table
  `CREATE TABLE IF NOT EXISTS stripe_accounts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES enclose_users(id) ON DELETE CASCADE,
    stripe_account_id TEXT UNIQUE NOT NULL,
    access_token TEXT,
    refresh_token TEXT,
    livemode BOOLEAN DEFAULT false,
    connected_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    account_details JSONB
  )`,

  // Create payment_links table
  `CREATE TABLE IF NOT EXISTS payment_links (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES enclose_users(id) ON DELETE CASCADE,
    stripe_payment_link_id TEXT UNIQUE NOT NULL,
    url TEXT NOT NULL,
    product_name TEXT NOT NULL,
    product_description TEXT,
    amount DECIMAL(10, 2) NOT NULL,
    currency TEXT DEFAULT 'usd',
    active BOOLEAN DEFAULT true,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE,
    click_count INTEGER DEFAULT 0,
    conversion_count INTEGER DEFAULT 0
  )`,

  // Create payments table
  `CREATE TABLE IF NOT EXISTS payments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    payment_link_id UUID REFERENCES payment_links(id),
    stripe_payment_intent_id TEXT UNIQUE,
    stripe_checkout_session_id TEXT UNIQUE,
    amount DECIMAL(10, 2) NOT NULL,
    currency TEXT,
    status TEXT,
    customer_email TEXT,
    customer_name TEXT,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE
  )`,

  // Create api_keys table
  `CREATE TABLE IF NOT EXISTS api_keys (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES enclose_users(id) ON DELETE CASCADE,
    key_hash TEXT UNIQUE NOT NULL,
    key_prefix TEXT NOT NULL,
    name TEXT,
    permissions JSONB DEFAULT '{"read": true, "write": true}'::jsonb,
    last_used TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    revoked_at TIMESTAMP WITH TIME ZONE,
    active BOOLEAN DEFAULT true
  )`,

  // Create webhook_events table
  `CREATE TABLE IF NOT EXISTS webhook_events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    stripe_event_id TEXT UNIQUE,
    event_type TEXT NOT NULL,
    payload JSONB,
    processed BOOLEAN DEFAULT false,
    error_message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    processed_at TIMESTAMP WITH TIME ZONE
  )`,

  // Create analytics_events table
  `CREATE TABLE IF NOT EXISTS analytics_events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES enclose_users(id) ON DELETE CASCADE,
    event_type TEXT NOT NULL,
    payment_link_id UUID REFERENCES payment_links(id),
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  )`,

  // Create products table
  `CREATE TABLE IF NOT EXISTS products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES enclose_users(id) ON DELETE CASCADE,
    stripe_product_id TEXT,
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10, 2),
    currency TEXT DEFAULT 'usd',
    active BOOLEAN DEFAULT true,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  )`
];

async function runSQL() {
  console.log('🚀 Setting up Enclose.AI database tables...\n');

  let created = 0;
  let failed = 0;

  for (const sql of sqlStatements) {
    const tableName = sql.match(/CREATE TABLE IF NOT EXISTS (\w+)/)?.[1] || 'unknown';

    try {
      // Execute SQL directly using Supabase
      const { data, error } = await supabase.rpc('exec', { sql });

      if (error) {
        // Try alternative approach
        const response = await fetch(`${supabaseUrl}/rest/v1/rpc/query`, {
          method: 'POST',
          headers: {
            'apikey': supabaseServiceKey,
            'Authorization': `Bearer ${supabaseServiceKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query: sql })
        });

        if (!response.ok) {
          console.log(`⚠️  Table '${tableName}' might already exist or failed to create`);
          failed++;
        } else {
          console.log(`✅ Created table: ${tableName}`);
          created++;
        }
      } else {
        console.log(`✅ Created table: ${tableName}`);
        created++;
      }
    } catch (err) {
      console.log(`⚠️  Table '${tableName}' - ${err.message.substring(0, 50)}`);
      failed++;
    }
  }

  console.log(`\n📊 Summary: ${created} tables processed, ${failed} warnings`);

  // Verify tables exist
  console.log('\n🔍 Verifying tables...');

  const tables = ['enclose_users', 'stripe_accounts', 'payment_links', 'payments', 'api_keys'];
  let verified = 0;

  for (const table of tables) {
    const { error } = await supabase.from(table).select('count').limit(1);
    if (!error) {
      console.log(`✅ Table '${table}' is ready`);
      verified++;
    } else {
      console.log(`❌ Table '${table}' not accessible`);
    }
  }

  if (verified === tables.length) {
    console.log('\n🎉 Database is ready! You can now:');
    console.log('1. Register at: http://localhost:3001/register');
    console.log('2. Connect your Stripe account');
    console.log('3. Create payment links');
  } else {
    console.log('\n⚠️  Some tables are not accessible.');
    console.log('Please run the full schema in Supabase SQL Editor:');
    console.log('File: /Users/ktown/Desktop/enclose-ai-schema.sql');
  }
}

runSQL().catch(console.error);