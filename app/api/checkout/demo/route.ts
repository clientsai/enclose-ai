import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const plan = searchParams.get('plan')
  const billing = searchParams.get('billing')

  // Return a demo checkout page
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Enclose.AI Demo Checkout</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .container {
      background: white;
      border-radius: 20px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      max-width: 500px;
      width: 100%;
      padding: 40px;
    }
    .logo {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 30px;
    }
    .logo-icon {
      width: 50px;
      height: 50px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 12px;
    }
    .logo-text {
      font-size: 24px;
      font-weight: 700;
      color: #1a202c;
    }
    h1 {
      font-size: 28px;
      color: #1a202c;
      margin-bottom: 10px;
      text-align: center;
    }
    .demo-badge {
      background: #fbbf24;
      color: #78350f;
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      display: inline-block;
      margin-bottom: 20px;
      width: 100%;
      text-align: center;
    }
    .plan-info {
      background: #f7fafc;
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 30px;
    }
    .plan-name {
      font-size: 20px;
      font-weight: 600;
      color: #4a5568;
      margin-bottom: 8px;
    }
    .plan-price {
      font-size: 32px;
      font-weight: 700;
      color: #1a202c;
    }
    .plan-billing {
      font-size: 14px;
      color: #718096;
      margin-top: 4px;
    }
    .form-group {
      margin-bottom: 20px;
    }
    label {
      display: block;
      font-size: 14px;
      font-weight: 500;
      color: #4a5568;
      margin-bottom: 8px;
    }
    input {
      width: 100%;
      padding: 12px 16px;
      font-size: 16px;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      transition: all 0.2s;
    }
    input:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }
    .card-element {
      padding: 12px 16px;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      background: #f7fafc;
      min-height: 50px;
      display: flex;
      align-items: center;
      font-size: 16px;
      color: #718096;
    }
    .test-cards {
      background: #edf2f7;
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 20px;
    }
    .test-cards-title {
      font-size: 12px;
      font-weight: 600;
      color: #4a5568;
      text-transform: uppercase;
      margin-bottom: 12px;
    }
    .test-card {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      font-size: 14px;
    }
    .test-card-number {
      font-family: monospace;
      color: #2d3748;
      font-weight: 500;
    }
    .test-card-result {
      color: #718096;
    }
    .btn {
      width: 100%;
      padding: 14px 24px;
      font-size: 16px;
      font-weight: 600;
      color: white;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
    }
    .btn:active {
      transform: translateY(0);
    }
    .security {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 20px;
      font-size: 14px;
      color: #718096;
    }
    .security svg {
      width: 16px;
      height: 16px;
      margin-right: 6px;
    }
    .back-link {
      text-align: center;
      margin-top: 16px;
    }
    .back-link a {
      color: #667eea;
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;
    }
    .back-link a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">
      <div class="logo-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <line x1="2" y1="10" x2="22" y2="10" />
        </svg>
      </div>
      <div class="logo-text">Enclose.AI</div>
    </div>

    <h1>Demo Checkout</h1>
    <div class="demo-badge">Test Mode - No real charges</div>

    <div class="plan-info">
      <div class="plan-name">${plan ? plan.charAt(0).toUpperCase() + plan.slice(1) : 'Professional'} Plan</div>
      <div class="plan-price">$${plan === 'starter' ? '29' : '99'}</div>
      <div class="plan-billing">per ${billing || 'month'}</div>
    </div>

    <form id="payment-form" onsubmit="handleSubmit(event)">
      <div class="form-group">
        <label for="email">Email Address</label>
        <input type="email" id="email" name="email" placeholder="you@example.com" required>
      </div>

      <div class="form-group">
        <label for="name">Cardholder Name</label>
        <input type="text" id="name" name="name" placeholder="John Doe" required>
      </div>

      <div class="form-group">
        <label for="card">Card Information</label>
        <div class="card-element">4242 4242 4242 4242</div>
      </div>

      <div class="test-cards">
        <div class="test-cards-title">Test Card Numbers</div>
        <div class="test-card">
          <span class="test-card-number">4242 4242 4242 4242</span>
          <span class="test-card-result">Success</span>
        </div>
        <div class="test-card">
          <span class="test-card-number">4000 0000 0000 0002</span>
          <span class="test-card-result">Decline</span>
        </div>
        <div class="test-card">
          <span class="test-card-number">4000 0025 0000 3155</span>
          <span class="test-card-result">Auth Required</span>
        </div>
      </div>

      <button type="submit" class="btn">
        Start Free Trial
      </button>

      <div class="security">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        Secured by Stripe
      </div>

      <div class="back-link">
        <a href="/pricing">← Back to pricing</a>
      </div>
    </form>
  </div>

  <script>
    function handleSubmit(event) {
      event.preventDefault();

      // Simulate processing
      const btn = event.target.querySelector('.btn');
      const originalText = btn.textContent;
      btn.textContent = 'Processing...';
      btn.disabled = true;

      setTimeout(() => {
        // Simulate success
        alert('Demo checkout completed! In production, this would process a real payment.');
        window.location.href = '/dashboard?demo=true&plan=${plan}&billing=${billing}';
      }, 2000);
    }
  </script>
</body>
</html>
  `

  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html',
    },
  })
}