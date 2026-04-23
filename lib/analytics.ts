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

// Track scroll depth
export const trackScrollDepth = (percentage: number, page: string) => {
  if (typeof window !== 'undefined') {
    if (window.gtag) {
      window.gtag('event', 'scroll_depth', {
        event_category: 'engagement',
        event_label: `${page} - ${percentage}%`,
        value: percentage,
      });
    }

    if (window.clarity) {
      window.clarity('event', 'scroll_depth', { percentage, page });
    }
  }
};

// Track section views (waitlist, FAQ, roadmap, etc.)
export const trackSectionView = (sectionName: string) => {
  if (typeof window !== 'undefined') {
    if (window.gtag) {
      window.gtag('event', 'section_view', {
        event_category: 'engagement',
        event_label: sectionName,
      });
    }

    if (window.clarity) {
      window.clarity('event', 'section_view', { section: sectionName });
    }

    console.log('📊 Viewed section:', sectionName);
  }
};

// Track FAQ accordion interactions
export const trackFAQInteraction = (questionIndex: number, expanded: boolean) => {
  if (typeof window !== 'undefined') {
    if (window.gtag) {
      window.gtag('event', 'faq_interaction', {
        event_category: 'engagement',
        event_label: `FAQ #${questionIndex} - ${expanded ? 'Expanded' : 'Collapsed'}`,
        value: expanded ? 1 : 0,
      });
    }

    if (window.clarity) {
      window.clarity('event', 'faq_interaction', { questionIndex, expanded });
    }

    console.log('📊 FAQ interaction - Q#' + questionIndex + ':', expanded ? 'opened' : 'closed');
  }
};

// Track roadmap section views
export const trackRoadmapView = (quarterYear: string) => {
  if (typeof window !== 'undefined') {
    if (window.gtag) {
      window.gtag('event', 'roadmap_view', {
        event_category: 'engagement',
        event_label: quarterYear,
      });
    }

    if (window.clarity) {
      window.clarity('event', 'roadmap_view', { quarterYear });
    }

    console.log('📊 Viewed roadmap milestone:', quarterYear);
  }
};

// Track waitlist join
export const trackWaitlistJoin = (source: string = 'organic') => {
  if (typeof window !== 'undefined') {
    if (window.gtag) {
      window.gtag('event', 'waitlist_join', {
        event_category: 'conversion',
        event_label: `Joined from ${source}`,
        value: 1,
      });
    }

    if (window.clarity) {
      window.clarity('event', 'waitlist_join', { source });
    }

    console.log('📊 User joined waitlist from:', source);
  }
};

// Track pre-order click (leading indicator)
export const trackPreOrderClick = (source: string) => {
  if (typeof window !== 'undefined') {
    if (window.gtag) {
      window.gtag('event', 'pre_order_click', {
        event_category: 'conversion',
        event_label: `Pre-order from ${source}`,
      });
    }

    if (window.clarity) {
      window.clarity('event', 'pre_order_click', { source });
    }

    console.log('📊 Pre-order clicked from:', source);
  }
};

// Track testimonial view
export const trackTestimonialView = (testimonialIndex: number) => {
  if (typeof window !== 'undefined') {
    if (window.gtag) {
      window.gtag('event', 'testimonial_view', {
        event_category: 'engagement',
        event_label: `Testimonial #${testimonialIndex}`,
      });
    }

    if (window.clarity) {
      window.clarity('event', 'testimonial_view', { testimonialIndex });
    }
  }
};

// Track NovaOS learn section
export const trackNovaOSLearn = (stepNumber: number) => {
  if (typeof window !== 'undefined') {
    if (window.gtag) {
      window.gtag('event', 'novaos_learn', {
        event_category: 'engagement',
        event_label: `NovaOS Step ${stepNumber}`,
      });
    }

    if (window.clarity) {
      window.clarity('event', 'novaos_learn', { stepNumber });
    }

    console.log('📊 Learned about NovaOS step:', stepNumber);
  }
};

// Track founder story engagement
export const trackFounderStoryView = () => {
  if (typeof window !== 'undefined') {
    if (window.gtag) {
      window.gtag('event', 'founder_story_view', {
        event_category: 'engagement',
        event_label: 'Why InfyNova Exists',
      });
    }

    if (window.clarity) {
      window.clarity('event', 'founder_story_view');
    }

    console.log('📊 Viewed founder story');
  }
};

// Track sticky CTA interaction (mobile)
export const trackStickyCTAInteraction = (action: 'view' | 'click' | 'dismiss') => {
  if (typeof window !== 'undefined') {
    if (window.gtag) {
      window.gtag('event', 'sticky_cta', {
        event_category: 'engagement',
        event_label: `Sticky CTA - ${action}`,
      });
    }

    if (window.clarity) {
      window.clarity('event', 'sticky_cta', { action });
    }

    console.log('📊 Sticky CTA interaction:', action);
  }
};

// Track press/media mention click
export const trackPressMentionClick = (source: string) => {
  if (typeof window !== 'undefined') {
    if (window.gtag) {
      window.gtag('event', 'press_mention_click', {
        event_category: 'engagement',
        event_label: source,
      });
    }

    if (window.clarity) {
      window.clarity('event', 'press_mention_click', { source });
    }

    console.log('📊 Clicked press mention:', source);
  }
};

// Track video play (if added later)
export const trackVideoPlay = (videoTitle: string, location: string) => {
  if (typeof window !== 'undefined') {
    if (window.gtag) {
      window.gtag('event', 'video_play', {
        event_category: 'engagement',
        event_label: videoTitle,
        event_location: location,
      });
    }

    if (window.clarity) {
      window.clarity('event', 'video_play', { videoTitle, location });
    }

    console.log('📊 Video playing:', videoTitle);
  }
};

// Track link click to legal pages
export const trackLegalPageClick = (pageName: 'privacy' | 'terms') => {
  if (typeof window !== 'undefined') {
    if (window.gtag) {
      window.gtag('event', 'legal_page_click', {
        event_category: 'engagement',
        event_label: pageName.toUpperCase(),
      });
    }

    if (window.clarity) {
      window.clarity('event', 'legal_page_click', { pageName });
    }

    console.log('📊 Clicked legal page:', pageName);
  }
};
