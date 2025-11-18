# Complete Hashtag Tracking System - Setup Guide

## ✅ What's Been Built

### 1. User Submission System
- Modal form for users to submit posts
- Platform selection (Instagram, Twitter, Facebook)
- URL validation and duplicate detection
- Success confirmation

### 2. Firebase Integration
- API routes connected to Firestore
- Automatic entry storage
- Duplicate prevention
- Engagement tracking

### 3. Admin Dashboard
- View all submissions
- Filter by challenge/status
- Verify and reward entries
- Real-time stats

### 4. Files Created
- `app/api/track-hashtag/route.ts` - Submission & retrieval API
- `app/api/verify-entry/route.ts` - Admin verification API
- `app/components/submit-challenge-entry.tsx` - User form
- `app/admin/challenges/page.tsx` - Admin dashboard
- `app/admin/layout.tsx` - Admin navigation
- `app/lib/hashtag-tracker.ts` - Utilities

## 🔧 Setup Instructions

### Step 1: Firebase Admin SDK Setup

1. **Go to Firebase Console**
   - Visit: https://console.firebase.google.com/
   - Select your project

2. **Generate Service Account Key**
   - Go to: Project Settings > Service Accounts
   - Click "Generate New Private Key"
   - Download the JSON file

3. **Extract Credentials**
   Open the downloaded JSON file and find:
   ```json
   {
     "project_id": "your-project-id",
     "private_key": "-----BEGIN PRIVATE KEY-----\n...",
     "client_email": "firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com"
   }
   ```

4. **Add to .env.local**
   ```bash
   # Copy these from the JSON file
   FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour key here\n-----END PRIVATE KEY-----\n"
   ```

   **Important**: Keep the quotes around FIREBASE_PRIVATE_KEY and include the \n characters

### Step 2: Firestore Database Setup

1. **Enable Firestore**
   - Go to: Firestore Database in Firebase Console
   - Click "Create Database"
   - Choose "Start in production mode"
   - Select your region

2. **Create Collection**
   - Collection name: `hashtag_entries`
   - No need to add documents manually (API will create them)

3. **Set Security Rules**
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       // Allow read access to all entries
       match /hashtag_entries/{entry} {
         allow read: if true;
         allow write: if false; // Only server can write
       }
     }
   }
   ```

### Step 3: Test the System

1. **Start Development Server**
   ```bash
   npm run dev
   ```

2. **Test User Submission**
   - Go to: http://localhost:3000
   - Scroll to "Viral Challenges"
   - Click "Join Challenge"
   - Fill form and submit
   - Check Firebase Console for new entry

3. **Test Admin Dashboard**
   - Go to: http://localhost:3000/admin/challenges
   - You should see all submissions
   - Try verifying an entry

### Step 4: Verify Everything Works

Check these URLs:
- ✅ Homepage: http://localhost:3000
- ✅ Challenges: http://localhost:3000 (scroll down)
- ✅ Admin: http://localhost:3000/admin/challenges
- ✅ API: http://localhost:3000/api/track-hashtag

## 📊 Database Structure

### Collection: `hashtag_entries`

```javascript
{
  id: "auto-generated",
  platform: "instagram",
  hashtag: "#InfyNovaUnboxChallenge",
  username: "@user123",
  postUrl: "https://instagram.com/p/xyz",
  mediaUrl: null,
  caption: null,
  timestamp: "2024-11-18T10:00:00Z",
  verified: false,
  rewarded: false,
  rewardAmount: 0,
  likes: 0,
  comments: 0,
  shares: 0,
  engagement: 0,
  createdAt: Timestamp,
  verifiedAt: null,
  rewardedAt: null,
  updatedAt: null
}
```

## 🎯 How to Use

### For Users:
1. Create content with hashtag
2. Post on social media
3. Visit your website
4. Click "Join Challenge"
5. Submit post URL
6. Wait for verification

### For Admins:
1. Go to `/admin/challenges`
2. Review submissions
3. Click "Verify & Reward" or "Reject"
4. Entry is updated in database
5. User gets notified (to be implemented)

## 🔐 Security Notes

### Current Status:
- ✅ Duplicate detection
- ✅ URL validation
- ✅ Server-side validation
- ⏳ Admin authentication (needs implementation)
- ⏳ Rate limiting (needs implementation)

### Add Admin Authentication:

Update `app/api/verify-entry/route.ts`:
```typescript
import { getServerSession } from "next-auth";

export async function POST(request: NextRequest) {
  // Check if user is admin
  const session = await getServerSession();
  if (!session?.user?.isAdmin) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }
  // ... rest of code
}
```

## 📧 Email Notifications (Optional)

### Using Resend:

1. **Install Resend**
   ```bash
   npm install resend
   ```

2. **Add to .env.local**
   ```bash
   RESEND_API_KEY=re_xxxxxxxxxxxxx
   ```

3. **Create Email Service**
   ```typescript
   // app/lib/email.ts
   import { Resend } from 'resend';
   
   const resend = new Resend(process.env.RESEND_API_KEY);
   
   export async function sendWinnerEmail(username: string, amount: number) {
     await resend.emails.send({
       from: 'InfyNova <noreply@infynova.in>',
       to: 'user@example.com',
       subject: 'Congratulations! You Won!',
       html: `<p>You won ₹${amount}!</p>`
     });
   }
   ```

4. **Call in verify-entry API**
   ```typescript
   if (updateData.rewarded) {
     await sendWinnerEmail(entry.username, reward);
   }
   ```

## 🚀 Production Deployment

### Environment Variables:
Make sure these are set in Vercel/production:
```bash
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@...
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."
```

### Vercel Deployment:
1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy

## 🐛 Troubleshooting

### Issue: "Failed to submit entry"
**Solution**: Check Firebase credentials in .env.local

### Issue: "Unauthorized" error
**Solution**: Verify FIREBASE_PRIVATE_KEY has proper formatting with \n

### Issue: Entries not showing in admin
**Solution**: Check Firestore security rules allow read access

### Issue: Duplicate entries
**Solution**: System prevents duplicates by postUrl

## 📈 Analytics & Tracking

### Track Submissions:
```typescript
// In submit-challenge-entry.tsx
import { trackEvent } from '@/lib/analytics';

trackEvent('challenge_submission', {
  challenge: hashtag,
  platform: platform
});
```

### Track Verifications:
```typescript
// In admin dashboard
trackEvent('entry_verified', {
  entryId: entryId,
  reward: reward
});
```

## 🎨 Customization

### Change Reward Amounts:
Edit `app/admin/challenges/page.tsx`:
```typescript
onClick={() => verifyEntry(entry.id, true, 50000)} // Change amount here
```

### Add More Challenges:
Edit `app/components/viral-challenges.tsx`:
```typescript
const challenges = [
  {
    id: 5,
    title: "#YourNewChallenge",
    description: "Your description",
    prize: "₹10,000",
    // ... rest of config
  }
];
```

### Customize Engagement Formula:
Edit `app/lib/hashtag-tracker.ts`:
```typescript
export const calculateEngagement = (entry: HashtagEntry): number => {
  return entry.likes + (entry.comments * 2) + (entry.shares * 3);
  // Adjust multipliers as needed
};
```

## 📱 Social Media API Integration (Advanced)

### Instagram Graph API:
```typescript
// app/lib/instagram.ts
export async function fetchInstagramPosts(hashtag: string) {
  const response = await fetch(
    `https://graph.instagram.com/ig_hashtag_search?user_id=${USER_ID}&q=${hashtag}&access_token=${ACCESS_TOKEN}`
  );
  return response.json();
}
```

### Twitter API v2:
```typescript
// app/lib/twitter.ts
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

## ✅ Testing Checklist

- [ ] User can submit entry
- [ ] Entry appears in Firebase
- [ ] Admin can see entry
- [ ] Admin can verify entry
- [ ] Admin can reject entry
- [ ] Duplicate detection works
- [ ] Stats update correctly
- [ ] Filters work properly
- [ ] Mobile responsive
- [ ] No console errors

## 🎉 You're Done!

Your hashtag tracking system is now fully functional!

**Test URLs:**
- User submission: http://localhost:3000
- Admin dashboard: http://localhost:3000/admin/challenges
- API endpoint: http://localhost:3000/api/track-hashtag

**Next Steps:**
1. Add admin authentication
2. Set up email notifications
3. Integrate payment processing
4. Add automated tracking (optional)

---

**Need Help?**
- Check Firebase Console for errors
- Review API logs in terminal
- Test with Postman
- Check browser console
