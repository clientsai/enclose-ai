# Supabase Email Template Customization

## How to Update Email Templates in Supabase Dashboard

1. **Go to your Supabase Dashboard**
   - Visit: https://supabase.com/dashboard/project/autmdlacdenfbggqsgmz/auth/templates

2. **Update the Confirmation Email Template**

### Email Confirmation Template (Copy & Paste This)

**Subject:**
```
Welcome to Enclose.AI - Confirm Your Email
```

**Body:**
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirm your email</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); margin: 0; padding: 40px 0;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%">
    <tr>
      <td align="center">
        <table cellpadding="0" cellspacing="0" border="0" width="600" style="background: white; border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.1); overflow: hidden;">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%); padding: 40px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 32px; font-weight: 600;">Enclose.AI</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 14px;">Payment Integration Platform</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="color: #1a1a1a; margin: 0 0 20px 0; font-size: 24px; font-weight: 600;">Welcome aboard! 🚀</h2>

              <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                Thanks for signing up for Enclose.AI. We're excited to have you join our community of businesses streamlining their payment integrations.
              </p>

              <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                Please confirm your email address to get started:
              </p>

              <table cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td align="center" style="padding: 20px 0;">
                    <a href="{{ .ConfirmationURL }}" style="display: inline-block; background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%); color: white; text-decoration: none; padding: 16px 48px; border-radius: 12px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 14px rgba(99, 102, 241, 0.3);">
                      Confirm Email Address
                    </a>
                  </td>
                </tr>
              </table>

              <p style="color: #718096; font-size: 14px; line-height: 1.6; margin: 30px 0 0 0;">
                Or copy and paste this link into your browser:
              </p>
              <p style="color: #6366f1; font-size: 14px; word-break: break-all; margin: 10px 0;">
                {{ .ConfirmationURL }}
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background: #f7fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="color: #718096; font-size: 13px; margin: 0 0 10px 0;">
                This email was sent to {{ .Email }}
              </p>
              <p style="color: #a0aec0; font-size: 12px; margin: 0;">
                © 2024 Enclose.AI. All rights reserved.
              </p>
              <p style="margin: 15px 0 0 0;">
                <a href="https://enclose.ai" style="color: #6366f1; text-decoration: none; font-size: 12px;">Visit our website</a>
                <span style="color: #cbd5e0; margin: 0 10px;">|</span>
                <a href="https://enclose.ai/support" style="color: #6366f1; text-decoration: none; font-size: 12px;">Get support</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
```

## 3. Update Auth Settings

In the Supabase Dashboard:

1. Go to **Authentication** → **URL Configuration**
2. Update **Site URL** to: `https://enclose-ai.vercel.app`
3. Update **Redirect URLs** to include:
   - `https://enclose-ai.vercel.app/*`
   - `https://enclose-ai.vercel.app/login`
   - `https://enclose-ai.vercel.app/dashboard`

## 4. Update Email Settings

1. Go to **Authentication** → **Email Templates**
2. For each template (Confirmation, Password Reset, etc.):
   - Replace the default template with the branded version above
   - Make sure to keep the template variables like `{{ .ConfirmationURL }}`, `{{ .Email }}`, etc.

## 5. Email Sender Configuration (Optional)

To completely remove "Supabase" from emails:

1. Go to **Settings** → **Auth**
2. Under **Email Settings**, you can configure:
   - **Sender email**: noreply@enclose.ai (requires domain verification)
   - **Sender name**: Enclose.AI

Note: Custom email domain requires a Pro plan or setting up your own SMTP.