import { useEffect } from 'react';
import { trackScrollDepth, trackSectionView } from '@/lib/analytics';

// Hook to track scroll depth
export function useScrollDepthTracking(pageName: string = 'homepage') {
  useEffect(() => {
    const thresholds = [25, 50, 75, 100];
    const trackedThresholds = new Set<number>();

    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      
      // Calculate scroll percentage
      const scrollPercentage = Math.round(
        ((scrollTop + windowHeight) / documentHeight) * 100
      );

      // Track each threshold only once
      thresholds.forEach((threshold) => {
        if (
          scrollPercentage >= threshold &&
          !trackedThresholds.has(threshold)
        ) {
          trackedThresholds.add(threshold);
          trackScrollDepth(threshold, pageName);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pageName]);
}

// Hook to track when a section comes into view
export function useSectionTracker(sectionName: string, elementRef: React.RefObject<HTMLElement>) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Section is now visible
            trackSectionView(sectionName);
            // Optional: unobserve after first view to avoid duplicate tracking
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 } // Trigger when 30% of section is visible
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [sectionName, elementRef]);
}

// Hook to track time spent on page
export function useEngagementTimer(pageName: string) {
  useEffect(() => {
    const startTime = Date.now();

    const handleBeforeUnload = () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      // Send ping to analytics endpoint
      navigator.sendBeacon(
        '/api/analytics/engagement',
        JSON.stringify({
          page: pageName,
          timeSpent,
          timestamp: new Date().toISOString(),
        })
      );
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [pageName]);
}

// Hook to track clicks on elements with data attributes
export function useClickTracking(selector: string, eventName: string) {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);

    const handleClick = (e: MouseEvent) => {
      const element = e.target as HTMLElement;
      const label = element.getAttribute('data-analytics-label') || eventName;
      const category = element.getAttribute('data-analytics-category') || 'engagement';

      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', eventName, {
          event_category: category,
          event_label: label,
        });
      }
    };

    elements.forEach((element) => {
      element.addEventListener('click', handleClick);
    });

    return () => {
      elements.forEach((element) => {
        element.removeEventListener('click', handleClick);
      });
    };
  }, [selector, eventName]);
}
