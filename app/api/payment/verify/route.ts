import { NextRequest, NextResponse } from 'next/server';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import crypto from 'crypto';
import { sendPaymentSuccessEmail } from '@/app/lib/email';

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
    console.error('Firebase admin init error:', error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      preOrderId,
      email,
      name,
      modelName,
      price,
    } = body;

    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature || !preOrderId) {
      return NextResponse.json({ success: false, error: 'Missing payment verification data.' }, { status: 400 });
    }

    if (!process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json({ success: false, error: 'Payment gateway secret not configured.' }, { status: 503 });
    }

    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (generatedSignature !== razorpay_signature) {
      return NextResponse.json({ success: false, error: 'Payment signature verification failed.' }, { status: 400 });
    }

    if (!db) {
      return NextResponse.json({ success: false, error: 'Database service unavailable.' }, { status: 503 });
    }

    const orderRef = db.collection('pre_orders').doc(preOrderId);
    const orderSnapshot = await orderRef.get();

    if (!orderSnapshot.exists) {
      return NextResponse.json({ success: false, error: 'Pre-order not found.' }, { status: 404 });
    }

    await orderRef.update({
      paymentStatus: 'paid',
      status: 'confirmed',
      paymentDetails: {
        razorpayPaymentId: razorpay_payment_id,
        razorpayOrderId: razorpay_order_id,
        razorpaySignature: razorpay_signature,
        verifiedAt: new Date(),
      },
      updatedAt: new Date(),
    });

    if (email && name && modelName && price) {
      try {
        await sendPaymentSuccessEmail(email, { name, orderNumber: razorpay_order_id, modelName, price });
      } catch (notificationError) {
        console.error('Payment confirmation email failed:', notificationError);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to verify payment.' },
      { status: 500 }
    );
  }
}
