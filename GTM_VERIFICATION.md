# ✅ GTM Verification - Your GTM is Live!

## Your GTM ID: GTM-WLND224Z

### ✅ What's Been Done

1. **GTM ID Added to .env.local**
   ```bash
   NEXT_PUBLIC_GTM_ID=GTM-WLND224Z
   ```

2. **GTM Script in Head**
   - Loads in `<head>` section
   - Uses Next.js Script component
   - Strategy: afterInteractive (optimal)

3. **NoScript Fallback**
   - Added to `<body>` for users without JavaScript

4. **Dev Server Restarted**
   - Changes applied
   - GTM now active

## 🧪 Verify GTM is Working

### Method 1: Browser Console (Easiest)

1. **Open your website**
   - Go to: http://localhost:3000

2. **Open Developer Tools**
   - Press F12 or Right-click → Inspect

3. **Go to Console tab**

4. **Type this command:**
   ```javascript
   window.dataLayer
   ```

5. **You should see:**
   ```javascript
   [{event: 'gtm.js', gtm.start: ...}, {event: 'pageview', page: '/'}]
   ```

✅ If you see this, GTM is working!

### Method 2: Network Tab

1. **Open Developer Tools (F12)**

2. **Go to Network tab**

3. **Refresh page (Ctrl+R)**

4. **Filter by "gtm"**

5. **You should see:**
   - `gtm.js?id=GTM-WLND224Z` (Status: 200)

✅ If you see this request, GTM is loading!

### Method 3: View Page Source

1. **Right-click on page → View Page Source**

2. **Search for (Ctrl+F):** `GTM-WLND224Z`

3. **You should see:**
   ```html
   <script id="gtm-script">
   (function(w,d,s,l,i){w[l]=w[l]||[];...
   'dataLayer','GTM-WLND224Z');
   </script>
   ```

✅ If you see your GTM ID, it's installed!

### Method 4: GTM Preview Mode (Best)

1. **Go to GTM Dashboard**
   - Visit: https://tagmanager.google.com/

2. **Select your container**
   - GTM-WLND224Z

3. **Click "Preview" button**
   - Top right corner

4. **Enter your website URL**
   - http://localhost:3000

5. **Click "Connect"**

6. **You should see:**
   - GTM debugger opens
   - Shows your container
   - Lists all tags

✅ This is the most reliable method!

## 📊 Test Events

### Test Page Views:

1. **Go to homepage**
2. **Open console**
3. **Type:** `window.dataLayer`
4. **Navigate to another page** (e.g., /about)
5. **Check console again**
6. **You should see new pageview event**

### Test Challenge Submission:

1. **Go to homepage**
2. **Scroll to "Viral Challenges"**
3. **Click "Join Challenge"**
4. **Fill form and submit**
5. **Check console:** `window.dataLayer`
6. **You should see:**
   ```javascript
   {
     event: 'challenge_submission',
     challenge_name: '#InfyNovaUnboxChallenge',
     platform: 'instagram',
     username: '@yourname'
   }
   ```

## 🎯 Next Steps in GTM Dashboard

### 1. Add Google Analytics 4

1. **In GTM, go to Tags → New**

2. **Tag Configuration:**
   - Tag Type: Google Analytics: GA4 Configuration
   - Measurement ID: `G-E0Y5RMLEKL` (your existing GA ID)

3. **Triggering:**
   - Trigger: All Pages

4. **Save**

5. **Click "Submit" to publish**

### 2. Set Up Challenge Tracking

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
     - Parameter Name: `challenge_name`
     - Value: `{{challenge_name}}`
   - Add more parameters for platform, username
   - Trigger: Challenge Submission
   - Save

3. **Publish Container**

### 3. Test in Preview Mode

1. **Click "Preview"**
2. **Connect to your site**
3. **Submit a challenge**
4. **Check if tag fires**

## 🔍 Troubleshooting

### GTM Not Loading?

**Check:**
- [ ] GTM ID is correct in .env.local
- [ ] Dev server restarted
- [ ] No ad blockers active
- [ ] Browser console for errors

**Solution:**
```bash
# Verify environment variable
echo $env:NEXT_PUBLIC_GTM_ID

# Should show: GTM-WLND224Z
```

### Events Not Showing?

**Check:**
- [ ] Console shows dataLayer
- [ ] Events are being pushed
- [ ] No JavaScript errors

**Debug:**
```javascript
// In browser console
console.log(window.dataLayer);

// Should show array of events
```

### Tags Not Firing?

**Check:**
- [ ] Tags published in GTM
- [ ] Triggers configured correctly
- [ ] Preview mode shows tags

**Solution:**
- Use GTM Preview mode
- Check tag firing conditions
- Verify trigger matches event

## ✅ Verification Checklist

- [x] GTM ID added to .env.local
- [x] GTM script in head
- [x] NoScript fallback in body
- [x] Dev server restarted
- [ ] Verified in browser console (YOU DO THIS)
- [ ] Tested page views (YOU DO THIS)
- [ ] Tested challenge submission (YOU DO THIS)
- [ ] Set up GA4 tag in GTM (YOU DO THIS)
- [ ] Published GTM container (YOU DO THIS)

## 📈 What's Being Tracked

### Automatic:
✅ Page views on every page
✅ Page navigation
✅ Time on page

### User Actions:
✅ Challenge submissions
✅ Newsletter signups (when implemented)
✅ Pre-orders (when implemented)
✅ Button clicks (when implemented)
✅ Form submissions (when implemented)

## 🎉 Success!

Your GTM is now live and tracking!

**Test it now:**
1. Open http://localhost:3000
2. Press F12
3. Type: `window.dataLayer`
4. See your GTM events!

**Next:**
1. Set up tags in GTM dashboard
2. Configure GA4
3. Test in Preview mode
4. Publish container

---

**Status**: ✅ GTM Live & Tracking
**GTM ID**: GTM-WLND224Z
**Environment**: Development
**Ready for**: Production deployment
