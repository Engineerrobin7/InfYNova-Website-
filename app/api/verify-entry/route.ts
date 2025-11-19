import { NextRequest, NextResponse } from 'next/server';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

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

// Admin endpoint to verify and approve entries
export async function POST(request: NextRequest) {
  try {
    // Check if Firebase is configured
    if (!db) {
      return NextResponse.json(
        { success: false, error: 'Database not configured' },
        { status: 503 }
      );
    }

    const body = await request.json();
    const { entryId, verified, reward, likes, comments, shares } = body;

    // TODO: Add admin authentication check here
    // const session = await getServerSession();
    // if (!session?.user?.isAdmin) {
    //   return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    // }

    if (!entryId) {
      return NextResponse.json(
        { success: false, error: 'Entry ID is required' },
        { status: 400 }
      );
    }

    // Calculate engagement
    const engagement = (likes || 0) + ((comments || 0) * 2) + ((shares || 0) * 3);

    // Update entry in Firestore
    const updateData: any = {
      verified: verified !== undefined ? verified : true,
      verifiedAt: new Date().toISOString(),
      updatedAt: new Date(),
    };

    // Update engagement metrics if provided
    if (likes !== undefined) updateData.likes = likes;
    if (comments !== undefined) updateData.comments = comments;
    if (shares !== undefined) updateData.shares = shares;
    if (engagement) updateData.engagement = engagement;

    // Update reward info if provided
    if (reward !== undefined) {
      updateData.rewarded = reward > 0;
      updateData.rewardAmount = reward;
      updateData.rewardedAt = new Date().toISOString();
    }

    await db.collection('hashtag_entries').doc(entryId).update(updateData);

    // Get updated entry
    const entryDoc = await db.collection('hashtag_entries').doc(entryId).get();
    const entry = { id: entryDoc.id, ...entryDoc.data() };

    // TODO: Send notification to user
    // if (updateData.rewarded) {
    //   await sendEmail({
    //     to: entry.email,
    //     subject: 'Congratulations! You won!',
    //     body: `You won ₹${reward} in the ${entry.hashtag} challenge!`
    //   });
    // }

    return NextResponse.json({ 
      success: true, 
      message: verified ? 'Entry verified successfully' : 'Entry rejected',
      entry
    });
  } catch (error: any) {
    console.error('Verify entry error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to verify entry' },
      { status: 500 }
    );
  }
}

// Get entry details
export async function GET(request: NextRequest) {
  try {
    // Check if Firebase is configured
    if (!db) {
      return NextResponse.json(
        { success: false, error: 'Database not configured' },
        { status: 503 }
      );
    }

    const { searchParams } = new URL(request.url);
    const entryId = searchParams.get('id');

    if (!entryId) {
      return NextResponse.json(
        { success: false, error: 'Entry ID is required' },
        { status: 400 }
      );
    }

    const entryDoc = await db.collection('hashtag_entries').doc(entryId).get();

    if (!entryDoc.exists) {
      return NextResponse.json(
        { success: false, error: 'Entry not found' },
        { status: 404 }
      );
    }

    const entry = { id: entryDoc.id, ...entryDoc.data() };

    return NextResponse.json({ success: true, entry });
  } catch (error: any) {
    console.error('Get entry error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to get entry' },
      { status: 500 }
    );
  }
}
