import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, currency = 'INR', receipt, name, email, contact, notes } = body;

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json(
        { success: false, error: 'Payment gateway not configured.' },
        { status: 503 }
      );
    }

    if (!amount || !receipt) {
      return NextResponse.json(
        { success: false, error: 'Missing required payment information.' },
        { status: 400 }
      );
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const order = await razorpay.orders.create({
      amount: Math.round(Number(amount) * 100),
      currency,
      receipt,
      payment_capture: true,
      notes: {
        customer_name: name || '',
        customer_email: email || '',
        customer_contact: contact || '',
        ...(notes || {}),
      },
    });

    return NextResponse.json({ success: true, order });
  } catch (error: any) {
    console.error('Razorpay create order error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create payment order.' },
      { status: 500 }
    );
  }
}
