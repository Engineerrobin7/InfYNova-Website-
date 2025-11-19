// Google reCAPTCHA v3 verification
// For v2, you can use a different approach

export async function verifyCaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    console.warn('RECAPTCHA_SECRET_KEY not configured');
    // In development, allow without captcha
    return process.env.NODE_ENV === 'development';
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${token}`,
    });

    const data = await response.json();

    // For reCAPTCHA v3, check score (0.0 - 1.0)
    // 0.0 is very likely a bot, 1.0 is very likely a human
    if (data.success && data.score) {
      return data.score >= 0.5; // Adjust threshold as needed
    }

    // For reCAPTCHA v2, just check success
    return data.success === true;
  } catch (error) {
    console.error('CAPTCHA verification error:', error);
    return false;
  }
}

// Simple honeypot field check (additional bot protection)
export function checkHoneypot(honeypotValue: string | undefined): boolean {
  // Honeypot should be empty (bots usually fill all fields)
  return !honeypotValue || honeypotValue.trim() === '';
}

// Time-based check (form should take at least X seconds to fill)
export function checkFormTiming(startTime: number, minSeconds: number = 3): boolean {
  const elapsed = (Date.now() - startTime) / 1000;
  return elapsed >= minSeconds;
}
