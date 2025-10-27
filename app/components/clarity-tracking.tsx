"use client";

import { useEffect } from 'react';

// Extend window object to include clarity
declare global {
  interface Window {
    clarity?: (action: string, ...args: any[]) => void;
  }
}

export function ClarityTracking() {
  useEffect(() => {
    // Track page interactions for Clarity
    const trackInteractions = () => {
      // Track button clicks
      const buttons = document.querySelectorAll('button, [role="button"]');
      buttons.forEach(button => {
        button.addEventListener('click', (e) => {
          const target = e.target as HTMLElement;
          const buttonText = target.textContent || target.getAttribute('aria-label') || 'Unknown Button';
          
          if (window.clarity) {
            window.clarity('event', 'button_click', {
              button_text: buttonText,
              page_section: getPageSection(target)
            });
          }
        });
      });

      // Track form submissions
      const forms = document.querySelectorAll('form');
      forms.forEach(form => {
        form.addEventListener('submit', (e) => {
          const formId = form.id || form.className || 'unknown_form';
          
          if (window.clarity) {
            window.clarity('event', 'form_submit', {
              form_id: formId,
              form_type: getFormType(form)
            });
          }
        });
      });

      // Track scroll depth
      let maxScrollDepth = 0;
      const trackScrollDepth = () => {
        const scrollDepth = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        
        if (scrollDepth > maxScrollDepth) {
          maxScrollDepth = scrollDepth;
          
          // Track milestone scroll depths
          if ([25, 50, 75, 90].includes(scrollDepth) && window.clarity) {
            window.clarity('event', 'scroll_depth', {
              depth_percentage: scrollDepth,
              page_height: document.body.scrollHeight
            });
          }
        }
      };

      window.addEventListener('scroll', trackScrollDepth, { passive: true });

      // Track section visibility
      const sections = document.querySelectorAll('section[id]');
      const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && window.clarity) {
            window.clarity('event', 'section_view', {
              section_id: entry.target.id,
              section_name: getSectionName(entry.target)
            });
          }
        });
      }, { threshold: 0.5 });

      sections.forEach(section => sectionObserver.observe(section));

      return () => {
        window.removeEventListener('scroll', trackScrollDepth);
        sectionObserver.disconnect();
      };
    };

    // Wait for Clarity to load
    const checkClarity = () => {
      if (window.clarity) {
        trackInteractions();
      } else {
        setTimeout(checkClarity, 1000);
      }
    };

    checkClarity();
  }, []);

  return null; // This component doesn't render anything
}

// Helper functions
function getPageSection(element: HTMLElement): string {
  const section = element.closest('section');
  return section?.id || section?.className || 'unknown_section';
}

function getFormType(form: HTMLFormElement): string {
  if (form.querySelector('input[type="email"]')) return 'newsletter';
  if (form.querySelector('input[type="search"]')) return 'search';
  return 'contact';
}

function getSectionName(section: Element): string {
  const heading = section.querySelector('h1, h2, h3');
  return heading?.textContent || section.id || 'unnamed_section';
}