# CAPTCHA and Rate Limiting Implementation

## Overview
Added Google reCAPTCHA v3 and rate limiting to protect forms and API routes from spam and abuse.

## Features Implemented

### 1. CAPTCHA Protection (reCAPTCHA v3)
- **Invisible protection** - No user interaction required
- **Score-based verification** - Analyzes user behavior (0.0 = bot, 1.0 = human)
- **Threshold**: 0.5 (adjustable in `app/lib/captcha.ts`)

#### Forms Protected:
- ✅ Contact form (`app/contact/page.tsx`)
- ✅ Newsletter signup (`app/components/newsletter-signup.tsx`)
- ✅ Pre-order form (already implemented)
- ✅ Challenge submission (already implemented)

### 2. Rate Limiting
In-memory rate limiter with configurable limits per endpoint.

#### API Routes Protected:
- ✅ `/api/contact` - 3 requests per hour
- ✅ `/api/newsletter` - 5 requests per hour
- ✅ `/api/pre-order` - 5 requests per hour
- ✅ `/api/track-hashtag` - 10 requests per hour
- ✅ `/api/verify-entry` - 100 requests per minute
- ✅ `/api/admin/trigger-tracking` - 100 requests per minute

### 3. Additional Security Features
- **Honeypot fields** - Hidden fields to catch bots
- **Form timing checks** - Detect suspiciously fast submissions
- **IP-based tracking** - Rate limits per IP address
- **Duplicate prevention** - Check for existing submissions

## Setup Instructions

### 1. Get reCAPTCHA Keys
1. Go to [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin)
2. Register a new site
3. Choose **reCAPTCHA v3**
4. Add your domains (localhost for development)
5. Copy the Site Key and Secret Key

### 2. Configure Environment Variables
Add to your `.env.local` file:

```env
# Google reCAPTCHA v3
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key_here
RECAPTCHA_SECRET_KEY=your_secret_key_here
```

### 3. Test the Implementation

#### Development Mode:
- CAPTCHA verification is bypassed if `RECAPTCHA_SECRET_KEY` is not set
- Rate limiting still works

#### Production Mode:
- CAPTCHA is required for all form submissions
- Rate limits are enforced

## Configuration

### Adjust Rate Limits
Edit `app/lib/rate-limit.ts`:

```typescript
export const RATE_LIMITS = {
  CONTACT: {
    interval: 60 * 60 * 1000, // 1 hour
    maxRequests: 3, // Change this number
  },
  // ... other limits
};
```

### Adjust CAPTCHA Threshold
Edit `app/lib/captcha.ts`:

```typescript
// Line 24
return data.score >= 0.5; // Change threshold (0.0 - 1.0)
```

Lower threshold = more lenient (may allow more bots)
Higher threshold = stricter (may block some humans)

## API Response Headers

Rate-limited endpoints return these headers:
- `X-RateLimit-Remaining` - Requests remaining in current window
- `X-RateLimit-Reset` - Timestamp when limit resets

## Error Responses

### Rate Limit Exceeded (429)
```json
{
  "success": false,
  "error": "Too many requests. Please try again in X minutes."
}
```

### CAPTCHA Failed (400)
```json
{
  "success": false,
  "error": "CAPTCHA verification failed. Please try again."
}
```

### Honeypot Triggered (400)
```json
{
  "success": false,
  "error": "Invalid submission"
}
```

## Production Considerations

### 1. Use Redis for Rate Limiting
Current implementation uses in-memory storage. For production with multiple servers:
- Use Redis or similar distributed cache
- Install: `npm install ioredis`
- Update `app/lib/rate-limit.ts` to use Redis

### 2. Monitor CAPTCHA Scores
- Log scores to analyze bot traffic
- Adjust threshold based on your needs
- Consider using reCAPTCHA Enterprise for advanced features

### 3. Add Admin Dashboard
- View rate limit statistics
- Monitor CAPTCHA success rates
- Whitelist/blacklist IP addresses

## Testing

### Test CAPTCHA:
1. Submit a form without CAPTCHA keys configured (should work in dev)
2. Add CAPTCHA keys and submit again (should verify)
3. Try submitting with invalid token (should fail)

### Test Rate Limiting:
1. Submit contact form 3 times quickly
2. 4th submission should be blocked
3. Wait 1 hour or restart server to reset

## Files Modified

- `app/api/contact/route.ts` - Already had CAPTCHA & rate limiting
- `app/api/newsletter/route.ts` - Added CAPTCHA & rate limiting
- `app/api/verify-entry/route.ts` - Added rate limiting
- `app/api/admin/trigger-tracking/route.ts` - Added rate limiting
- `app/contact/page.tsx` - Added CAPTCHA integration
- `app/components/newsletter-signup.tsx` - Added CAPTCHA integration
- `.env.example` - Added RECAPTCHA variables

## Libraries Used

- **Google reCAPTCHA v3** - Invisible bot protection
- **Custom rate limiter** - In-memory request tracking
- **Firebase Admin** - Store submissions securely

## Support

For issues or questions:
- Check browser console for CAPTCHA errors
- Verify environment variables are set correctly
- Ensure reCAPTCHA keys match your domain
- Check rate limit headers in network tab
