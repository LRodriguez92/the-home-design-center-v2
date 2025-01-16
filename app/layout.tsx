import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from './components/navbar'
import Footer from './components/footer'
import { ThemeProvider } from './components/theme-provider'
import FloatingLanguageSwitcher from './components/floating-language-switcher'
import StructuredData from './components/structured-data'

const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = params?.lang || 'en'
  
  const baseMetadata: Partial<Metadata> = {
    metadataBase: new URL('https://homedesigncenter.com'), // Replace with your actual domain
    alternates: {
      canonical: '/',
      languages: {
        'en': '/en',
        'es': '/es',
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large' as const,
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'your-google-verification-code', // Add your verification code
    },
  }

  const localizedMetadata = {
    en: {
      title: 'The Home Design Center',
      description: 'Transform your living space with expert remodeling services',
      openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://homedesigncenter.com',
        siteName: 'The Home Design Center',
        title: 'The Home Design Center - Expert Remodeling Services',
        description: 'Transform your living space with expert remodeling services',
        images: [{
          url: '/images/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'The Home Design Center',
        }],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'The Home Design Center - Expert Remodeling Services',
        description: 'Transform your living space with expert remodeling services',
        images: ['/images/twitter-image.jpg'],
        creator: '@homedesigncenter',
      },
      icons: {
        icon: [
          { url: '/favicon/favicon.ico' },
          { url: '/favicon/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
          { url: '/favicon/web-app-manifest-192x192.png', sizes: '192x192', type: 'image/png' },
          { url: '/favicon/web-app-manifest-512x512.png', sizes: '512x512', type: 'image/png' },
        ],
        apple: [
          { url: '/favicon/apple-touch-icon.png' },
        ],
        other: [
          {
            rel: 'mask-icon',
            url: '/favicon/favicon.svg',
          },
        ],
      },
      manifest: '/favicon/site.webmanifest',
    },
    es: {
      title: 'The Home Design Center',
      description: 'Transforme su espacio vital con servicios expertos de remodelación',
      openGraph: {
        type: 'website',
        locale: 'es_ES',
        url: 'https://homedesigncenter.com/es',
        siteName: 'The Home Design Center',
        title: 'The Home Design Center - Servicios Expertos de Remodelación',
        description: 'Transforme su espacio vital con servicios expertos de remodelación',
        images: [{
          url: '/images/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'The Home Design Center',
        }],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'The Home Design Center - Servicios Expertos de Remodelación',
        description: 'Transforme su espacio vital con servicios expertos de remodelación',
        images: ['/images/twitter-image.jpg'],
        creator: '@homedesigncenter',
      },
      icons: {
        icon: [
          { url: '/favicon/favicon.ico' },
          { url: '/favicon/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
          { url: '/favicon/web-app-manifest-192x192.png', sizes: '192x192', type: 'image/png' },
          { url: '/favicon/web-app-manifest-512x512.png', sizes: '512x512', type: 'image/png' },
        ],
        apple: [
          { url: '/favicon/apple-touch-icon.png' },
        ],
        other: [
          {
            rel: 'mask-icon',
            url: '/favicon/favicon.svg',
          },
        ],
      },
      manifest: '/favicon/site.webmanifest',
    },
  }

  return {
    ...baseMetadata,
    ...localizedMetadata[lang as keyof typeof localizedMetadata],
  } as Metadata
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  return (
    <html lang={params.lang || 'en'}>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <ThemeProvider>
          <StructuredData lang={params.lang || 'en'} />
          <Navbar />
          <main className="flex-grow pt-16">{children}</main>
          <Footer />
          <FloatingLanguageSwitcher />
        </ThemeProvider>
      </body>
    </html>
  )
}

