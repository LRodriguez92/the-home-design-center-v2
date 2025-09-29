import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from './components/theme-provider'
import { AuthProvider } from './contexts/auth-context'
import Navbar from './components/navbar'
import Footer from './components/footer'
import { Toaster } from "@/app/components/ui/toaster"
import { GoogleAnalytics } from './components/google-analytics'
import CookieConsent from './components/cookie-consent'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'The HDC - The Home Design Center',
  description: 'Transform your living space with our expert home design and construction services.',
  openGraph: {
    title: 'The HDC - The Home Design Center',
    description: 'Transform your living space with our expert home design and construction services.',
    images: [
      {
        url: '/images/home-design-center.png',
        width: 1200,
        height: 630,
        alt: 'The Home Design Center - Modern Kitchen Design',
      },
    ],
    type: 'website',
    locale: 'en_US',
    siteName: 'The Home Design Center',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The HDC - The Home Design Center',
    description: 'Transform your living space with our expert home design and construction services.',
    images: ['/images/home-design-center.png'],
  },
  icons: {
    icon: [
      {
        url: '/favicon/favicon-96x96.png',
        sizes: '96x96',
        type: 'image/png',
      },
      {
        url: '/favicon/favicon.svg',
        type: 'image/svg+xml',
        sizes: 'any',
      },
    ],
    shortcut: [
      {
        url: '/favicon/favicon-96x96.png',
        sizes: '96x96',
        type: 'image/png',
      }
    ],
    apple: {
      url: '/favicon/apple-touch-icon.png',
      sizes: '180x180',
      type: 'image/png',
    },
  },
  manifest: '/favicon/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <ThemeProvider>
          <AuthProvider>
            {children}
            <Navbar />
            <Footer />
            <Toaster />
            <GoogleAnalytics />
            <CookieConsent />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

