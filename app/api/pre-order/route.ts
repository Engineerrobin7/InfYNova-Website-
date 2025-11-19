import { NextRequest, NextResponse } from 'next/server';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { rateLimit, getClientIdentifier, RATE_LIMITS } from '@/app/lib/rate-limit';
import { verifyCaptcha, checkHoneypot } from '@/app/lib/captcha';

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

// Submit pre-order
export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const identifier = getClientIdentifier(request);
    const rateLimitResult = rateLimit(`preorder:${identifier}`, RATE_LIMITS.PRE_ORDER);

    if (!rateLimitResult.success) {
      const resetIn = Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000 / 60);
      return NextResponse.json(
        { success: false, error: `Too many requests. Please try again in ${resetIn} minutes.` },
        { status: 429 }
      );
    }

    // Check if Firebase is configured
    if (!db) {
      return NextResponse.json(
        { success: false, error: 'Database not configured. Please contact support.' },
        { status: 503 }
      );
    }

    const body = await request.json();
    const { name, email, phone, address, model, captchaToken, honeypot } = body;

    // Honeypot check
    if (!checkHoneypot(honeypot)) {
      return NextResponse.json(
        { success: false, error: 'Invalid submission' },
        { status: 400 }
      );
    }

    // CAPTCHA verification (if provided)
    if (captchaToken) {
      const isValidCaptcha = await verifyCaptcha(captchaToken);
      if (!isValidCaptcha) {
        return NextResponse.json(
          { success: false, error: 'Verification failed. Please try again.' },
          { status: 400 }
        );
      }
    }

    // Validate required fields
    if (!name || !email || !phone || !address || !model) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate phone format (basic)
    const phoneRegex = /^[\d\s\+\-\(\)]+$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { success: false, error: 'Invalid phone number format' },
        { status: 400 }
      );
    }

    // Check for duplicate pre-order (same email)
    const existingOrder = await db
      .collection('pre_orders')
      .where('email', '==', email.toLowerCase())
      .where('model', '==', model)
      .limit(1)
      .get();

    if (!existingOrder.empty) {
      return NextResponse.json(
        { success: false, error: 'You have already pre-ordered this model. Check your email for confirmation.' },
        { status: 400 }
      );
    }

    // Get model details
    const models: any = {
      base: {
        name: "InfYNova",
        price: 29999,
        discountPrice: 24999,
      },
      pro: {
        name: "InfYNova Pro",
        price: 44999,
        discountPrice: 39999,
      },
      ultra: {
        name: "InfYNova Ultra",
        price: 64999,
        discountPrice: 59999,
      }
    };

    const selectedModel = models[model] || models.pro;

    // Create pre-order entry
    const preOrder = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      address: address.trim(),
      model: model,
      modelName: selectedModel.name,
      price: selectedModel.discountPrice,
      originalPrice: selectedModel.price,
      status: 'pending', // pending, confirmed, shipped, delivered, cancelled
      paymentStatus: 'unpaid', // unpaid, paid, refunded
      orderNumber: `INF-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
      source: 'website',
      ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
    };

    // Save to Firestore
    const docRef = await db.collection('pre_orders').add(preOrder);

    // TODO: Send confirmation email
    // await sendPreOrderConfirmationEmail(email, preOrder);

    // TODO: Send notification to admin
    // await sendAdminNotification(preOrder);

    return NextResponse.json({ 
      success: true, 
      message: 'Pre-order submitted successfully! Check your email for confirmation.',
      orderId: docRef.id,
      orderNumber: preOrder.orderNumber,
      data: {
        name: preOrder.name,
        model: preOrder.modelName,
        price: preOrder.price,
      }
    });
  } catch (error: any) {
    console.error('Pre-order submission error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to submit pre-order. Please try again.' },
      { status: 500 }
    );
  }
}

// Get pre-order by email (for user to check status)
export async function GET(request: NextRequest) {
  try {
    // Check if Firebase is configured
    if (!db) {
      return NextResponse.json(
        { success: false, error: 'Database not configured', orders: [] },
        { status: 503 }
      );
    }

    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const orderNumber = searchParams.get('orderNumber');

    if (!email && !orderNumber) {
      return NextResponse.json(
        { success: false, error: 'Email or order number is required' },
        { status: 400 }
      );
    }

    let query = db.collection('pre_orders');

    if (email) {
      query = query.where('email', '==', email.toLowerCase());
    } else if (orderNumber) {
      query = query.where('orderNumber', '==', orderNumber.toUpperCase());
    }

    const snapshot = await query.orderBy('createdAt', 'desc').get();
    
    const orders = snapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || doc.data().createdAt,
      updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString() || doc.data().updatedAt,
    }));

    return NextResponse.json({ 
      success: true, 
      orders,
      count: orders.length 
    });
  } catch (error: any) {
    console.error('Get pre-orders error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}
