# Google Tag Manager (GTM) Setup Guide

## ✅ What's Been Integrated

### GTM Components Created:
1. **`app/components/google-tag-manager.tsx`** - GTM script component
2. **`app/lib/gtm.ts`** - Event tracking utilities
3. **Updated `app/layout.tsx`** - GTM integration
4. **Updated `.env.example`** - GTM ID variable

### Tracking Events Implemented:
- ✅ Page views (automatic)
- ✅ Challenge submissions
- ✅ Newsletter signups
- ✅ Pre-orders
- ✅ Button clicks
- ✅ Form submissions
- ✅ Social shares
- ✅ Video plays
- ✅ Affiliate clicks
- ✅ Referrals
- ✅ Errors

## 🚀 Quick Setup (5 Minutes)

### Step 1: Create GTM Account (2 min)

1. **Go to Google Tag Manager**
   - Visit: https://tagmanager.google.com/
   - Sign in with Google account

2. **Create Account**
   - Click "Create Account"
   - Account Name: "InfyNova"
   - Country: India
   - Click "Continue"

3. **Create Container**
   - Container Name: "infynova.in"
   - Target Platform: "Web"
   - Click "Create"
   - Accept Terms of Service

4. **Get Container ID**
   - You'll see: **GTM-XXXXXXX**
   - Copy this ID

### Step 2: Add to Your Website (1 min)

1. **Add to .env.local**
   ```bash
   NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
   ```
   Replace `GTM-XXXXXXX` with your actual GTM ID

2. **Restart Dev Server**
   ```bash
   npm run dev
   ```

### Step 3: Verify Installation (2 min)

1. **Install GTM Preview Extension**
   - Chrome: https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk

2. **Test GTM**
   - Go to your website: http://localhost:3000
   - Open GTM Preview mode
   - You should see GTM container loading

3. **Check Events**
   - Navigate around your site
   - Submit a challenge entry
   - Check GTM Preview for events

## 📊 Events Being Tracked

### Automatic Events:
```javascript
// Page View (automatic on every page)
{
  event: 'pageview',
  page: '/about'
}
```

### Challenge Submission:
```javascript
{
  event: 'challenge_submission',
  challenge_name: '#InfyNovaUnboxChallenge',
  platform: 'instagram',
  username: '@user123'
}
```

### Newsletter Signup:
```javascript
{
  event: 'newsletter_signup',
  user_email: 'user@example.com'
}
```

### Pre-Order:
```javascript
{
  event: 'pre_order',
  ecommerce: {
    items: [{
      item_name: 'InfyNova Pro',
      item_id: 'infynova-pro',
      price: 39999,
      currency: 'INR'
    }]
  }
}
```

### Button Click:
```javascript
{
  event: 'button_click',
  button_name: 'Join Challenge',
  location: 'homepage'
}
```

## 🎯 Setting Up Tags in GTM

### 1. Google Analytics 4 (GA4)

1. **In GTM, click "Tags" → "New"**
2. **Tag Configuration:**
   - Tag Type: Google Analytics: GA4 Configuration
   - Measurement ID: G-XXXXXXXXXX (from GA4)
3. **Triggering:**
   - Trigger: All Pages
4. **Save**

### 2. Track Challenge Submissions

1. **Create Trigger:**
   - Triggers → New
   - Trigger Type: Custom Event
   - Event Name: `challenge_submission`
   - Save as "Challenge Submission"

2. **Create Tag:**
   - Tags → New
   - Tag Type: Google Analytics: GA4 Event
   - Configuration Tag: (select your GA4 config)
   - Event Name: `challenge_submission`
   - Event Parameters:
     - `challenge_name`: {{challenge_name}}
     - `platform`: {{platform}}
     - `username`: {{username}}
   - Trigger: Challenge Submission
   - Save

### 3. Track Pre-Orders

1. **Create Trigger:**
   - Trigger Type: Custom Event
   - Event Name: `pre_order`
   - Save as "Pre Order"

2. **Create Tag:**
   - Tag Type: Google Analytics: GA4 Event
   - Event Name: `purchase` (or `pre_order`)
   - Enable Enhanced Ecommerce
   - Trigger: Pre Order
   - Save

### 4. Track Newsletter Signups

1. **Create Trigger:**
   - Event Name: `newsletter_signup`
   - Save as "Newsletter Signup"

2. **Create Tag:**
   - Tag Type: Google Analytics: GA4 Event
   - Event Name: `generate_lead`
   - Trigger: Newsletter Signup
   - Save

## 🔧 Advanced Configuration

### Facebook Pixel Integration

1. **In GTM, add Facebook Pixel:**
   - Tags → New
   - Tag Type: Custom HTML
   - HTML:
   ```html
   <script>
   !function(f,b,e,v,n,t,s)
   {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
   n.callMethod.apply(n,arguments):n.queue.push(arguments)};
   if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
   n.queue=[];t=b.createElement(e);t.async=!0;
   t.src=v;s=b.getElementsByTagName(e)[0];
   s.parentNode.insertBefore(t,s)}(window, document,'script',
   'https://connect.facebook.net/en_US/fbevents.js');
   fbq('init', 'YOUR_PIXEL_ID');
   fbq('track', 'PageView');
   </script>
   ```
   - Trigger: All Pages

2. **Track Conversions:**
   - Create tags for specific events
   - Use `fbq('track', 'Lead')` for signups
   - Use `fbq('track', 'Purchase')` for orders

### LinkedIn Insight Tag

1. **Add LinkedIn Tag:**
   - Tags → New
   - Tag Type: Custom HTML
   - Add LinkedIn Insight Tag code
   - Trigger: All Pages

### Twitter Pixel

1. **Add Twitter Pixel:**
   - Tags → New
   - Tag Type: Custom HTML
   - Add Twitter Pixel code
   - Trigger: All Pages

## 📈 Recommended GTM Setup

### Essential Tags:
1. ✅ Google Analytics 4
2. ✅ Facebook Pixel
3. ✅ Google Ads Conversion Tracking
4. ✅ Hotjar or Microsoft Clarity

### Essential Triggers:
1. ✅ All Pages
2. ✅ Challenge Submission
3. ✅ Pre-Order
4. ✅ Newsletter Signup
5. ✅ Button Clicks
6. ✅ Form Submissions

### Essential Variables:
1. ✅ Page URL
2. ✅ Page Path
3. ✅ Click Text
4. ✅ Click URL
5. ✅ Form ID

## 🧪 Testing Your Setup

### 1. Preview Mode

1. **In GTM, click "Preview"**
2. **Enter your website URL**
3. **Navigate and test events**
4. **Check if tags fire correctly**

### 2. Tag Assistant

1. **Install Tag Assistant Chrome Extension**
2. **Visit your website**
3. **Check for GTM container**
4. **Verify tags are firing**

### 3. Real-Time Reports

1. **Go to Google Analytics**
2. **Reports → Realtime**
3. **Perform actions on your site**
4. **Check if events appear**

## 📊 Custom Events You Can Track

### Already Implemented:
```typescript
// In your code, use these functions:
import { 
  trackPageView,
  trackEvent,
  trackPurchase,
  trackPreOrder,
  trackNewsletterSignup,
  trackChallengeSubmission,
  trackSocialShare,
  trackButtonClick,
  trackFormSubmission,
  trackVideoPlay,
  trackSearch,
  trackEngagement,
  trackError,
  trackAffiliateClick,
  trackReferral
} from '@/app/lib/gtm';

// Example usage:
trackButtonClick('Pre-Order Now', 'hero-section');
trackSocialShare('twitter', 'https://infynova.in');
trackVideoPlay('Product Demo', '/videos/demo.mp4');
```

## 🎯 Conversion Tracking

### Track Pre-Orders:
```typescript
// In your pre-order form
import { trackPreOrder } from '@/app/lib/gtm';

trackPreOrder({
  productName: 'InfyNova Pro',
  productId: 'infynova-pro',
  price: 39999,
  currency: 'INR'
});
```

### Track Newsletter Signups:
```typescript
// Already implemented in Footer.tsx
import { trackNewsletterSignup } from '@/app/lib/gtm';

trackNewsletterSignup(email);
```

### Track Challenge Submissions:
```typescript
// Already implemented in submit-challenge-entry.tsx
import { trackChallengeSubmission } from '@/app/lib/gtm';

trackChallengeSubmission({
  challengeName: hashtag,
  platform: platform,
  username: username
});
```

## 🔐 Privacy & GDPR Compliance

### Cookie Consent

1. **Add Cookie Consent Banner**
   - Use a library like `react-cookie-consent`
   - Only load GTM after consent

2. **Update GTM Settings**
   - Enable Consent Mode
   - Configure default consent states

### Example Implementation:
```typescript
// app/components/cookie-consent.tsx
import { useEffect } from 'react';

export function CookieConsent() {
  const handleAccept = () => {
    // Update consent
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'consent_update',
      consent: {
        analytics_storage: 'granted',
        ad_storage: 'granted'
      }
    });
  };

  return (
    // Your consent banner UI
  );
}
```

## 📱 Mobile App Tracking (Future)

When you build a mobile app:
1. Use Firebase Analytics
2. Link to GTM
3. Track app events
4. Sync with web tracking

## 🐛 Troubleshooting

### GTM Not Loading:
- Check GTM ID in .env.local
- Verify environment variable is set
- Check browser console for errors
- Disable ad blockers

### Events Not Firing:
- Check GTM Preview mode
- Verify trigger conditions
- Check dataLayer in console: `console.log(window.dataLayer)`
- Ensure functions are imported correctly

### Tags Not Working:
- Verify tag configuration
- Check trigger setup
- Test in Preview mode
- Review GTM debug console

## 📚 Resources

- **GTM Documentation**: https://support.google.com/tagmanager
- **GA4 Setup**: https://support.google.com/analytics/answer/9304153
- **GTM Academy**: https://analytics.google.com/analytics/academy/
- **DataLayer Guide**: https://developers.google.com/tag-platform/tag-manager/datalayer

## ✅ Checklist

- [ ] Create GTM account
- [ ] Get GTM container ID
- [ ] Add to .env.local
- [ ] Restart dev server
- [ ] Test in Preview mode
- [ ] Set up GA4 tag
- [ ] Configure triggers
- [ ] Test events
- [ ] Set up conversion tracking
- [ ] Add cookie consent (optional)
- [ ] Publish container

## 🎉 You're Done!

Your GTM is now fully integrated and tracking all important events!

**Next Steps:**
1. Add GTM ID to .env.local
2. Test in Preview mode
3. Set up tags in GTM dashboard
4. Publish your container

---

**Status**: ✅ GTM Fully Integrated
**Time to Setup**: 5 minutes
**Events Tracked**: 15+ custom events
