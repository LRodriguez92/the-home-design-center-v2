import Image from 'next/image'
import heroImage from '@/public/images/heroes/workers.webp'

interface ServicesHeroProps {
  title: string
  description: string
}

export default function ServicesHero({ title, description }: ServicesHeroProps) {
  return (
    <div className="relative h-[40vh] md:h-[50vh] lg:h-[60vh] bg-[#1C1F33]">
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt={title}
          priority
          placeholder="blur"
          style={{ objectFit: 'cover', filter: 'brightness(0.6)' }}
          fill
          sizes="100vw"
          quality={45}
        />
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#F5F5F5] mb-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
          {title}
        </h1>
        <p className="text-xl md:text-2xl text-[#B0B0B0] max-w-3xl mx-auto drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
          {description}
        </p>
      </div>
      {/* Bottom Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary" />
    </div>
  )
} 