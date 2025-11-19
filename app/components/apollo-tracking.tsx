"use client";

import Script from 'next/script';

export function ApolloTracking() {
  return (
    <Script
      id="apollo-tracking"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          function initApollo(){
            var n=Math.random().toString(36).substring(7),
            o=document.createElement("script");
            o.src="https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache="+n,
            o.async=!0,
            o.defer=!0,
            o.onload=function(){
              window.trackingFunctions.onLoad({appId:"691daf515a4481001d2eb505"})
            },
            document.head.appendChild(o)
          }
          initApollo();
        `,
      }}
    />
  );
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    trackingFunctions: any;
  }
}
