-- Clients.AI Integration Schema Extension
-- Run this after the main schema.sql

-- Table for storing user's Clients.AI integration settings
CREATE TABLE IF NOT EXISTS public.clients_ai_integrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.enclose_users(id) ON DELETE CASCADE,

  -- User's own Stripe configuration (encrypted)
  stripe_publishable_key TEXT,
  stripe_secret_key_encrypted TEXT, -- Encrypted with platform encryption key
  stripe_webhook_secret_encrypted TEXT,

  -- Subscription plan IDs
  basic_monthly_price_id TEXT,
  pro_monthly_price_id TEXT,
  monthly_price_id TEXT,
  yearly_price_id TEXT,

  -- Integration settings
  clients_ai_api_key_encrypted TEXT, -- Their Clients.AI API key
  webhook_endpoint TEXT,
  is_active BOOLEAN DEFAULT true,
  test_mode BOOLEAN DEFAULT true,

  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  UNIQUE(user_id)
);

-- Table for tracking Clients.AI subscriptions
CREATE TABLE IF NOT EXISTS public.clients_ai_subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  integration_id UUID REFERENCES public.clients_ai_integrations(id) ON DELETE CASCADE,

  -- Subscription details
  stripe_customer_id TEXT NOT NULL,
  stripe_subscription_id TEXT,
  stripe_price_id TEXT,

  -- Customer info
  customer_email TEXT NOT NULL,
  customer_name TEXT,

  -- Subscription status
  status TEXT NOT NULL, -- active, canceled, past_due, etc.
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,

  -- Billing details
  amount DECIMAL(10, 2),
  currency TEXT DEFAULT 'usd',
  interval TEXT, -- month, year

  -- Metadata from Clients.AI
  clients_ai_user_id TEXT,
  clients_ai_agent_id TEXT,
  metadata JSONB,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  UNIQUE(stripe_subscription_id)
);

-- Table for payment history
CREATE TABLE IF NOT EXISTS public.clients_ai_payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subscription_id UUID REFERENCES public.clients_ai_subscriptions(id) ON DELETE SET NULL,
  integration_id UUID REFERENCES public.clients_ai_integrations(id) ON DELETE CASCADE,

  -- Payment details
  stripe_payment_intent_id TEXT UNIQUE,
  stripe_invoice_id TEXT,

  amount DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'usd',
  status TEXT NOT NULL,

  -- Customer info
  customer_email TEXT,
  description TEXT,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Secure storage for encrypted credentials
CREATE TABLE IF NOT EXISTS public.encrypted_credentials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.enclose_users(id) ON DELETE CASCADE,

  credential_type TEXT NOT NULL, -- 'stripe_secret', 'webhook_secret', 'api_key'
  encrypted_value TEXT NOT NULL,
  iv TEXT NOT NULL, -- Initialization vector for decryption

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE,

  UNIQUE(user_id, credential_type)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_clients_ai_integrations_user_id ON public.clients_ai_integrations(user_id);
CREATE INDEX IF NOT EXISTS idx_clients_ai_subscriptions_integration_id ON public.clients_ai_subscriptions(integration_id);
CREATE INDEX IF NOT EXISTS idx_clients_ai_subscriptions_stripe_customer_id ON public.clients_ai_subscriptions(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_clients_ai_payments_integration_id ON public.clients_ai_payments(integration_id);
CREATE INDEX IF NOT EXISTS idx_encrypted_credentials_user_id ON public.encrypted_credentials(user_id);

-- Row Level Security
ALTER TABLE public.clients_ai_integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients_ai_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients_ai_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.encrypted_credentials ENABLE ROW LEVEL SECURITY;

-- Users can only access their own integrations
CREATE POLICY "Users can manage own integrations" ON public.clients_ai_integrations
  FOR ALL USING (auth.uid() = user_id);

-- Users can view subscriptions from their integrations
CREATE POLICY "Users can view own subscriptions" ON public.clients_ai_subscriptions
  FOR SELECT USING (
    integration_id IN (
      SELECT id FROM public.clients_ai_integrations WHERE user_id = auth.uid()
    )
  );

-- Users can view payments from their integrations
CREATE POLICY "Users can view own payments" ON public.clients_ai_payments
  FOR SELECT USING (
    integration_id IN (
      SELECT id FROM public.clients_ai_integrations WHERE user_id = auth.uid()
    )
  );

-- Users can only manage their own encrypted credentials
CREATE POLICY "Users can manage own credentials" ON public.encrypted_credentials
  FOR ALL USING (auth.uid() = user_id);

-- Function to safely update credentials
CREATE OR REPLACE FUNCTION update_encrypted_credential(
  p_user_id UUID,
  p_credential_type TEXT,
  p_encrypted_value TEXT,
  p_iv TEXT
) RETURNS VOID AS $$
BEGIN
  INSERT INTO public.encrypted_credentials (user_id, credential_type, encrypted_value, iv)
  VALUES (p_user_id, p_credential_type, p_encrypted_value, p_iv)
  ON CONFLICT (user_id, credential_type)
  DO UPDATE SET
    encrypted_value = EXCLUDED.encrypted_value,
    iv = EXCLUDED.iv,
    created_at = NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;