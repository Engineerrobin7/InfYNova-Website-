# Hashtag Tracking & Reward System Setup Guide

## Overview
This system allows users to participate in challenges by posting on social media with specific hashtags and automatically tracks their entries for rewards.

## How It Works

### User Flow
1. User sees challenge on website
2. Clicks "Join Challenge" button
3. Creates content (video/photo) with the hashtag
4. Posts on Instagram/Twitter/Facebook
5. Submits their post URL through the modal
6. Admin reviews and verifies entry
7. Winner gets notified and rewarded

### Admin Flow
1. Monitor submissions in admin dashboard
2. Verify posts are legitimate
3. Check engagement metrics
4. Select winners based on criteria
5. Process rewards
6. Announce winners

## Files Created

### API Routes
1. **`app/api/track-hashtag/route.ts`**
   - POST: Submit new entry
   - GET: Fetch entries for a challenge

2. **`app/api/verify-entry/route.ts`**
   - POST: Admin endpoint to verify and reward entries

### Components
1. **`app/components/submit-challenge-entry.tsx`**
   - Modal form for users to submit their posts
   - Platform selection (Instagram, Twitter, Facebook)
   - URL validation

2. **`app/components/viral-challenges.tsx`** (Updated)
   - Added submission modal
   - Click "Join Challenge" to open form

### Utilities
1. **`app/lib/hashtag-tracker.ts`**
   - Engagement calculation
   - Entry validation
   - Leaderboard generation
   - API integration helpers

## Setup Instructions

### 1. Firebase/Database Setup

Add to your Firestore database:

```javascript
// Collection: hashtag_entries
{
  id: "auto-generated",
  platform: "instagram",
  hashtag: "#InfyNovaUnboxChallenge",
  username: "@user123",
  postUrl: "https://instagram.com/p/xyz",
  mediaUrl: "https://...",
  caption: "Check out my unboxing...",
  timestamp: "2024-11-18T10:00:00Z",
  verified: false,
  rewarded: false,
  rewardAmount: 0,
  likes: 150,
  comments: 25,
  shares: 10,
  engagement: 235
}

// Collection: challenges
{
  id: 1,
  hashtag: "#InfyNovaUnboxChallenge",
  title: "Unbox Challenge",
  prizeAmount: 50000,
  startDate: "2024-11-01",
  endDate: "2024-12-01",
  active: true,
  minEngagement: 100,
  rules: [...]
}
```

### 2. Social Media API Setup (Optional - For Automation)

#### Instagram Graph API
1. Create Facebook Developer account
2. Create an app
3. Get Instagram Business Account
4. Request permissions: `instagram_basic`, `instagram_manage_insights`
5. Get access token

```bash
# Add to .env.local
INSTAGRAM_ACCESS_TOKEN=your_token_here
INSTAGRAM_USER_ID=your_user_id
```

#### Twitter API v2
1. Create Twitter Developer account
2. Create a project and app
3. Get Bearer Token
4. Enable OAuth 2.0

```bash
# Add to .env.local
TWITTER_BEARER_TOKEN=your_bearer_token
```

### 3. Implement Firebase Integration

Update `app/api/track-hashtag/route.ts`:

```typescript
import { db } from '@/lib/firebase/config';
import { collection, addDoc, query, where, getDocs, orderBy, limit } from 'firebase/firestore';

export async function POST(request: NextRequest) {
  const body = await request.json();
  
  // Save to Firestore
  const docRef = await addDoc(collection(db, 'hashtag_entries'), {
    ...body,
    timestamp: new Date().toISOString(),
    verified: false,
    rewarded: false,
  });

  return NextResponse.json({ success: true, id: docRef.id });
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const hashtag = searchParams.get('hashtag');
  
  const q = query(
    collection(db, 'hashtag_entries'),
    where('hashtag', '==', hashtag),
    orderBy('timestamp', 'desc'),
    limit(50)
  );
  
  const snapshot = await getDocs(q);
  const entries = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
  return NextResponse.json({ success: true, entries });
}
```

### 4. Create Admin Dashboard

Create `app/admin/challenges/page.tsx`:

```typescript
"use client";

import { useState, useEffect } from "react";
import { getChallengeEntries } from "@/app/lib/hashtag-tracker";

export default function AdminChallenges() {
  const [entries, setEntries] = useState([]);
  
  useEffect(() => {
    loadEntries();
  }, []);
  
  const loadEntries = async () => {
    const data = await getChallengeEntries('#InfyNovaUnboxChallenge');
    setEntries(data);
  };
  
  const verifyEntry = async (entryId: string, reward: number) => {
    await fetch('/api/verify-entry', {
      method: 'POST',
      body: JSON.stringify({ entryId, verified: true, reward })
    });
    loadEntries();
  };
  
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Challenge Entries</h1>
      
      <div className="space-y-4">
        {entries.map((entry: any) => (
          <div key={entry.id} className="border p-4 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-bold">{entry.username}</p>
                <p className="text-sm text-muted-foreground">{entry.platform}</p>
                <a href={entry.postUrl} target="_blank" className="text-primary text-sm">
                  View Post →
                </a>
              </div>
              <div className="text-right">
                <p className="text-sm">Engagement: {entry.engagement || 0}</p>
                {!entry.verified && (
                  <button
                    onClick={() => verifyEntry(entry.id, 50000)}
                    className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
                  >
                    Verify & Reward
                  </button>
                )}
                {entry.verified && (
                  <span className="text-green-500">✓ Verified</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## Automated Tracking (Advanced)

### Option 1: Webhook-based (Recommended)
Set up webhooks from social media platforms to automatically receive new posts.

### Option 2: Scheduled Scraping
Use cron jobs to periodically check for new posts:

```typescript
// app/api/cron/track-hashtags/route.ts
export async function GET() {
  const hashtags = ['#InfyNovaUnboxChallenge', '#NovaOSDanceChallenge'];
  
  for (const hashtag of hashtags) {
    // Fetch from Instagram API
    const posts = await trackInstagramHashtag(hashtag, process.env.INSTAGRAM_ACCESS_TOKEN!);
    
    // Save to database
    for (const post of posts) {
      await saveEntry(post);
    }
  }
  
  return NextResponse.json({ success: true });
}
```

Set up Vercel Cron:
```json
// vercel.json
{
  "crons": [{
    "path": "/api/cron/track-hashtags",
    "schedule": "0 */6 * * *"
  }]
}
```

## Reward Processing

### Manual Rewards
1. Admin verifies entry
2. Admin marks as rewarded
3. Send email notification
4. Process payment/prize

### Automated Rewards
```typescript
const processReward = async (entry: HashtagEntry, amount: number) => {
  // 1. Update database
  await updateEntry(entry.id, { rewarded: true, rewardAmount: amount });
  
  // 2. Send email
  await sendEmail({
    to: entry.email,
    subject: 'Congratulations! You won!',
    body: `You won ₹${amount} in the ${entry.hashtag} challenge!`
  });
  
  // 3. Process payment (integrate with payment gateway)
  // await processPayment(entry.userId, amount);
  
  // 4. Post announcement
  // await postToSocialMedia(`Congratulations to ${entry.username}!`);
};
```

## Testing

### Test the submission flow:
1. Go to homepage
2. Scroll to Viral Challenges section
3. Click "Join Challenge"
4. Fill in the form
5. Submit

### Test the API:
```bash
# Submit entry
curl -X POST http://localhost:3000/api/track-hashtag \
  -H "Content-Type: application/json" \
  -d '{
    "platform": "instagram",
    "hashtag": "#InfyNovaUnboxChallenge",
    "username": "@testuser",
    "postUrl": "https://instagram.com/p/test",
    "timestamp": "2024-11-18T10:00:00Z",
    "likes": 100,
    "comments": 20,
    "shares": 5
  }'

# Get entries
curl http://localhost:3000/api/track-hashtag?hashtag=%23InfyNovaUnboxChallenge
```

## Security Considerations

1. **Rate Limiting**: Prevent spam submissions
2. **Authentication**: Protect admin endpoints
3. **Validation**: Verify post URLs are real
4. **Duplicate Detection**: Prevent multiple submissions of same post
5. **Fraud Prevention**: Check for fake engagement

## Next Steps

1. ✅ Basic submission form (Done)
2. ⏳ Connect to Firebase
3. ⏳ Create admin dashboard
4. ⏳ Set up social media APIs
5. ⏳ Implement automated tracking
6. ⏳ Add email notifications
7. ⏳ Integrate payment processing

## Support

For questions or issues:
- Check Firebase console for errors
- Review API logs in Vercel
- Test with Postman/curl
- Check browser console for client errors

---

**Status**: Basic system implemented, ready for Firebase integration
**Next**: Connect to Firebase and create admin dashboard
