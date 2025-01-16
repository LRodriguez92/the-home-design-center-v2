import { CLSMetric, FCPMetric, FIDMetric, LCPMetric, TTFBMetric } from 'web-vitals'

type MetricType = CLSMetric | FCPMetric | FIDMetric | LCPMetric | TTFBMetric

const vitalsUrl = 'https://vitals.vercel-analytics.com/v1/vitals'

interface NetworkInformation {
  effectiveType: string
}

interface NavigatorWithConnection extends Navigator {
  connection?: NetworkInformation
}

function getConnectionSpeed(): string {
  const nav = navigator as NavigatorWithConnection
  return nav.connection?.effectiveType || ''
}

export function sendToAnalytics(metric: MetricType, options: { path: string }) {
  const page = Object.entries(options).reduce(
    (acc, [key, value]) => acc.replace(value, `[${key}]`),
    options.path,
  )

  const body = {
    dsn: process.env.NEXT_PUBLIC_VERCEL_ANALYTICS_ID, // Get this from your Vercel project
    id: metric.id,
    page,
    href: location.href,
    event_name: metric.name,
    value: metric.value.toString(),
    speed: getConnectionSpeed(),
  }

  if (process.env.NODE_ENV === 'production') {
    const blob = new Blob([JSON.stringify(body)], { type: 'application/json' })
    if (navigator.sendBeacon) {
      navigator.sendBeacon(vitalsUrl, blob)
    } else {
      fetch(vitalsUrl, {
        body: JSON.stringify(body),
        method: 'POST',
        credentials: 'omit',
        keepalive: true,
      })
    }
  } else {
    console.log('[Web Vitals]:', body)
  }
} 