# 🔧 GTM Not Verifying - Quick Fix

## Problem
Google Tag Manager is not detecting the installation on your live site.

## Root Cause
The environment variable `NEXT_PUBLIC_GTM_ID` is not set in Vercel.

## ✅ Solution (5 Minutes)

### Step 1: Add GTM ID to Vercel

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Click on your project: `infynova-website`

2. **Go to Settings**
   - Click "Settings" tab
   - Click "Environment Variables" in left sidebar

3. **Add GTM Variable**
   - Click "Add New"
   - Key: `NEXT_PUBLIC_GTM_ID`
   - Value: `GTM-WLND224Z`
   - Environment: Select ALL (Production, Preview, Development)
   - Click "Save"

### Step 2: Redeploy

**Option A: Automatic (Recommended)**
- Vercel will automatically redeploy when you add the variable
- Wait 2-3 minutes for deployment to complete

**Option B: Manual**
- Go to "Deployments" tab
- Click "..." on latest deployment
- Click "Redeploy"

### Step 3: Verify Installation

1. **Wait for deployment to complete** (2-3 minutes)

2. **Visit your site**
   - Go to your production URL
   - Or your custom domain if set up

3. **Check GTM is loaded**
   - Right-click → View Page Source
   - Press Ctrl+F and search for: `GTM-WLND224Z`
   - You should see it in the code

4. **Test in Console**
   - Press F12 (Developer Tools)
   - Go to Console tab
   - Type: `window.dataLayer`
   - Press Enter
   - You should see an array with GTM events

5. **Use GTM Preview Mode**
   - Go to: https://tagmanager.google.com/
   - Select your container (GTM-WLND224Z)
   - Click "Preview" button (top right)
   - Enter your site URL
   - Click "Connect"
   - GTM debugger should open and show your container

## 🧪 Quick Test Commands

### Test 1: Check if GTM script is in HTML
```bash
# Open your site in browser
# Right-click → View Page Source
# Search for: GTM-WLND224Z
```

### Test 2: Check dataLayer in Console
```javascript
// Open browser console (F12)
window.dataLayer
// Should show: [{event: 'gtm.js', ...}, {event: 'pageview', ...}]
```

### Test 3: Check Network Tab
```
1. Open DevTools (F12)
2. Go to Network tab
3. Refresh page (Ctrl+R)
4. Filter by "gtm"
5. You should see: gtm.js?id=GTM-WLND224Z (Status: 200)
```

## 📋 Environment Variables Checklist

Make sure these are ALL set in Vercel:

### Required for GTM:
- [x] `NEXT_PUBLIC_GTM_ID=GTM-WLND224Z`

### Required for Firebase (Client):
- [ ] `NEXT_PUBLIC_FIREBASE_API_KEY`
- [ ] `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- [ ] `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- [ ] `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- [ ] `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- [ ] `NEXT_PUBLIC_FIREBASE_APP_ID`

### Required for Firebase Admin (Server):
- [ ] `FIREBASE_CLIENT_EMAIL`
- [ ] `FIREBASE_PRIVATE_KEY`

### Optional:
- [ ] `NEXT_PUBLIC_GA_ID=G-E0Y5RMLEKL`
- [ ] `NEXT_PUBLIC_CLARITY_PROJECT_ID`

## 🔍 Troubleshooting

### GTM Still Not Showing?

**Check 1: Environment Variable Name**
- Must be EXACTLY: `NEXT_PUBLIC_GTM_ID`
- Case sensitive!
- No spaces

**Check 2: Environment Variable Value**
- Must be EXACTLY: `GTM-WLND224Z`
- No quotes
- No spaces

**Check 3: Deployment Completed**
- Go to Vercel → Deployments
- Check latest deployment status
- Should show "Ready" with green checkmark

**Check 4: Cache**
- Clear browser cache (Ctrl+Shift+Delete)
- Try incognito mode (Ctrl+Shift+N)
- Hard refresh (Ctrl+Shift+R)

### Still Not Working?

**Option 1: Check Build Logs**
1. Go to Vercel → Deployments
2. Click on latest deployment
3. Check build logs
4. Look for any errors

**Option 2: Check Runtime Logs**
1. Go to Vercel → Logs
2. Check for any errors
3. Look for GTM-related issues

**Option 3: Verify Locally**
```bash
# Test locally first
npm run build
npm start

# Open http://localhost:3000
# Check if GTM works locally
```

## ✅ Success Criteria

GTM is working when:
- ✅ You can see `GTM-WLND224Z` in page source
- ✅ `window.dataLayer` shows events in console
- ✅ GTM Preview mode connects successfully
- ✅ Network tab shows `gtm.js` loading (Status 200)
- ✅ Google Tag Manager dashboard shows "Connected"

## 📸 Screenshots to Help

### Where to Add Environment Variable:
```
Vercel Dashboard
  → Your Project
    → Settings
      → Environment Variables
        → Add New
          Key: NEXT_PUBLIC_GTM_ID
          Value: GTM-WLND224Z
          Environment: ✓ Production ✓ Preview ✓ Development
          → Save
```

### What You Should See in Console:
```javascript
window.dataLayer
// Output:
[
  {event: 'gtm.js', gtm.start: 1700000000000},
  {event: 'pageview', page: '/'}
]
```

### What You Should See in Network Tab:
```
Name: gtm.js?id=GTM-WLND224Z
Status: 200
Type: script
```

## 🎯 Quick Fix Summary

1. Add `NEXT_PUBLIC_GTM_ID=GTM-WLND224Z` to Vercel
2. Wait for auto-redeploy (2-3 min)
3. Clear cache and test
4. Check console: `window.dataLayer`
5. Use GTM Preview mode to verify

---

**Need Help?**
- Check Vercel deployment logs
- Test locally first
- Verify environment variable is set correctly
- Make sure deployment completed successfully

**Your GTM ID:** GTM-WLND224Z
**Status:** Needs environment variable in Vercel
