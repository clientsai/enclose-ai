-- Enclose.AI Enhanced Database Schema
-- Additional tables and functions for complete payment integration

-- Analytics events table
CREATE TABLE IF NOT EXISTS public.analytics_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.enclose_users(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  payment_link_id UUID REFERENCES public.payment_links(id) ON DELETE CASCADE,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add conversion_count to payment_links
ALTER TABLE public.payment_links
ADD COLUMN IF NOT EXISTS conversion_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS metadata JSONB,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Add missing columns to payments
ALTER TABLE public.payments
ADD COLUMN IF NOT EXISTS completed_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Add missing columns to stripe_accounts
ALTER TABLE public.stripe_accounts
ADD COLUMN IF NOT EXISTS access_token TEXT,
ADD COLUMN IF NOT EXISTS refresh_token TEXT,
ADD COLUMN IF NOT EXISTS account_details JSONB,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Add missing columns to webhook_events
ALTER TABLE public.webhook_events
ADD COLUMN IF NOT EXISTS payload JSONB,
ADD COLUMN IF NOT EXISTS processed_at TIMESTAMP WITH TIME ZONE;

-- Function to increment conversion count
CREATE OR REPLACE FUNCTION increment_link_conversion_count(link_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE public.payment_links
  SET conversion_count = conversion_count + 1,
      updated_at = NOW()
  WHERE id = link_id;
END;
$$ LANGUAGE plpgsql;

-- Function to get user statistics
CREATE OR REPLACE FUNCTION get_user_stats(user_uuid UUID)
RETURNS TABLE(
  total_links BIGINT,
  total_payments BIGINT,
  total_revenue DECIMAL,
  conversion_rate DECIMAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    COUNT(DISTINCT pl.id) as total_links,
    COUNT(DISTINCT p.id) as total_payments,
    COALESCE(SUM(p.amount), 0) as total_revenue,
    CASE
      WHEN SUM(pl.conversion_count) > 0 THEN
        (COUNT(DISTINCT p.id)::DECIMAL / SUM(pl.conversion_count)::DECIMAL) * 100
      ELSE 0
    END as conversion_rate
  FROM public.payment_links pl
  LEFT JOIN public.payments p ON p.payment_link_id = pl.id AND p.status = 'succeeded'
  WHERE pl.user_id = user_uuid;
END;
$$ LANGUAGE plpgsql;

-- Create indexes for analytics
CREATE INDEX IF NOT EXISTS idx_analytics_events_user_id ON public.analytics_events(user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_event_type ON public.analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON public.analytics_events(created_at);

-- RLS for analytics_events
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own analytics events" ON public.analytics_events
  FOR SELECT USING (auth.uid() = user_id);

-- Add updated_at triggers
CREATE TRIGGER update_stripe_accounts_updated_at
  BEFORE UPDATE ON public.stripe_accounts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_payment_links_updated_at
  BEFORE UPDATE ON public.payment_links
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_payments_updated_at
  BEFORE UPDATE ON public.payments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Create view for payment link statistics
CREATE OR REPLACE VIEW payment_link_stats AS
SELECT
  pl.id,
  pl.user_id,
  pl.product_name,
  pl.amount,
  pl.currency,
  pl.created_at,
  pl.conversion_count,
  COUNT(p.id) as successful_payments,
  COALESCE(SUM(p.amount), 0) as total_revenue,
  COALESCE(AVG(p.amount), 0) as avg_payment_amount
FROM public.payment_links pl
LEFT JOIN public.payments p ON p.payment_link_id = pl.id AND p.status = 'succeeded'
GROUP BY pl.id;

-- Grant permissions for the view
GRANT SELECT ON payment_link_stats TO authenticated;