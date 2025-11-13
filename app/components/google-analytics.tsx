'use client'

import Script from 'next/script'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'

// Declare global gtag function
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js',
      targetId: string | Date,
      config?: {
        page_path?: string;
        debug_mode?: boolean;
        send_to?: string;
        value?: number;
        currency?: string;
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
  const [hasAnalyticsConsent, setHasAnalyticsConsent] = useState(false)

  // Check for analytics consent
  useEffect(() => {
    const checkConsent = () => {
      const consent = localStorage.getItem('cookieConsent')
      if (consent) {
        try {
          const { analytics } = JSON.parse(consent)
          setHasAnalyticsConsent(analytics === true)
        } catch (error) {
          console.error('Error parsing cookie consent:', error)
          setHasAnalyticsConsent(false)
        }
      }
    }

    // Check initial consent
    checkConsent()

    // Listen for cookie consent changes
    window.addEventListener('cookie_consent_update', checkConsent)
    
    return () => {
      window.removeEventListener('cookie_consent_update', checkConsent)
    }
  }, [])

  useEffect(() => {
    if (!hasAnalyticsConsent) {
      return // Don't track if no consent
    }

    if (pathname) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')
      
      try {
        // Configure the tracker with new page path
        window.gtag('config', GA_MEASUREMENT_ID, {
          page_path: url,
        })
        
        // Explicitly send page_view event
        window.gtag('event', 'page_view', {
          page_title: document.title,
          page_location: window.location.href,
          page_path: url,
          send_to: GA_MEASUREMENT_ID
        })
      } catch (error) {
        console.error('Failed to send tracking data to GA:', error)
      }
    }
  }, [pathname, searchParams, hasAnalyticsConsent])

  return null
}

export function GoogleAnalytics() {
  const [hasAnalyticsConsent, setHasAnalyticsConsent] = useState(false)

  // Check for analytics consent
  useEffect(() => {
    const checkConsent = () => {
      const consent = localStorage.getItem('cookieConsent')
      if (consent) {
        try {
          const { analytics } = JSON.parse(consent)
          setHasAnalyticsConsent(analytics === true)
        } catch (error) {
          console.error('Error parsing cookie consent:', error)
          setHasAnalyticsConsent(false)
        }
      }
    }

    // Check initial consent
    checkConsent()

    // Listen for cookie consent changes
    window.addEventListener('cookie_consent_update', checkConsent)
    
    return () => {
      window.removeEventListener('cookie_consent_update', checkConsent)
    }
  }, [])

  if (!hasAnalyticsConsent) {
    return null // Don't load GA scripts if no consent
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
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
              debug_mode: false
            });
            gtag('config', 'AW-17707114672');
          `,
        }}
      />
      <Suspense fallback={null}>
        <GoogleAnalyticsInner />
      </Suspense>
    </>
  )
} 