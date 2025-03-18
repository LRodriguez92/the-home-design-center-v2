'use client'

import Script from 'next/script'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, Suspense } from 'react'

// Declare global gtag function
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js',
      targetId: string,
      config?: {
        page_path?: string;
        debug_mode?: boolean;
        [key: string]: unknown;
      }
    ) => void
  }
}

// GA Measurement ID
const GA_MEASUREMENT_ID = 'G-QCWP41T929'

function GoogleAnalyticsInner() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (pathname) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')
      
      // Debug logging for navigation tracking
      console.group('[GA] Navigation Tracking')
      console.log('Current pathname:', pathname)
      console.log('Search params:', searchParams?.toString() || 'none')
      console.log('Full URL being tracked:', url)
      
      try {
        window.gtag('config', GA_MEASUREMENT_ID, {
          page_path: url,
        })
        console.log('✅ Successfully sent pageview to GA')
      } catch (error) {
        console.error('❌ Failed to send pageview to GA:', error)
      }
      
      console.groupEnd()
    }
  }, [pathname, searchParams])

  return null
}

export function GoogleAnalytics() {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        onLoad={() => {
          console.log('[GA] Script loaded successfully')
        }}
        onError={() => {
          console.error('[GA] Script failed to load')
        }}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              debug_mode: true
            });
            console.log('[GA] Initialization complete');
          `,
        }}
      />
      <Suspense fallback={null}>
        <GoogleAnalyticsInner />
      </Suspense>
    </>
  )
} 