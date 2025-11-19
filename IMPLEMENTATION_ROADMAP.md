# 🚀 Implementation Roadmap - Remaining Features

## ✅ Priority 1: Critical (Implement Now)

### 1. OG Image Creation
**Status:** Ready to implement
**Time:** 10 minutes
- Create 1200x630px OG image
- Add to `/public/og-image.jpg`
- Already referenced in metadata

### 2. Alt Tags for Images
**Status:** Ready to implement
**Time:** 15 minutes
- Audit all images
- Add descriptive alt tags
- Improve accessibility

### 3. Fix Animation Performance
**Status:** Ready to implement
**Time:** 20 minutes
- Reduce animation complexity
- Add `will-change` CSS
- Optimize Framer Motion settings

### 4. Email Notifications
**Status:** Ready to implement
**Time:** 30 minutes
- Set up Resend or SendGrid
- Pre-order confirmation emails
- Contact form notifications
- Challenge winner notifications

## ⏳ Priority 2: Important (Next Phase)

### 5. Payment Integration
**Status:** Requires setup
**Time:** 2-3 hours
**Options:**
- Razorpay (India-focused) ✅ Recommended
- Stripe (International)
- PayU (India)

**Implementation:**
- Add payment gateway SDK
- Create checkout flow
- Handle payment callbacks
- Store payment records

### 6. 3D Model Fixes
**Status:** Needs investigation
**Time:** 1-2 hours
- Debug current 3D model issues
- Optimize loading
- Add fallback images

### 7. Additional 3D Models
**Status:** Requires 3D assets
**Time:** 3-4 hours
**Models needed:**
- Smartwatch
- Laptop
- TWS Earbuds
- Tablet (optional)

**Requirements:**
- Get/create 3D models (.glb or .gltf format)
- Optimize for web
- Add to product pages

## 🔄 Priority 3: Advanced (Future)

### 8. Instagram API Integration
**Status:** Requires API approval
**Time:** 4-6 hours
**Requirements:**
- Instagram Business Account
- Facebook Developer App
- API approval (can take days/weeks)
- Access tokens

**Implementation:**
- Set up Instagram Graph API
- Fetch posts by hashtag
- Store in database
- Display on website

### 9. Twitter/X API Integration
**Status:** Requires API access
**Time:** 3-4 hours
**Requirements:**
- Twitter Developer Account
- API v2 access ($100/month for basic)
- Bearer token

**Implementation:**
- Set up Twitter API v2
- Fetch tweets by hashtag
- Store in database
- Display on website

### 10. Auto-fetch Hashtag Posts
**Status:** Depends on #8 & #9
**Time:** 2-3 hours
- Create cron job
- Fetch from Instagram & Twitter
- Process and store posts
- Update engagement metrics

## 📋 Detailed Implementation Steps

### Phase 1: Quick Wins (Today)

#### 1.1 Create OG Image
```bash
# Use Canva or Figma to create:
# - Size: 1200x630px
# - Content: InfyNova logo + tagline
# - Text: "India's First AI-Powered Smartphone"
# - Save as: public/og-image.jpg
```

#### 1.2 Add Alt Tags
```typescript
// Find all images without alt tags
// Add descriptive alt text
<Image src="..." alt="InfyNova smartphone front view" />
```

#### 1.3 Optimize Animations
```typescript
// Reduce motion for users who prefer it
const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Simplify animations
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
>
```

#### 1.4 Email Notifications (Resend)
```bash
npm install resend
```

```typescript
// app/lib/email.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendPreOrderEmail(email: string, orderData: any) {
  await resend.emails.send({
    from: 'InfyNova <orders@infynova.in>',
    to: email,
    subject: 'Pre-Order Confirmation',
    html: `<h1>Thank you for your pre-order!</h1>`
  });
}
```

### Phase 2: Payment Integration (This Week)

#### 2.1 Razorpay Setup
```bash
npm install razorpay
```

```typescript
// app/lib/razorpay.ts
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function createOrder(amount: number, orderId: string) {
  return await razorpay.orders.create({
    amount: amount * 100, // Convert to paise
    currency: 'INR',
    receipt: orderId,
  });
}
```

#### 2.2 Payment Flow
1. User submits pre-order
2. Create Razorpay order
3. Show payment modal
4. Handle payment success/failure
5. Update order status
6. Send confirmation email

### Phase 3: Social Media APIs (Next Week)

#### 3.1 Instagram Graph API
**Prerequisites:**
1. Convert to Instagram Business Account
2. Create Facebook Developer App
3. Request permissions
4. Get access token

**Implementation:**
```typescript
// app/lib/instagram-api.ts
export async function fetchInstagramPosts(hashtag: string) {
  const response = await fetch(
    `https://graph.instagram.com/ig_hashtag_search?user_id=${USER_ID}&q=${hashtag}&access_token=${ACCESS_TOKEN}`
  );
  return response.json();
}
```

#### 3.2 Twitter API v2
**Prerequisites:**
1. Apply for Twitter Developer Account
2. Subscribe to Basic plan ($100/month)
3. Get Bearer Token

**Implementation:**
```typescript
// app/lib/twitter-api.ts
export async function fetchTwitterPosts(hashtag: string) {
  const response = await fetch(
    `https://api.twitter.com/2/tweets/search/recent?query=${hashtag}`,
    {
      headers: {
        'Authorization': `Bearer ${BEARER_TOKEN}`
      }
    }
  );
  return response.json();
}
```

### Phase 4: 3D Models (Next Week)

#### 4.1 Fix Current 3D Model
- Check Three.js version compatibility
- Optimize model size
- Add loading states
- Add error boundaries

#### 4.2 Add New 3D Models
**Sources for 3D models:**
- Sketchfab (free/paid)
- TurboSquid
- CGTrader
- Create custom in Blender

**Format:** .glb or .gltf (optimized for web)

**Implementation:**
```typescript
// app/components/product-3d-models.tsx
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function Watch() {
  const { scene } = useGLTF('/models/watch.glb');
  return <primitive object={scene} />;
}

function Laptop() {
  const { scene } = useGLTF('/models/laptop.glb');
  return <primitive object={scene} />;
}

function TWS() {
  const { scene } = useGLTF('/models/tws.glb');
  return <primitive object={scene} />;
}
```

## 🎯 Recommended Implementation Order

### Week 1 (This Week):
1. ✅ Create OG image (10 min)
2. ✅ Add alt tags (15 min)
3. ✅ Optimize animations (20 min)
4. ✅ Set up email notifications (30 min)
5. ✅ Integrate Razorpay payment (3 hours)

### Week 2:
1. Fix 3D model issues (2 hours)
2. Add watch 3D model (1 hour)
3. Add laptop 3D model (1 hour)
4. Add TWS 3D model (1 hour)

### Week 3:
1. Apply for Instagram API access
2. Apply for Twitter API access
3. Wait for approvals (can take 1-2 weeks)

### Week 4:
1. Implement Instagram API (4 hours)
2. Implement Twitter API (3 hours)
3. Create auto-fetch cron job (2 hours)
4. Test and optimize

## 💰 Cost Estimates

### One-Time Costs:
- 3D Models: $0-$200 (depending on source)
- Design tools: $0 (use Canva free)

### Monthly Costs:
- Resend (Email): $0-$20/month (1,000-10,000 emails)
- Razorpay: 2% per transaction
- Twitter API: $100/month (Basic plan)
- Instagram API: Free (but requires approval)

### Total Monthly: ~$120-$150

## 📝 Environment Variables Needed

```env
# Email (Resend)
RESEND_API_KEY=re_xxxxxxxxxxxxx

# Payment (Razorpay)
RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxx
RAZORPAY_WEBHOOK_SECRET=xxxxxxxxxxxxx

# Instagram API
INSTAGRAM_ACCESS_TOKEN=xxxxxxxxxxxxx
INSTAGRAM_USER_ID=xxxxxxxxxxxxx

# Twitter API
TWITTER_BEARER_TOKEN=xxxxxxxxxxxxx
TWITTER_API_KEY=xxxxxxxxxxxxx
TWITTER_API_SECRET=xxxxxxxxxxxxx

# reCAPTCHA
RECAPTCHA_SECRET_KEY=xxxxxxxxxxxxx
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=xxxxxxxxxxxxx
```

## 🚀 Quick Start Commands

```bash
# Install email service
npm install resend

# Install payment gateway
npm install razorpay

# Install reCAPTCHA
npm install react-google-recaptcha

# Install 3D optimization tools
npm install @react-three/drei @react-three/fiber three

# Run development
npm run dev
```

## ✅ What to Do Right Now

1. **Create OG Image** (I'll help you with this)
2. **Add Alt Tags** (I'll audit and fix)
3. **Optimize Animations** (I'll implement)
4. **Set up Email** (Choose: Resend or SendGrid)
5. **Add Payment** (Set up Razorpay account)

## 🎯 Let's Start!

Which would you like me to implement first?
1. OG Image + Alt Tags + Animation fixes (Quick wins)
2. Email notifications setup
3. Payment integration
4. 3D model fixes

Or should I implement all Priority 1 items now?
