import Image from 'next/image'
import heroImage from '@/public/images/heroes/workers.jpg'

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
          className="brightness-50 object-cover"
          fill
          sizes="(max-width: 640px) 360px, (max-width: 768px) 480px, (max-width: 1024px) 640px, 800px"
          quality={45}
        />
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#F5F5F5] mb-6">
          {title}
        </h1>
        <p className="text-xl md:text-2xl text-[#B0B0B0] max-w-3xl mx-auto">
          {description}
        </p>
      </div>
    </div>
  )
} 