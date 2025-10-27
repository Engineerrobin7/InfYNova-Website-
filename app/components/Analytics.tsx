'use client'

import Script from 'next/script'
import { useEffect } from 'react'

const Analytics = () => {
    const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-E0Y5RMLEKL'
    const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID

    useEffect(() => {
        // Initialize Microsoft Clarity with enhanced tracking
        if (CLARITY_PROJECT_ID && typeof window !== 'undefined') {
            // Load Clarity script
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.async = true;
            script.src = `https://www.clarity.ms/tag/${CLARITY_PROJECT_ID}`;
            document.head.appendChild(script);

            // Enhanced Clarity tracking
            script.onload = () => {
                if (window.clarity) {
                    // Track custom events
                    window.clarity('set', 'page_type', 'homepage');
                    window.clarity('set', 'user_type', 'visitor');
                }
            };
        }
    }, [CLARITY_PROJECT_ID])

    return (
        <>
            {/* Google Analytics with Enhanced eCommerce */}
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            page_title: document.title,
            page_location: window.location.href,
            send_page_view: true,
            anonymize_ip: true,
            allow_google_signals: true,
            allow_ad_personalization_signals: false
          });

          // Enhanced tracking for InfYNova
          gtag('event', 'page_view', {
            page_title: 'InfYNova Homepage',
            page_location: window.location.href,
            content_group1: 'Marketing Site'
          });
        `}
            </Script>

            {/* Microsoft Clarity - Enhanced Implementation */}
            {CLARITY_PROJECT_ID && (
                <Script id="microsoft-clarity" strategy="afterInteractive">
                    {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");

            // Enhanced Clarity configuration
            window.clarity = window.clarity || function(){
                (window.clarity.q = window.clarity.q || []).push(arguments)
            };
          `}
                </Script>
            )}

            {/* Performance Monitoring */}
            <Script id="performance-monitoring" strategy="afterInteractive">
                {`
          // Monitor Core Web Vitals
          function sendToAnalytics(metric) {
            gtag('event', metric.name, {
              event_category: 'Web Vitals',
              event_label: metric.id,
              value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
              non_interaction: true,
            });
          }

          // Load web-vitals library
          import('https://unpkg.com/web-vitals@3/dist/web-vitals.js').then(({getCLS, getFID, getFCP, getLCP, getTTFB}) => {
            getCLS(sendToAnalytics);
            getFID(sendToAnalytics);
            getFCP(sendToAnalytics);
            getLCP(sendToAnalytics);
            getTTFB(sendToAnalytics);
          });
        `}
            </Script>
        </>
    )
}

export default Analytics