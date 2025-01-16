'use client'

import { useEffect } from 'react'
import { onCLS, onFCP, onFID, onLCP, onTTFB } from 'web-vitals'
import { sendToAnalytics } from '../lib/vitals'
import { usePathname } from 'next/navigation'

export function WebVitals() {
  const pathname = usePathname()

  useEffect(() => {
    // Core Web Vitals
    onCLS((metric) => sendToAnalytics(metric, { path: pathname }))
    onFID((metric) => sendToAnalytics(metric, { path: pathname }))
    onLCP((metric) => sendToAnalytics(metric, { path: pathname }))
    // Other Web Vitals
    onFCP((metric) => sendToAnalytics(metric, { path: pathname }))
    onTTFB((metric) => sendToAnalytics(metric, { path: pathname }))
  }, [pathname])

  return null
} 