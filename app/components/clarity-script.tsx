"use client";

import Script from 'next/script';
import { useEffect } from 'react';

export function ClarityScript() {
  const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

  useEffect(() => {
    // Backup method: Direct script injection
    if (CLARITY_PROJECT_ID && typeof window !== 'undefined') {
      // Check if Clarity is already loaded
      if (!window.clarity) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.innerHTML = `
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
        `;
        document.head.appendChild(script);
        
        console.log('Clarity script injected with ID:', CLARITY_PROJECT_ID);
      }
    }
  }, [CLARITY_PROJECT_ID]);

  if (!CLARITY_PROJECT_ID) {
    console.warn('Clarity Project ID not found in environment variables');
    return null;
  }

  return (
    <>
      {/* Primary method: Next.js Script component */}
      <Script
        id="microsoft-clarity-primary"
        strategy="afterInteractive"
        onLoad={() => console.log('Clarity script loaded successfully')}
        onError={() => console.error('Clarity script failed to load')}
      >
        {`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
        `}
      </Script>
    </>
  );
}

// Extend window type for TypeScript
declare global {
  interface Window {
    clarity?: any;
  }
}