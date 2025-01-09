'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useTheme } from './theme-provider'

export default function Hero() {
  const theme = useTheme()
  return (
    <div className="relative h-screen flex items-center justify-center">
      {/* Background Image */}
      <Image
        src="/images/heroes/kitchen-service-2.jpg"
        alt="Luxurious home interior"
        layout="fill"
        objectFit="cover"
        quality={100}
        priority
        className="brightness-[0.6]"
      />
      
      {/* Overlay */}
      <div className={`absolute inset-0 bg-[${theme.colors.background}] bg-opacity-70`} />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          <h1 className={`text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[${theme.colors.text}]`}>
            Elevate Your Living Space
          </h1>
          <p className={`mx-auto max-w-2xl text-xl sm:text-2xl text-[${theme.colors.textMuted}]`}>
            Experience unparalleled luxury with our bespoke home design and remodeling services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/contact"
              className={`inline-flex items-center px-8 py-3 rounded-md bg-[${theme.colors.primary}] text-[${theme.colors.text}] text-lg font-semibold hover:bg-[${theme.colors.primary}]/90 transition duration-300`}
            >
              Begin Your Transformation
            </Link>
            <Link 
              href="/projects"
              className={`inline-flex items-center px-8 py-3 rounded-md border-2 border-[${theme.colors.secondary}] bg-transparent text-[${theme.colors.text}] text-lg font-semibold hover:bg-[${theme.colors.secondary}] hover:text-[${theme.colors.text}] transition duration-300`}
            >
              Explore Our Portfolio
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Accent */}
      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[${theme.colors.primary}] to-[${theme.colors.secondary}]`} />
    </div>
  )
}

