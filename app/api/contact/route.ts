import { NextRequest, NextResponse } from 'next/server';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { rateLimit, getClientIdentifier, RATE_LIMITS } from '@/app/lib/rate-limit';
import { verifyCaptcha, checkHoneypot } from '@/app/lib/captcha';

// Initialize Firebase Admin
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

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const identifier = getClientIdentifier(request);
    const rateLimitResult = rateLimit(`contact:${identifier}`, RATE_LIMITS.CONTACT);

    if (!rateLimitResult.success) {
      const resetIn = Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000 / 60);
      return NextResponse.json(
        { 
          success: false, 
          error: `Too many requests. Please try again in ${resetIn} minutes.` 
        },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
          }
        }
      );
    }

    const body = await request.json();
    const { name, email, phone, subject, message, captchaToken, honeypot } = body;

    // Honeypot check (bot protection)
    if (!checkHoneypot(honeypot)) {
      return NextResponse.json(
        { success: false, error: 'Invalid submission' },
        { status: 400 }
      );
    }

    // CAPTCHA verification
    if (captchaToken) {
      const isValidCaptcha = await verifyCaptcha(captchaToken);
      if (!isValidCaptcha) {
        return NextResponse.json(
          { success: false, error: 'CAPTCHA verification failed. Please try again.' },
          { status: 400 }
        );
      }
    }

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: 'All fields except phone are required' },
        { status: 400 }
      );
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check if Firebase is configured
    if (!db) {
      return NextResponse.json(
        { success: false, error: 'Service temporarily unavailable. Please try again later.' },
        { status: 503 }
      );
    }

    // Save to Firestore
    const contactSubmission = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone?.trim() || null,
      subject: subject.trim(),
      message: message.trim(),
      status: 'new',
      read: false,
      replied: false,
      createdAt: new Date(),
      ipAddress: identifier,
      userAgent: request.headers.get('user-agent') || 'unknown',
    };

    const docRef = await db.collection('contact_submissions').add(contactSubmission);

    // TODO: Send confirmation email to user
    // TODO: Send notification to admin

    return NextResponse.json({
      success: true,
      message: 'Thank you for contacting us! We will get back to you soon.',
      id: docRef.id,
    }, {
      headers: {
        'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
        'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
      }
    });
  } catch (error: any) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit. Please try again later.' },
      { status: 500 }
    );
  }
}
