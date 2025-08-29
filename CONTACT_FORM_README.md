# Contact Form Backend Setup

This project includes a fully functional contact form backend using Next.js API routes and Resend for email delivery.

## Features

- ✅ Form validation using Zod
- ✅ Rate limiting (5 requests per 15 minutes per IP)
- ✅ Email delivery via Resend API
- ✅ Development mode (logs to console)
- ✅ Error handling and user feedback
- ✅ Responsive design
- ✅ Spam protection

## Quick Start

### 1. Development Mode
The contact form works out of the box in development mode. When no email API is configured, form submissions are logged to the console.

```bash
npm run dev
# or
yarn dev
# or
bun dev
```

### 2. Production Setup (Optional)

For production email delivery, set up Resend (free tier includes 100 emails/day):

1. **Sign up at [Resend](https://resend.com)**
2. **Create an API key**
3. **Add environment variables:**

```bash
# .env.local or your hosting platform
RESEND_API_KEY=your_api_key_here
FROM_EMAIL=noreply@yourdomain.com
TO_EMAIL=your-email@example.com
```

4. **Verify your domain** (for production)

## API Endpoint

### POST `/api/contact`

Accepts JSON with the following schema:

```typescript
{
  name: string;      // 2-50 characters
  email: string;     // valid email
  subject: string;   // 5-100 characters
  message: string;   // 10-1000 characters
}
```

**Response:**
- `200`: Success
- `400`: Invalid form data
- `429`: Rate limit exceeded
- `500`: Server error

## Rate Limiting

- **Limit:** 5 requests per 15 minutes per IP address
- **Storage:** In-memory (for production, consider Redis)
- **Purpose:** Prevent spam and abuse

## Email Template

The backend sends HTML emails with:
- Clean, professional design
- All form data clearly displayed
- Sender's email for easy replies
- Timestamp for tracking

## Development Features

- **Console Logging:** When `RESEND_API_KEY` is not set, form submissions are logged to console
- **Error Handling:** Detailed error messages for debugging
- **Type Safety:** Full TypeScript support with Zod validation

## Customization

### Email Template
Edit the HTML template in `/app/api/contact/route.ts`:

```typescript
html: `
  <div style="font-family: Arial, sans-serif;">
    <!-- Your custom template -->
  </div>
`
```

### Rate Limiting
Adjust limits in `/app/api/contact/route.ts`:

```typescript
const windowMs = 15 * 60 * 1000; // 15 minutes
const maxRequests = 5; // max requests
```

### Validation
Modify the schema in both frontend and backend:

```typescript
const contactSchema = z.object({
  // Add your custom fields
});
```

## Troubleshooting

### Form not submitting
1. Check browser console for errors
2. Verify API endpoint is accessible
3. Check network tab for failed requests

### Emails not sending
1. Verify `RESEND_API_KEY` is set correctly
2. Check Resend dashboard for delivery status
3. Ensure sending domain is verified
4. Check server logs for errors

### Rate limiting issues
1. Check if IP detection is working
2. Clear rate limit store (restart server)
3. Adjust rate limit settings if needed

## Dependencies

The contact form backend uses:

- **Next.js API Routes** (built-in, no additional cost)
- **Resend SDK** for email delivery
- **Zod** for form validation (already installed)
- **@react-email/render** (required by Resend SDK)

All dependencies are already included in the project.

## Costs

- **Development:** Completely free
- **Production (Resend):** 
  - Free tier: 100 emails/day
  - Paid plans start at $20/month for 50,000 emails

## Security Features

- Input validation and sanitization
- Rate limiting
- CORS protection (Next.js default)
- No sensitive data exposure
- XSS protection in email templates

This backend solution is production-ready and scales well with your Next.js application!
