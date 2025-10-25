// Google Analytics utility functions for InfYNova

declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: Record<string, any>
    ) => void
    dataLayer: Record<string, any>[]
  }
}

// Track page views
export const trackPageView = (url: string, title?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID || 'G-E0Y5RMLEKL', {
      page_location: url,
      page_title: title || document.title,
    })
  }
}

// Track custom events
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Track InfYNova specific events
export const trackInfYNovaEvents = {
  // Hero section interactions
  heroPhoneInteraction: () => trackEvent('interact', 'hero', 'phone_hover'),
  discoverNovaOSClick: () => trackEvent('click', 'cta', 'discover_novaos'),
  
  // Features section
  featureCardExpand: (featureName: string) => 
    trackEvent('expand', 'features', featureName),
  
  // About section
  timelineInteraction: (milestone: string) => 
    trackEvent('interact', 'timeline', milestone),
  
  // Careers section
  jobCardClick: (jobTitle: string) => 
    trackEvent('click', 'careers', jobTitle),
  jobApplyClick: (jobTitle: string) => 
    trackEvent('apply', 'careers', jobTitle),
  
  // Community section
  impactMeterView: () => trackEvent('view', 'community', 'impact_meter'),
  
  // Footer interactions
  newsletterSignup: (email: string) => 
    trackEvent('signup', 'newsletter', 'footer', 1),
  socialMediaClick: (platform: string) => 
    trackEvent('click', 'social', platform),
  
  // General engagement
  scrollDepth: (percentage: number) => 
    trackEvent('scroll', 'engagement', 'depth', percentage),
  timeOnPage: (seconds: number) => 
    trackEvent('timing', 'engagement', 'time_on_page', seconds),
}

// Track scroll depth
export const initScrollTracking = () => {
  if (typeof window === 'undefined') return

  let maxScroll = 0
  const trackingPoints = [25, 50, 75, 90, 100]
  const tracked = new Set<number>()

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const scrollPercent = Math.round((scrollTop / docHeight) * 100)

    if (scrollPercent > maxScroll) {
      maxScroll = scrollPercent
      
      trackingPoints.forEach(point => {
        if (scrollPercent >= point && !tracked.has(point)) {
          tracked.add(point)
          trackInfYNovaEvents.scrollDepth(point)
        }
      })
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true })
  
  return () => window.removeEventListener('scroll', handleScroll)
}

// Track time on page
export const initTimeTracking = () => {
  if (typeof window === 'undefined') return

  const startTime = Date.now()
  const intervals = [30, 60, 120, 300] // 30s, 1m, 2m, 5m
  const tracked = new Set<number>()

  const checkTime = () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000)
    
    intervals.forEach(interval => {
      if (timeSpent >= interval && !tracked.has(interval)) {
        tracked.add(interval)
        trackInfYNovaEvents.timeOnPage(interval)
      }
    })
  }

  const timer = setInterval(checkTime, 10000) // Check every 10 seconds
  
  return () => clearInterval(timer)
}