'use client'

import Script from 'next/script'
import { useEffect } from 'react'

const Analytics = () => {
    const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-E0Y5RMLEKL'
    const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID

    useEffect(() => {
        // Initialize Microsoft Clarity
        if (CLARITY_PROJECT_ID && typeof window !== 'undefined') {
            import('@microsoft/clarity').then((clarity) => {
                clarity.default.init(CLARITY_PROJECT_ID)
            })
        }
    }, [CLARITY_PROJECT_ID])

    return (
        <>
            {/* Google Analytics */}
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
          });
        `}
            </Script>

            {/* Microsoft Clarity */}
            {CLARITY_PROJECT_ID && (
                <Script id="microsoft-clarity" strategy="afterInteractive">
                    {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
          `}
                </Script>
            )}
        </>
    )
}

export default Analytics