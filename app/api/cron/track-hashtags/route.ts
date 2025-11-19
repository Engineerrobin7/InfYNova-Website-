import { NextRequest, NextResponse } from 'next/server';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { trackInstagramHashtags } from '@/app/lib/instagram-api';
import { trackTwitterHashtags, getTweetUrl, calculateTwitterEngagement } from '@/app/lib/twitter-api';

// Initialize Firebase Admin only if credentials are available
let db: any = null;

if (!getApps().length && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
  try {
    initializeApp({
      credential: cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
    db = getFirestore();
  } catch (error) {
    console.error('Firebase admin initialization error:', error);
  }
}

// Hashtags to track
const HASHTAGS = [
  '#InfyNovaUnboxChallenge',
  '#NovaOSDanceChallenge',
  '#AIPhoneArtChallenge',
  '#InfyNovaMemeChallenge',
];

export async function GET(request: NextRequest) {
  try {
    // Check if Firebase is configured
    if (!db) {
      return NextResponse.json(
        { success: false, error: 'Database not configured' },
        { status: 503 }
      );
    }

    // Verify cron secret for security
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;
    
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const results = {
      instagram: { tracked: 0, new: 0, errors: 0 },
      twitter: { tracked: 0, new: 0, errors: 0 },
      timestamp: new Date().toISOString(),
    };

    // Track Instagram
    if (process.env.INSTAGRAM_ACCESS_TOKEN) {
      try {
        console.log('Tracking Instagram hashtags...');
        const instagramPosts = await trackInstagramHashtags(HASHTAGS);
        results.instagram.tracked = instagramPosts.length;

        // Save to Firestore
        for (const post of instagramPosts) {
          try {
            // Check if already exists
            const existing = await db
              .collection('hashtag_entries')
              .where('postUrl', '==', post.permalink)
              .limit(1)
              .get();

            if (existing.empty) {
              // Find which hashtag this post contains
              const matchedHashtag = HASHTAGS.find(tag => 
                post.caption?.toLowerCase().includes(tag.toLowerCase())
              );

              await db.collection('hashtag_entries').add({
                platform: 'instagram',
                hashtag: matchedHashtag || HASHTAGS[0],
                username: `@${post.username}`,
                postUrl: post.permalink,
                mediaUrl: post.media_url,
                caption: post.caption,
                timestamp: post.timestamp,
                verified: false,
                rewarded: false,
                rewardAmount: 0,
                likes: post.like_count || 0,
                comments: post.comments_count || 0,
                shares: 0,
                engagement: (post.like_count || 0) + ((post.comments_count || 0) * 2),
                createdAt: new Date(),
                source: 'auto-tracked',
              });

              results.instagram.new++;
            }
          } catch (error) {
            console.error('Error saving Instagram post:', error);
            results.instagram.errors++;
          }
        }

        console.log(`Instagram: ${results.instagram.new} new posts saved`);
      } catch (error) {
        console.error('Instagram tracking error:', error);
        results.instagram.errors++;
      }
    } else {
      console.log('Instagram API not configured');
    }

    // Track Twitter
    if (process.env.TWITTER_BEARER_TOKEN) {
      try {
        console.log('Tracking Twitter hashtags...');
        const { tweets, users } = await trackTwitterHashtags(HASHTAGS);
        results.twitter.tracked = tweets.length;

        // Save to Firestore
        for (const tweet of tweets) {
          try {
            const user = users.get(tweet.author_id);
            if (!user) continue;

            const tweetUrl = getTweetUrl(user.username, tweet.id);

            // Check if already exists
            const existing = await db
              .collection('hashtag_entries')
              .where('postUrl', '==', tweetUrl)
              .limit(1)
              .get();

            if (existing.empty) {
              // Find which hashtag this tweet contains
              const matchedHashtag = HASHTAGS.find(tag => 
                tweet.text.toLowerCase().includes(tag.toLowerCase())
              );

              const engagement = calculateTwitterEngagement(tweet.public_metrics);

              await db.collection('hashtag_entries').add({
                platform: 'twitter',
                hashtag: matchedHashtag || HASHTAGS[0],
                username: `@${user.username}`,
                postUrl: tweetUrl,
                mediaUrl: null,
                caption: tweet.text,
                timestamp: tweet.created_at,
                verified: false,
                rewarded: false,
                rewardAmount: 0,
                likes: tweet.public_metrics.like_count,
                comments: tweet.public_metrics.reply_count,
                shares: tweet.public_metrics.retweet_count + tweet.public_metrics.quote_count,
                engagement: engagement,
                createdAt: new Date(),
                source: 'auto-tracked',
              });

              results.twitter.new++;
            }
          } catch (error) {
            console.error('Error saving Twitter post:', error);
            results.twitter.errors++;
          }
        }

        console.log(`Twitter: ${results.twitter.new} new posts saved`);
      } catch (error) {
        console.error('Twitter tracking error:', error);
        results.twitter.errors++;
      }
    } else {
      console.log('Twitter API not configured');
    }

    // Log tracking run
    await db.collection('tracking_logs').add({
      timestamp: new Date().toISOString(),
      results,
      createdAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      message: 'Hashtag tracking completed',
      results,
    });
  } catch (error: any) {
    console.error('Cron job error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
