import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // TODO: Integrate with your email service
    // Example integrations:
    // - Mailchimp: https://mailchimp.com/developer/
    // - SendGrid: https://docs.sendgrid.com/
    // - ConvertKit: https://developers.convertkit.com/
    
    // For now, just log it (replace with actual integration)
    console.log("Newsletter signup:", email);

    // You can also save to Firebase/database
    // await db.collection('newsletter').add({
    //   email,
    //   subscribedAt: new Date(),
    // });

    return NextResponse.json(
      { message: "Successfully subscribed" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Newsletter signup error:", error);
    return NextResponse.json(
      { error: "Failed to subscribe" },
      { status: 500 }
    );
  }
}
