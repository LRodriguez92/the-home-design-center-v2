import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from './components/navbar'
import Footer from './components/footer'
import { ThemeProvider } from './components/theme-provider'
import FloatingLanguageSwitcher from './components/floating-language-switcher'

const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = params?.lang || 'en'
  
  const metadata = {
    en: {
      title: 'The Home Design Center',
      description: 'Transform your living space with expert remodeling services',
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

  return metadata[lang as keyof typeof metadata]
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  const lang = params?.lang || 'en'
  
  return (
    <html lang={lang}>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <ThemeProvider>
          <Navbar />
          <FloatingLanguageSwitcher />
          <main className="flex-grow pt-16">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}

