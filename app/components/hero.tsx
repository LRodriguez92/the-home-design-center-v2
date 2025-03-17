'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from '@/app/lib/translations'
import { usePathname } from 'next/navigation'

interface HeroProps {
  title?: string
  subtitle?: string
}

export default function Hero({ 
  title = 'Elevate Your Living Space',
  subtitle = 'Experience unparalleled luxury with our bespoke home design and remodeling services.'
}: HeroProps) {
  const pathname = usePathname()
  const { t } = useTranslations(pathname?.startsWith('/es') ? 'es' : 'en')
  const currentLang = pathname?.startsWith('/es') ? 'es' : 'en'

  return (
    <div 
      className="relative h-screen flex items-center justify-center" 
      role="region" 
      aria-label={t('home.hero.title')}
    >
      {/* Background Image */}
      <div className="absolute inset-0 bg-black/70">
        <Image
          src="/images/heroes/kitchen-service-2.webp"
          alt={t('home.hero.image')}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          quality={75}
          priority
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQrJyEwPENDPzE2O0FBNi5RXUFGSYtNTltcYWFhR2N9fUN2XHlwZF5BZGN/2wBDARUXFx4aHjshITt8U0JTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx//wAARCAAIAAoDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAUGBP/EACUQAAIBAwMCBwAAAAAAAAAAAAECAwQFEQASIQYxExQiQVFhgf/EABYBAQEBAAAAAAAAAAAAAAAAAAABA//EABkRAQEBAQEBAAAAAAAAAAAAAAEAEQIhUf/aAAwDAQACEQMRAD8A6DZb1NWVoiqaW0hxgvDNq5VD3QYOCeM4zpxX0tLURBZ4IpVByFkQMAfvXOIr1QQ3p6SklrqUVMMsm6nCbmA2n1DHOM+4xjTSoP1YY0SiU7GxkxkOCPgjWfGzX//Z"
          className="object-cover mix-blend-multiply"
          style={{ transform: 'translate3d(0, 0, 0)' }}
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white">
            {title}
          </h1>
          <p className="mx-auto max-w-2xl text-xl sm:text-2xl text-gray-100">
            {subtitle}
          </p>
          <div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center" 
            role="group" 
            aria-label={t('home.hero.title')}
          >
            <Link 
              href={`/${currentLang}/contact`}
              className="inline-flex items-center px-8 py-4 min-h-[48px] min-w-[48px] rounded-md bg-primary text-[#0F0F0F] text-lg font-semibold hover:bg-primary/90 focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:outline-none transition duration-300"
              aria-label={t('home.hero.buttons.contact')}
            >
              {t('home.hero.buttons.contact')}
            </Link>
            <Link 
              href={`/${currentLang}/projects`}
              className="inline-flex items-center px-8 py-4 min-h-[48px] min-w-[48px] rounded-md border-2 border-secondary bg-transparent text-white text-lg font-semibold hover:bg-secondary/10 focus:ring-2 focus:ring-offset-2 focus:ring-secondary focus:outline-none transition duration-300"
              aria-label={t('home.hero.buttons.portfolio')}
            >
              {t('home.hero.buttons.portfolio')}
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary" />
    </div>
  )
}

