# Social Media API Setup Guide

## 🎯 Overview

Your system now has **automated hashtag tracking** for Instagram and Twitter!

### What's Been Added:
- ✅ Instagram Graph API integration
- ✅ Twitter API v2 integration
- ✅ Automated tracking cron job (runs every 6 hours)
- ✅ Manual trigger button in admin dashboard
- ✅ Automatic entry creation in Firebase

## 📋 Setup Instructions

### Option 1: Instagram Graph API

#### Prerequisites:
- Facebook Developer account
- Instagram Business account (not personal)
- Facebook Page connected to Instagram

#### Step 1: Create Facebook App (15 min)

1. **Go to Facebook Developers**
   - Visit: https://developers.facebook.com/
   - Click "My Apps" → "Create App"

2. **Choose App Type**
   - Select "Business"
   - Fill in app details
   - Create app

3. **Add Instagram Product**
   - In dashboard, click "Add Product"
   - Find "Instagram" and click "Set Up"

#### Step 2: Get Access Token (10 min)

1. **Get Short-Lived Token**
   - Go to: Graph API Explorer
   - Select your app
   - Add permissions:
     - `instagram_basic`
     - `instagram_manage_insights`
     - `pages_read_engagement`
   - Generate Access Token

2. **Convert to Long-Lived Token**
   ```bash
   curl -X GET "https://graph.facebook.com/v18.0/oauth/access_token?grant_type=fb_exchange_token&client_id=YOUR_APP_ID&client_secret=YOUR_APP_SECRET&fb_exchange_token=SHORT_LIVED_TOKEN"
   ```

3. **Get Instagram Business Account ID**
   ```bash
   curl -X GET "https://graph.facebook.com/v18.0/me/accounts?access_token=YOUR_ACCESS_TOKEN"
   ```
   
   Then get Instagram account:
   ```bash
   curl -X GET "https://graph.facebook.com/v18.0/PAGE_ID?fields=instagram_business_account&access_token=YOUR_ACCESS_TOKEN"
   ```

#### Step 3: Add to Environment Variables

Add to `.env.local`:
```bash
INSTAGRAM_ACCESS_TOKEN=your_long_lived_access_token
INSTAGRAM_USER_ID=your_instagram_business_account_id
```

#### Step 4: Test Instagram API

```bash
# Test in terminal
curl "https://graph.instagram.com/YOUR_USER_ID?fields=id,username&access_token=YOUR_TOKEN"
```

Or test in your app:
- Go to: http://localhost:3000/admin/challenges
- Click "Track Now" button
- Check for Instagram posts

---

### Option 2: Twitter API v2

#### Prerequisites:
- Twitter Developer account
- Elevated access (required for recent search)

#### Step 1: Create Twitter Developer Account (10 min)

1. **Apply for Developer Account**
   - Visit: https://developer.twitter.com/
   - Click "Sign up"
   - Fill in application form
   - Describe your use case: "Tracking brand hashtags for contest management"

2. **Wait for Approval**
   - Usually takes 1-2 days
   - Check email for approval

#### Step 2: Create App & Get Bearer Token (5 min)

1. **Create Project**
   - Go to Developer Portal
   - Click "Create Project"
   - Name it "InfyNova Hashtag Tracker"

2. **Create App**
   - Within project, create app
   - Name it "InfyNova Tracker"

3. **Get Bearer Token**
   - Go to app settings
   - Find "Keys and tokens"
   - Generate "Bearer Token"
   - **Save it immediately** (shown only once)

#### Step 3: Request Elevated Access (Important!)

1. **Apply for Elevated Access**
   - In Developer Portal, go to your project
   - Click "Elevated" access
   - Fill in form explaining your use case
   - Wait for approval (usually instant to 24 hours)

2. **Why Elevated Access?**
   - Free tier: 500,000 tweets/month
   - Required for recent search endpoint
   - No cost for basic usage

#### Step 4: Add to Environment Variables

Add to `.env.local`:
```bash
TWITTER_BEARER_TOKEN=your_bearer_token_here
```

#### Step 5: Test Twitter API

```bash
# Test in terminal
curl -X GET "https://api.twitter.com/2/tweets/search/recent?query=%23InfyNova&max_results=10" \
  -H "Authorization: Bearer YOUR_BEARER_TOKEN"
```

Or test in your app:
- Go to: http://localhost:3000/admin/challenges
- Click "Track Now" button
- Check for Twitter posts

---

## 🔄 How Automated Tracking Works

### Automatic (Cron Job):
1. Runs every 6 hours automatically
2. Searches for all 4 hashtags
3. Finds new posts on Instagram & Twitter
4. Saves to Firebase
5. Appears in admin dashboard

### Manual (Track Now Button):
1. Click "Track Now" in admin dashboard
2. Immediately searches for new posts
3. Shows results in toast notification
4. Refreshes entry list

## 📊 What Gets Tracked

### Instagram Posts:
- Caption
- Media URL
- Permalink
- Likes
- Comments
- Username
- Timestamp

### Twitter Posts:
- Tweet text
- Likes
- Retweets
- Replies
- Quote tweets
- Username
- Timestamp

## 🔐 Security & Rate Limits

### Instagram:
- **Rate Limit**: 200 calls/hour per user
- **Token Expiry**: 60 days (auto-refresh available)
- **Cost**: Free

### Twitter:
- **Rate Limit**: 
  - Free tier: 500,000 tweets/month
  - 450 requests per 15 minutes
- **Token Expiry**: Never (Bearer tokens don't expire)
- **Cost**: 
  - Free tier: $0
  - Basic: $100/month (if you need more)

## 🧪 Testing

### Test Instagram Tracking:
```bash
# In your terminal
curl http://localhost:3000/api/admin/trigger-tracking -X POST
```

### Test Twitter Tracking:
```bash
# Same endpoint tests both
curl http://localhost:3000/api/admin/trigger-tracking -X POST
```

### Check Results:
1. Go to: http://localhost:3000/admin/challenges
2. Look for entries with "auto-tracked" source
3. Verify engagement metrics are populated

## 🚀 Deployment

### Vercel Cron Setup:

1. **Deploy to Vercel**
   ```bash
   vercel --prod
   ```

2. **Add Environment Variables**
   - Go to Vercel Dashboard
   - Project Settings → Environment Variables
   - Add all API keys

3. **Cron Job Runs Automatically**
   - Configured in `vercel.json`
   - Runs every 6 hours: `0 */6 * * *`
   - No additional setup needed

### Change Cron Schedule:

Edit `vercel.json`:
```json
{
  "crons": [{
    "path": "/api/cron/track-hashtags",
    "schedule": "0 */6 * * *"  // Every 6 hours
    // "schedule": "0 * * * *"  // Every hour
    // "schedule": "*/30 * * * *"  // Every 30 minutes
  }]
}
```

## 📈 Monitoring

### Check Tracking Logs:

In Firebase Console:
- Collection: `tracking_logs`
- Shows each tracking run
- Results for Instagram & Twitter
- Timestamp of execution

### View in Admin Dashboard:

- Total entries tracked
- New entries found
- Errors encountered
- Platform breakdown

## 🐛 Troubleshooting

### Instagram Issues:

**"Invalid access token"**
→ Token expired, generate new long-lived token

**"Hashtag not found"**
→ Make sure hashtag exists and has posts

**"User not authorized"**
→ Need Instagram Business account, not personal

### Twitter Issues:

**"Unauthorized"**
→ Check bearer token is correct

**"Forbidden"**
→ Need Elevated access, apply in Developer Portal

**"Rate limit exceeded"**
→ Wait 15 minutes or reduce tracking frequency

### General Issues:

**No posts found**
→ Check hashtags are spelled correctly

**Duplicate entries**
→ System prevents duplicates by URL

**Tracking not running**
→ Check cron job is configured in Vercel

## 💡 Tips & Best Practices

### 1. Token Management:
- Store tokens securely in environment variables
- Never commit tokens to git
- Refresh Instagram tokens before expiry

### 2. Rate Limiting:
- Don't track too frequently
- 6 hours is optimal for most use cases
- Monitor your API usage

### 3. Hashtag Selection:
- Use specific, unique hashtags
- Avoid generic hashtags (too many results)
- Track 3-5 hashtags maximum

### 4. Data Quality:
- Review auto-tracked entries regularly
- Verify engagement metrics
- Remove spam/irrelevant posts

## 📝 Customization

### Add More Hashtags:

Edit `app/api/cron/track-hashtags/route.ts`:
```typescript
const HASHTAGS = [
  '#InfyNovaUnboxChallenge',
  '#NovaOSDanceChallenge',
  '#AIPhoneArtChallenge',
  '#InfyNovaMemeChallenge',
  '#YourNewHashtag',  // Add here
];
```

### Change Tracking Frequency:

Edit `vercel.json`:
```json
"schedule": "0 */3 * * *"  // Every 3 hours
```

### Modify Engagement Formula:

Edit `app/lib/twitter-api.ts`:
```typescript
export function calculateTwitterEngagement(metrics) {
  return (
    metrics.like_count +
    (metrics.reply_count * 2) +
    (metrics.retweet_count * 3) +
    (metrics.quote_count * 3)
  );
}
```

## ✅ Setup Checklist

### Instagram:
- [ ] Facebook Developer account created
- [ ] Instagram Business account connected
- [ ] App created and Instagram product added
- [ ] Long-lived access token generated
- [ ] User ID obtained
- [ ] Added to .env.local
- [ ] Tested with "Track Now" button

### Twitter:
- [ ] Twitter Developer account created
- [ ] Elevated access approved
- [ ] App created
- [ ] Bearer token generated
- [ ] Added to .env.local
- [ ] Tested with "Track Now" button

### Deployment:
- [ ] Environment variables added to Vercel
- [ ] Cron job configured
- [ ] First tracking run successful
- [ ] Monitoring tracking logs

## 🎉 You're Done!

Your automated hashtag tracking is now live!

**Test it:**
1. Click "Track Now" in admin dashboard
2. Wait for results
3. See new entries appear

**Monitor it:**
- Check tracking logs in Firebase
- Review new entries daily
- Verify engagement metrics

---

**Need Help?**
- Instagram API Docs: https://developers.facebook.com/docs/instagram-api
- Twitter API Docs: https://developer.twitter.com/en/docs/twitter-api
- Check Firebase Console for errors
- Review API logs in Vercel
