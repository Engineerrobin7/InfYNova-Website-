import { NextRequest, NextResponse } from "next/server";
import { rateLimit, getClientIdentifier, RATE_LIMITS } from '@/app/lib/rate-limit';
import { verifyCaptcha, checkHoneypot } from '@/app/lib/captcha';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

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
    const rateLimitResult = rateLimit(`newsletter:${identifier}`, RATE_LIMITS.NEWSLETTER);

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
    const { email, captchaToken, honeypot } = body;

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

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Save to Firestore if configured
    if (db) {
      try {
        // Check if email already exists
        const existingSubscriber = await db
          .collection('newsletter_subscribers')
          .where('email', '==', email.toLowerCase().trim())
          .limit(1)
          .get();

        if (!existingSubscriber.empty) {
          return NextResponse.json(
            { success: false, error: 'Email already subscribed' },
            { status: 400 }
          );
        }

        // Add new subscriber
        await db.collection('newsletter_subscribers').add({
          email: email.toLowerCase().trim(),
          subscribedAt: new Date(),
          ipAddress: identifier,
          userAgent: request.headers.get('user-agent') || 'unknown',
          status: 'active',
        });
      } catch (dbError) {
        console.error('Database error:', dbError);
        // Continue even if database fails
      }
    }

    // TODO: Integrate with your email service
    // Example integrations:
    // - Mailchimp: https://mailchimp.com/developer/
    // - SendGrid: https://docs.sendgrid.com/
    // - ConvertKit: https://developers.convertkit.com/
    
    console.log("Newsletter signup:", email);

    return NextResponse.json(
      { 
        success: true,
        message: "Successfully subscribed" 
      },
      { 
        status: 200,
        headers: {
          'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
          'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
        }
      }
    );
  } catch (error) {
    console.error("Newsletter signup error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to subscribe" },
      { status: 500 }
    );
  }
}
