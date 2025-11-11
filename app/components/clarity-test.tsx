"use client";

import { useEffect, useState } from 'react';

export function ClarityTest() {
  const [clarityStatus, setClarityStatus] = useState<string>('Checking...');

  useEffect(() => {
    const checkClarity = () => {
      // Check if Clarity is loaded
      if (typeof window !== 'undefined') {
        const clarityId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;
        
        if (!clarityId) {
          setClarityStatus('❌ Project ID not found');
          return;
        }

        // Check if Clarity script is loaded
        const clarityScript = document.querySelector(`script[src*="clarity.ms/tag/${clarityId}"]`);
        if (clarityScript) {
          setClarityStatus('✅ Clarity script loaded');
        } else {
          setClarityStatus('⏳ Loading Clarity script...');
        }

        // Check if Clarity function is available
        setTimeout(() => {
          if (window.clarity) {
            setClarityStatus('✅ Clarity is active and tracking');
          } else {
            setClarityStatus('⚠️ Clarity script loaded but not initialized');
          }
        }, 3000);
      }
    };

    checkClarity();
  }, []);

  // Only show in development
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-3 rounded-lg text-sm z-50">
      <div>Clarity Status: {clarityStatus}</div>
      <div>Project ID: {process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || 'Not set'}</div>
    </div>
  );
}

// Window type is declared in clarity-tracking.tsx