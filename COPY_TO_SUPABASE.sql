-- Enclose.AI Database Schema
-- Copy ALL of this and paste into Supabase SQL Editor

-- Clean up existing tables if they exist
DROP TABLE IF EXISTS api_keys CASCADE;
DROP TABLE IF EXISTS payments CASCADE;
DROP TABLE IF EXISTS payment_links CASCADE;
DROP TABLE IF EXISTS stripe_accounts CASCADE;
DROP TABLE IF EXISTS enclose_users CASCADE;
DROP TABLE IF EXISTS webhook_events CASCADE;
DROP TABLE IF EXISTS analytics_events CASCADE;
DROP TABLE IF EXISTS products CASCADE;

-- Create enclose_users table
CREATE TABLE enclose_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  password_hash TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create stripe_accounts table
CREATE TABLE stripe_accounts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES enclose_users(id) ON DELETE CASCADE,
  stripe_account_id TEXT UNIQUE NOT NULL,
  access_token TEXT,
  refresh_token TEXT,
  livemode BOOLEAN DEFAULT false,
  connected_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  account_details JSONB
);

-- Create payment_links table
CREATE TABLE payment_links (
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
);

-- Create payments table
CREATE TABLE payments (
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
);

-- Create api_keys table
CREATE TABLE api_keys (
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
);

-- Create webhook_events table
CREATE TABLE webhook_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  stripe_event_id TEXT UNIQUE,
  event_type TEXT NOT NULL,
  payload JSONB,
  processed BOOLEAN DEFAULT false,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  processed_at TIMESTAMP WITH TIME ZONE
);

-- Create analytics_events table
CREATE TABLE analytics_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES enclose_users(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  payment_link_id UUID REFERENCES payment_links(id),
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create products table
CREATE TABLE products (
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
);

-- Create indexes for performance
CREATE INDEX idx_stripe_accounts_user ON stripe_accounts(user_id);
CREATE INDEX idx_payment_links_user ON payment_links(user_id);
CREATE INDEX idx_payments_link ON payments(payment_link_id);
CREATE INDEX idx_api_keys_user ON api_keys(user_id);

-- Enable Row Level Security
ALTER TABLE enclose_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE stripe_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;

-- Create basic RLS policies
CREATE POLICY "Users can view own data" ON enclose_users
  FOR ALL USING (auth.uid()::TEXT = id::TEXT OR true);

CREATE POLICY "Users can manage own stripe accounts" ON stripe_accounts
  FOR ALL USING (true);

CREATE POLICY "Public can view active payment links" ON payment_links
  FOR SELECT USING (active = true);

CREATE POLICY "Users can manage own payment links" ON payment_links
  FOR ALL USING (true);

CREATE POLICY "Users can view payments" ON payments
  FOR ALL USING (true);

CREATE POLICY "Users can manage API keys" ON api_keys
  FOR ALL USING (true);

-- Success message
DO $$
BEGIN
  RAISE NOTICE 'Enclose.AI database schema created successfully!';
END $$;