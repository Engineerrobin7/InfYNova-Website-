// Analytics tracking functions

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    clarity?: (...args: any[]) => void;
  }
}

// Track page views
export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID || 'G-E0Y5RMLEKL', {
      page_path: url,
    });
  }
};

// Track sign-ups
export const trackSignUp = (method: 'email' | 'google') => {
  if (typeof window !== 'undefined') {
    // Google Analytics
    if (window.gtag) {
      window.gtag('event', 'sign_up', {
        method: method,
        event_category: 'engagement',
        event_label: `Sign up with ${method}`,
      });
    }

    // Microsoft Clarity
    if (window.clarity) {
      window.clarity('event', 'sign_up', { method });
    }

    console.log('📊 Tracked sign-up:', method);
  }
};

// Track sign-ins
export const trackSignIn = (method: 'email' | 'google') => {
  if (typeof window !== 'undefined') {
    if (window.gtag) {
      window.gtag('event', 'login', {
        method: method,
        event_category: 'engagement',
        event_label: `Sign in with ${method}`,
      });
    }

    if (window.clarity) {
      window.clarity('event', 'sign_in', { method });
    }

    console.log('📊 Tracked sign-in:', method);
  }
};

// Track newsletter subscription
export const trackNewsletterSubscription = (email: string) => {
  if (typeof window !== 'undefined') {
    if (window.gtag) {
      window.gtag('event', 'newsletter_subscription', {
        event_category: 'engagement',
        event_label: 'Newsletter signup',
        value: 1,
      });
    }

    if (window.clarity) {
      window.clarity('event', 'newsletter_subscription');
    }

    console.log('📊 Tracked newsletter subscription');
  }
};

// Track contact form submission
export const trackContactFormSubmission = (subject: string) => {
  if (typeof window !== 'undefined') {
    if (window.gtag) {
      window.gtag('event', 'contact_form_submission', {
        event_category: 'engagement',
        event_label: subject,
        value: 1,
      });
    }

    if (window.clarity) {
      window.clarity('event', 'contact_form', { subject });
    }

    console.log('📊 Tracked contact form:', subject);
  }
};

// Track button clicks
export const trackButtonClick = (buttonName: string, location: string) => {
  if (typeof window !== 'undefined') {
    if (window.gtag) {
      window.gtag('event', 'button_click', {
        event_category: 'engagement',
        event_label: `${buttonName} - ${location}`,
      });
    }

    if (window.clarity) {
      window.clarity('event', 'button_click', { button: buttonName, location });
    }
  }
};

// Track page engagement time
export const trackEngagementTime = (pageName: string, seconds: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'engagement_time', {
      event_category: 'engagement',
      event_label: pageName,
      value: seconds,
    });
  }
};
