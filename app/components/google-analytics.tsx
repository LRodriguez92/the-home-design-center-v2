'use client'

import { useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import Script from 'next/script'

type GTagCommand = 'config' | 'js' | 'event';
type GTagConfig = { [key: string]: string | boolean };

declare global {
  interface Window {
    gtag: (command: GTagCommand, targetId: string | Date, config?: GTagConfig) => void;
    dataLayer: unknown[];
  }
}

const GA_MEASUREMENT_ID = 'G-QCWP41T929'
const isDevelopment = process.env.NODE_ENV === 'development'

export function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isGAInitialized, setGAInitialized] = useState(false);

  useEffect(() => {
    if (isGAInitialized && pathname && typeof window.gtag === 'function') {
      if (isDevelopment) {
        console.log("📊 [DEV] Would track pageview:", pathname + searchParams.toString());
        return;
      }
      
      console.log("📊 GA Tracking Pageview:", pathname + searchParams.toString());
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: pathname + searchParams.toString()
      });
    }
  }, [pathname, searchParams, isGAInitialized]);

  if (isDevelopment) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
        onLoad={() => {
          console.log("✅ GA Script Loaded");

          window.dataLayer = window.dataLayer || [];
          window.gtag = function (...args: [GTagCommand, string | Date, GTagConfig?]) {
            window.dataLayer.push(args);
          };

          window.gtag('js', new Date());
          window.gtag('config', GA_MEASUREMENT_ID);

          setGAInitialized(true);
        }}
      />
    </>
  );
} 