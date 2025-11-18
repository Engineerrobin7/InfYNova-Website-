import { NextRequest, NextResponse } from 'next/server';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin
if (!getApps().length) {
  try {
    initializeApp({
      credential: cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
  } catch (error) {
    console.error('Firebase admin initialization error:', error);
  }
}

const db = getFirestore();

// Submit new entry
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { platform, hashtag, username, postUrl, mediaUrl, caption } = body;

    // Validate required fields
    if (!platform || !hashtag || !username || !postUrl) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check for duplicate submission
    const existingEntry = await db
      .collection('hashtag_entries')
      .where('postUrl', '==', postUrl)
      .limit(1)
      .get();

    if (!existingEntry.empty) {
      return NextResponse.json(
        { success: false, error: 'This post has already been submitted' },
        { status: 400 }
      );
    }

    // Create entry
    const entry = {
      platform,
      hashtag,
      username,
      postUrl,
      mediaUrl: mediaUrl || null,
      caption: caption || null,
      timestamp: new Date().toISOString(),
      verified: false,
      rewarded: false,
      rewardAmount: 0,
      likes: 0,
      comments: 0,
      shares: 0,
      engagement: 0,
      createdAt: new Date(),
    };

    // Save to Firestore
    const docRef = await db.collection('hashtag_entries').add(entry);

    return NextResponse.json({ 
      success: true, 
      message: 'Entry submitted successfully! We will review it soon.',
      id: docRef.id,
      entry 
    });
  } catch (error: any) {
    console.error('Hashtag tracking error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to submit entry' },
      { status: 500 }
    );
  }
}

// Get all entries for a specific challenge
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const hashtag = searchParams.get('hashtag');
    const limitParam = parseInt(searchParams.get('limit') || '50');
    const verified = searchParams.get('verified');

    let query = db.collection('hashtag_entries').orderBy('timestamp', 'desc');

    // Filter by hashtag if provided
    if (hashtag) {
      query = query.where('hashtag', '==', hashtag) as any;
    }

    // Filter by verified status if provided
    if (verified !== null) {
      query = query.where('verified', '==', verified === 'true') as any;
    }

    // Apply limit
    query = query.limit(limitParam) as any;

    const snapshot = await query.get();
    const entries = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ success: true, entries, count: entries.length });
  } catch (error: any) {
    console.error('Fetch entries error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch entries' },
      { status: 500 }
    );
  }
}
