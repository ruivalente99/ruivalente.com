# Contact Form Domain Setup Guide

## Issue: Domain Not Verified

If you see this error:
```
The ruivalente.com domain is not verified. Please, add and verify your domain on https://resend.com/domains
```

This means you're trying to send emails from a domain that hasn't been verified with Resend.

## Solutions

### Option 1: Use Resend Sandbox Domain (Recommended for Testing)

Update your `.env.local` file:
```bash
FROM_EMAIL=onboarding@resend.dev
TO_EMAIL=your-email@gmail.com
```

✅ **Pros:** Works immediately, no setup required
❌ **Cons:** Emails come from `onboarding@resend.dev`, not your domain

### Option 2: Verify Your Domain with Resend

1. **Go to [Resend Domains](https://resend.com/domains)**
2. **Click "Add Domain"**
3. **Enter your domain:** `ruivalente.com`
4. **Add the required DNS records** to your domain provider:
   - TXT record for domain verification
   - MX records for email delivery (optional)
   - DKIM records for email authentication

5. **Wait for verification** (can take up to 72 hours)
6. **Update your `.env.local`:**
   ```bash
   FROM_EMAIL=noreply@ruivalente.com
   TO_EMAIL=rui@ruivalente.com
   ```

✅ **Pros:** Professional emails from your domain
❌ **Cons:** Requires DNS configuration

### Option 3: Use a Subdomain

If you don't want to verify the main domain, you can use a subdomain:

1. **Add subdomain to Resend:** `mail.ruivalente.com`
2. **Verify only the subdomain**
3. **Use in config:**
   ```bash
   FROM_EMAIL=contact@mail.ruivalente.com
   ```

## Current Configuration

The project is currently configured to use the Resend sandbox domain for immediate testing:

```bash
FROM_EMAIL=onboarding@resend.dev
TO_EMAIL=rui.valente99@gmail.com
```

This allows you to test the contact form functionality right away while you set up domain verification for production use.

## Testing

You can now test the contact form and it should successfully send emails to `rui.valente99@gmail.com` from `onboarding@resend.dev`.

## Production Setup

For production, you'll want to:
1. Verify your domain with Resend
2. Update environment variables in your hosting platform
3. Use your verified domain for the FROM_EMAIL address
