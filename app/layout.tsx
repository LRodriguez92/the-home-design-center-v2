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
    },
    es: {
      title: 'The Home Design Center',
      description: 'Transforme su espacio vital con servicios expertos de remodelación',
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

