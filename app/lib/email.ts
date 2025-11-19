// Email notification system using Resend
// Install: npm install resend

interface EmailConfig {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

// Send email using Resend (recommended for Next.js)
export async function sendEmail(config: EmailConfig): Promise<boolean> {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;

  if (!RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not configured. Email not sent.');
    return false;
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: config.from || 'InfyNova <noreply@infynova.in>',
        to: config.to,
        subject: config.subject,
        html: config.html,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Email send error:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Email send error:', error);
    return false;
  }
}

// Pre-order confirmation email
export async function sendPreOrderConfirmation(
  email: string,
  orderData: {
    name: string;
    orderNumber: string;
    modelName: string;
    price: number;
  }
): Promise<boolean> {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #00d4ff 0%, #ff00ff 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .order-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .button { display: inline-block; background: linear-gradient(135deg, #00d4ff 0%, #ff00ff 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
        .footer { text-align: center; color: #666; font-size: 12px; margin-top: 30px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Pre-Order Confirmed!</h1>
        </div>
        <div class="content">
          <p>Hi ${orderData.name},</p>
          <p>Thank you for pre-ordering the <strong>${orderData.modelName}</strong>!</p>
          
          <div class="order-details">
            <h3>Order Details:</h3>
            <p><strong>Order Number:</strong> ${orderData.orderNumber}</p>
            <p><strong>Model:</strong> ${orderData.modelName}</p>
            <p><strong>Price:</strong> ₹${orderData.price.toLocaleString()}</p>
            <p><strong>Status:</strong> Confirmed ✅</p>
          </div>

          <p>We'll contact you soon with the next steps. You'll receive:</p>
          <ul>
            <li>Payment link before delivery</li>
            <li>Estimated delivery date</li>
            <li>Tracking information</li>
          </ul>

          <a href="https://infynova.in/dashboard" class="button">View Order Status</a>

          <p>If you have any questions, reply to this email or contact us at:</p>
          <p>📧 infynovaindia@gmail.com<br>📞 +91 9896583808</p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} InfyNova. All rights reserved.</p>
          <p>Made in India 🇮🇳</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return await sendEmail({
    to: email,
    subject: `Pre-Order Confirmation - ${orderData.orderNumber}`,
    html,
  });
}

// Contact form notification to admin
export async function sendContactNotification(
  contactData: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }
): Promise<boolean> {
  const adminEmail = process.env.ADMIN_EMAIL || 'infynovaindia@gmail.com';

  const html = `
    <!DOCTYPE html>
    <html>
    <body style="font-family: Arial, sans-serif;">
      <h2>New Contact Form Submission</h2>
      <p><strong>From:</strong> ${contactData.name}</p>
      <p><strong>Email:</strong> ${contactData.email}</p>
      <p><strong>Subject:</strong> ${contactData.subject}</p>
      <p><strong>Message:</strong></p>
      <p>${contactData.message.replace(/\n/g, '<br>')}</p>
      <hr>
      <p><small>Submitted at: ${new Date().toLocaleString()}</small></p>
    </body>
    </html>
  `;

  return await sendEmail({
    to: adminEmail,
    subject: `Contact Form: ${contactData.subject}`,
    html,
  });
}

// Challenge winner notification
export async function sendWinnerNotification(
  email: string,
  winnerData: {
    username: string;
    challengeName: string;
    prize: string;
    rewardAmount: number;
  }
): Promise<boolean> {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .prize { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; font-size: 24px; font-weight: bold; color: #FFD700; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🏆 Congratulations! You Won!</h1>
        </div>
        <div class="content">
          <p>Hi ${winnerData.username},</p>
          <p>Congratulations! You're a winner of the <strong>${winnerData.challengeName}</strong>!</p>
          
          <div class="prize">
            🎉 ${winnerData.prize} 🎉
          </div>

          <p>We'll contact you within 24 hours to process your reward of <strong>₹${winnerData.rewardAmount.toLocaleString()}</strong>.</p>

          <p><strong>Next Steps:</strong></p>
          <ol>
            <li>Reply to this email with your bank details (for cash prizes)</li>
            <li>Or provide your shipping address (for product prizes)</li>
            <li>We'll process your reward within 7 business days</li>
          </ol>

          <p>Thank you for participating!</p>
          <p>The InfyNova Team</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return await sendEmail({
    to: email,
    subject: `🏆 You Won! ${winnerData.challengeName}`,
    html,
  });
}

// Newsletter welcome email
export async function sendNewsletterWelcome(email: string): Promise<boolean> {
  const html = `
    <!DOCTYPE html>
    <html>
    <body style="font-family: Arial, sans-serif; padding: 20px;">
      <h2>Welcome to InfyNova! 🎉</h2>
      <p>Thank you for subscribing to our newsletter!</p>
      <p>You'll be the first to know about:</p>
      <ul>
        <li>Product launches and updates</li>
        <li>Exclusive offers and discounts</li>
        <li>Tech insights and news</li>
        <li>Community events and challenges</li>
      </ul>
      <p>Stay tuned for exciting updates!</p>
      <p>Best regards,<br>The InfyNova Team</p>
    </body>
    </html>
  `;

  return await sendEmail({
    to: email,
    subject: 'Welcome to InfyNova! 🚀',
    html,
  });
}
