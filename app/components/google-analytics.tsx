'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import Script from 'next/script'

// Extend the Window interface to include gtag
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'js' | 'event',
      targetId: string,
      config?: { [key: string]: string }
    ) => void;
    dataLayer: Array<{ 
      event?: string;
      [key: string]: string | undefined;
    }>;
  }
}

export function GoogleAnalytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (pathname) {
      window.gtag('config', 'G-QCWP41T929', {
        page_path: pathname + searchParams.toString()
      })
    }
  }, [pathname, searchParams])

  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-QCWP41T929"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-QCWP41T929');
        `}
      </Script>
    </>
  )
} 