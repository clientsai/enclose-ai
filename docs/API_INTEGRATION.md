# Enclose.AI API Integration Documentation

## Overview

Enclose.AI provides a complete payment processing platform that integrates seamlessly with Clients.AI conversion agents. This documentation covers the API endpoints, authentication, and webhooks for integration.

## Authentication

All API requests require authentication using an API key in the Authorization header:

```
Authorization: Bearer your_api_key_here
```

## API Endpoints

### 1. Create Checkout Session

**Endpoint:** `POST /api/v1/checkout`

Creates a payment checkout session for a Clients.AI agent.

**Request Body:**
```json
{
  "agent_id": "your_agent_id",
  "customer_email": "customer@example.com",
  "product_name": "Premium AI Service",
  "amount": 99.99,
  "currency": "usd",
  "metadata": {
    "custom_field": "value"
  }
}
```

**Response:**
```json
{
  "success": true,
  "checkout_url": "https://checkout.stripe.com/pay/cs_xxx",
  "payment_link_id": "uuid",
  "stripe_payment_link_id": "plink_xxx"
}
```

### 2. List Payments

**Endpoint:** `GET /api/v1/payments`

Retrieves a list of payments for your account.

**Query Parameters:**
- `limit` (optional): Number of results per page (default: 50)
- `offset` (optional): Number of results to skip
- `status` (optional): Filter by payment status (succeeded, failed, pending)

**Response:**
```json
{
  "payments": [
    {
      "id": "uuid",
      "amount": 99.99,
      "currency": "usd",
      "status": "succeeded",
      "customer_email": "customer@example.com",
      "created_at": "2024-01-01T00:00:00Z",
      "metadata": {
        "agent_id": "your_agent_id"
      }
    }
  ],
  "total": 100,
  "limit": 50,
  "offset": 0
}
```

## Webhooks

### Payment Completed Webhook

When a payment is completed, Enclose.AI will send a POST request to your configured webhook endpoint.

**Webhook Payload:**
```json
{
  "event": "payment.completed",
  "data": {
    "agent_id": "your_agent_id",
    "payment_status": "completed",
    "amount": 99.99,
    "currency": "usd",
    "customer_email": "customer@example.com",
    "payment_link_id": "uuid"
  },
  "timestamp": "2024-01-01T00:00:00Z"
}
```

**Headers:**
- `X-Webhook-Secret`: Your configured webhook secret for verification

### Webhook Verification

To verify webhook authenticity, compare the `X-Webhook-Secret` header with your configured secret.

## Integration Flow

1. **Generate API Key**: Create an API key in your Enclose.AI dashboard
2. **Connect Stripe Account**: Connect your Stripe account via OAuth in the dashboard
3. **Create Checkout**: When a user wants to pay through your Clients.AI agent:
   - Call `/api/v1/checkout` with the agent details
   - Redirect the user to the returned `checkout_url`
4. **Handle Completion**:
   - Receive webhook notification when payment completes
   - Update your agent's state accordingly

## Error Handling

All endpoints return standard HTTP status codes:

- `200`: Success
- `400`: Bad Request (missing or invalid parameters)
- `401`: Unauthorized (invalid API key)
- `404`: Not Found
- `500`: Internal Server Error

Error responses include a descriptive message:
```json
{
  "error": "Descriptive error message"
}
```

## Rate Limits

- API requests: 100 requests per minute
- Webhook deliveries: Automatic retry with exponential backoff

## Testing

Use Stripe test mode credentials for testing:
- Test card: `4242 4242 4242 4242`
- Any future expiry date
- Any 3-digit CVC

## Security Best Practices

1. **Store API keys securely**: Never expose API keys in client-side code
2. **Verify webhooks**: Always verify webhook signatures
3. **Use HTTPS**: All API calls must use HTTPS
4. **Implement idempotency**: Store and check webhook event IDs to prevent duplicate processing

## Support

For integration support, contact support@enclose.ai