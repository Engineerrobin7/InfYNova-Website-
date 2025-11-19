// Google Tag Manager event tracking utilities

type GTMEvent = {
  event: string;
  [key: string]: any;
};

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || '';

// Push event to dataLayer
export const pushToDataLayer = (data: GTMEvent) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push(data);
  }
};

// Track page view
export const trackPageView = (url: string) => {
  pushToDataLayer({
    event: 'pageview',
    page: url,
  });
};

// Track custom event
export const trackEvent = (eventName: string, eventData?: Record<string, any>) => {
  pushToDataLayer({
    event: eventName,
    ...eventData,
  });
};

// E-commerce tracking
export const trackPurchase = (transactionData: {
  transactionId: string;
  value: number;
  currency: string;
  items: any[];
}) => {
  pushToDataLayer({
    event: 'purchase',
    ecommerce: transactionData,
  });
};

// Track pre-order
export const trackPreOrder = (productData: {
  productName: string;
  productId: string;
  price: number;
  currency: string;
}) => {
  pushToDataLayer({
    event: 'pre_order',
    ecommerce: {
      items: [{
        item_name: productData.productName,
        item_id: productData.productId,
        price: productData.price,
        currency: productData.currency,
      }]
    }
  });
};

// Track newsletter signup
export const trackNewsletterSignup = (email: string) => {
  pushToDataLayer({
    event: 'newsletter_signup',
    user_email: email,
  });
};

// Track challenge submission
export const trackChallengeSubmission = (challengeData: {
  challengeName: string;
  platform: string;
  username: string;
}) => {
  pushToDataLayer({
    event: 'challenge_submission',
    challenge_name: challengeData.challengeName,
    platform: challengeData.platform,
    username: challengeData.username,
  });
};

// Track social share
export const trackSocialShare = (platform: string, url: string) => {
  pushToDataLayer({
    event: 'social_share',
    platform: platform,
    url: url,
  });
};

// Track button click
export const trackButtonClick = (buttonName: string, location: string) => {
  pushToDataLayer({
    event: 'button_click',
    button_name: buttonName,
    location: location,
  });
};

// Track form submission
export const trackFormSubmission = (formName: string, formData?: Record<string, any>) => {
  pushToDataLayer({
    event: 'form_submission',
    form_name: formName,
    ...formData,
  });
};

// Track video play
export const trackVideoPlay = (videoTitle: string, videoUrl: string) => {
  pushToDataLayer({
    event: 'video_play',
    video_title: videoTitle,
    video_url: videoUrl,
  });
};

// Track search
export const trackSearch = (searchTerm: string, resultsCount: number) => {
  pushToDataLayer({
    event: 'search',
    search_term: searchTerm,
    results_count: resultsCount,
  });
};

// Track user engagement
export const trackEngagement = (engagementType: string, value?: any) => {
  pushToDataLayer({
    event: 'user_engagement',
    engagement_type: engagementType,
    value: value,
  });
};

// Track error
export const trackError = (errorMessage: string, errorLocation: string) => {
  pushToDataLayer({
    event: 'error',
    error_message: errorMessage,
    error_location: errorLocation,
  });
};

// Track affiliate click
export const trackAffiliateClick = (affiliateId: string, productId: string) => {
  pushToDataLayer({
    event: 'affiliate_click',
    affiliate_id: affiliateId,
    product_id: productId,
  });
};

// Track referral
export const trackReferral = (referralCode: string, referrerUsername: string) => {
  pushToDataLayer({
    event: 'referral',
    referral_code: referralCode,
    referrer_username: referrerUsername,
  });
};
