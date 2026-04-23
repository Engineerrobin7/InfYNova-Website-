import nodemailer from 'nodemailer';

interface EmailConfig {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const SMTP_FROM = process.env.SMTP_FROM || 'InfyNova <noreply@infynova.in>';

async function sendSmtpEmail(config: EmailConfig): Promise<boolean> {
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    return false;
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: config.from || SMTP_FROM,
      to: config.to,
      subject: config.subject,
      html: config.html,
    });
    return true;
  } catch (error) {
    console.error('SMTP email send error:', error);
    return false;
  }
}

async function sendResendEmail(config: EmailConfig): Promise<boolean> {
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
        from: config.from || SMTP_FROM,
        to: config.to,
        subject: config.subject,
        html: config.html,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Resend email send error:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Resend email send error:', error);
    return false;
  }
}

export async function sendEmail(config: EmailConfig): Promise<boolean> {
  if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
    const success = await sendSmtpEmail(config);
    if (success) return true;
    console.warn('SMTP email failed; falling back to Resend if available.');
  }

  return await sendResendEmail(config);
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
    <body style="font-family: Arial, sans-serif; color: #111; background: #f8f9fb; padding: 20px;">
      <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 18px; overflow: hidden; box-shadow: 0 24px 80px rgba(0,0,0,0.08);">
        <div style="background: linear-gradient(135deg, #00d4ff 0%, #005f73 100%); color: #fff; padding: 24px; text-align: center;">
          <h2 style="margin: 0; font-size: 24px;">New Contact Form Submission</h2>
        </div>
        <div style="padding: 24px;">
          <p><strong>From:</strong> ${contactData.name}</p>
          <p><strong>Email:</strong> ${contactData.email}</p>
          <p><strong>Subject:</strong> ${contactData.subject}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${contactData.message.replace(/\n/g, '<br>')}</p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
          <p style="font-size: 13px; color: #6b7280;">Submitted at: ${new Date().toLocaleString()}</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return await sendEmail({
    to: adminEmail,
    subject: `Contact Form: ${contactData.subject}`,
    html,
  });
}

export async function sendContactConfirmation(
  email: string,
  name: string
): Promise<boolean> {
  const html = `
    <!DOCTYPE html>
    <html>
    <body style="font-family: Arial, sans-serif; color: #111; background: #f7fafc; padding: 20px;">
      <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 18px; overflow: hidden; box-shadow: 0 24px 80px rgba(0,0,0,0.08);">
        <div style="background: linear-gradient(135deg, #00d4ff 0%, #005f73 100%); color: #fff; padding: 24px; text-align: center;">
          <h2 style="margin: 0; font-size: 24px;">Thanks for reaching out, ${name}!</h2>
        </div>
        <div style="padding: 24px;">
          <p>We received your message and will reply within 24 hours.</p>
          <p>If you need urgent support, please email us at <a href="mailto:infynovaindia@gmail.com">infynovaindia@gmail.com</a>.</p>
          <p>Thank you for choosing InfYNova.</p>
          <div style="margin-top: 24px; padding: 16px; border: 1px solid #e5e7eb; border-radius: 12px; background: #f8fafc;">
            <p style="margin: 0; font-weight: 600;">Support Team</p>
            <p style="margin: 4px 0 0 0; color: #6b7280;">InfYNova India</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  return await sendEmail({
    to: email,
    subject: 'We received your request – InfYNova Support',
    html,
  });
}

export async function sendPaymentSuccessEmail(
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
    <body style="font-family: Arial, sans-serif; color: #111; background: #f7fafc; padding: 20px;">
      <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 18px; overflow: hidden; box-shadow: 0 24px 80px rgba(0,0,0,0.08);">
        <div style="background: linear-gradient(135deg, #00d4ff 0%, #005f73 100%); color: #fff; padding: 24px; text-align: center;">
          <h2 style="margin: 0; font-size: 24px;">Payment Received</h2>
        </div>
        <div style="padding: 24px;">
          <p>Thank you for your payment, ${orderData.name}.</p>
          <p>Your payment for the <strong>${orderData.modelName}</strong> has been confirmed.</p>
          <div style="margin: 24px 0; padding: 20px; border-radius: 14px; background: #f8fafc; border: 1px solid #e5e7eb;">
            <p style="margin: 0; font-weight: 600;">Order Number</p>
            <p style="margin: 6px 0 0 0;">${orderData.orderNumber}</p>
            <p style="margin: 16px 0 0 0; font-weight: 600;">Amount Paid</p>
            <p style="margin: 6px 0 0 0;">₹${orderData.price.toLocaleString()}</p>
          </div>
          <p>We’ll update you with shipping details shortly. If you have questions, reply to this email any time.</p>
          <p>Warm regards,<br>The InfYNova Team</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return await sendEmail({
    to: email,
    subject: `Payment Confirmed – ${orderData.orderNumber}`,
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
