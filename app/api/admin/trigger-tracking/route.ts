import { NextRequest, NextResponse } from 'next/server';
import { rateLimit, getClientIdentifier, RATE_LIMITS } from '@/app/lib/rate-limit';

// Manual trigger for hashtag tracking (for testing)
export async function POST(request: NextRequest) {
  try {
    // Rate limiting (for admin actions)
    const identifier = getClientIdentifier(request);
    const rateLimitResult = rateLimit(`admin:${identifier}`, RATE_LIMITS.API);

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // TODO: Add admin authentication here
    
    // Call the cron endpoint
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const cronSecret = process.env.CRON_SECRET || 'dev-secret';
    
    const response = await fetch(`${baseUrl}/api/cron/track-hashtags`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${cronSecret}`,
      },
    });

    const data = await response.json();

    return NextResponse.json({
      success: true,
      message: 'Tracking triggered successfully',
      data,
    });
  } catch (error: any) {
    console.error('Trigger tracking error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
