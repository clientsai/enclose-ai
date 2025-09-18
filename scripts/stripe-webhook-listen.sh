#!/bin/bash

# Stripe Webhook Listener Script
echo "🔗 Starting Stripe Webhook Listener for Enclose.AI..."
echo ""
echo "This will forward webhooks to: http://localhost:47832/api/stripe/webhooks"
echo ""
echo "Press Ctrl+C to stop the listener"
echo ""

# Start the webhook listener
$HOME/.local/bin/stripe listen --forward-to localhost:47832/api/stripe/webhooks

# Note: The webhook signing secret will be displayed in the output
# Copy it and add to your .env.local as STRIPE_WEBHOOK_SECRET