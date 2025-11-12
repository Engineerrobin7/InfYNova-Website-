# 📊 Analytics Quick Reference Card

## 🎯 Where to View Your Data

### 1. **Google Analytics** (Main Dashboard)
**URL:** https://analytics.google.com/
**Login:** Your Google account
**Tracking ID:** G-E0Y5RMLEKL

**What to check:**
- **Real-time** → Live visitors right now
- **Acquisition** → Where users come from
- **Behavior** → What pages they visit
- **Events** → Sign-ups, newsletter, contact form

---

### 2. **Firebase Console** (User Management)
**URL:** https://console.firebase.google.com/
**Project:** infynova-website

**What to check:**
- **Authentication → Users** → All registered users
- **Firestore Database → users** → User details
- **Firestore Database → newsletter_subscribers** → Newsletter list
- **Firestore Database → contact_submissions** → Contact messages

---

### 3. **Microsoft Clarity** (User Behavior)
**URL:** https://clarity.microsoft.com/
**Setup:** Add project ID to `.env.local`

**What to check:**
- **Heatmaps** → Where users click
- **Recordings** → Watch user sessions
- **Insights** → Problem areas

---

### 4. **Vercel Analytics** (Performance)
**URL:** https://vercel.com/dashboard
**After deployment**

**What to check:**
- **Analytics** → Page speed
- **Core Web Vitals** → Performance scores
- **Real User Monitoring** → Actual user experience

---

## 📈 What Gets Tracked Automatically

### Sign-ups:
- ✅ Email sign-ups
- ✅ Google sign-ups
- ✅ Tracked in Google Analytics
- ✅ Tracked in Firebase
- ✅ Stored in Firestore

### Newsletter:
- ✅ Email subscriptions
- ✅ Tracked in Google Analytics
- ✅ Stored in Firestore
- ✅ Duplicate prevention

### Contact Form:
- ✅ Form submissions
- ✅ Tracked by subject
- ✅ Stored in Firestore
- ✅ Tracked in Google Analytics

### Page Views:
- ✅ All page visits
- ✅ Time on page
- ✅ Bounce rate
- ✅ Traffic sources

---

## 🔍 SEO Tools

### Google Search Console
**URL:** https://search.google.com/search-console/
**Submit:** After deployment

**Shows:**
- Search rankings
- Keywords bringing traffic
- Indexing status
- Errors

### Bing Webmaster Tools
**URL:** https://www.bing.com/webmasters/
**Submit:** After deployment

---

## 📊 Key Metrics to Watch

### Daily:
- Real-time visitors
- Sign-ups today
- Newsletter subscriptions

### Weekly:
- Total users
- Traffic sources
- Popular pages
- Conversion rate

### Monthly:
- User growth
- SEO rankings
- Bounce rate
- Average session duration

---

## 🎯 Conversion Tracking

### Sign-up Conversion:
**Formula:** (Sign-ups / Total Visitors) × 100
**Target:** 2-5%

### Newsletter Conversion:
**Formula:** (Subscriptions / Total Visitors) × 100
**Target:** 3-7%

### Contact Form:
**Formula:** (Submissions / Total Visitors) × 100
**Target:** 1-3%

---

## 🚀 Quick Actions

### View Live Traffic:
1. Go to Google Analytics
2. Click "Real-time"
3. See visitors right now

### View Sign-ups:
1. Go to Firebase Console
2. Click "Authentication" → "Users"
3. See all registered users

### View Newsletter Subscribers:
1. Go to Firebase Console
2. Click "Firestore Database"
3. Click "newsletter_subscribers"

### View Contact Messages:
1. Go to Firebase Console
2. Click "Firestore Database"
3. Click "contact_submissions"

### Export Data:
1. Firebase Console → Firestore
2. Click collection
3. Export to CSV

---

## 📱 Mobile App (Optional)

**Google Analytics App:**
- iOS: https://apps.apple.com/app/google-analytics/id881599038
- Android: https://play.google.com/store/apps/details?id=com.google.android.apps.giant

**Check stats on the go!**

---

## 🎊 Summary

**You can now track:**
- ✅ Every visitor
- ✅ Every sign-up
- ✅ Every newsletter subscription
- ✅ Every contact form
- ✅ Every page view
- ✅ User behavior
- ✅ Performance metrics

**All data is real-time and accessible 24/7!**
