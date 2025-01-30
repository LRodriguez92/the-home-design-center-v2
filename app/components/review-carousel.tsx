'use client'

import { useState } from 'react'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { useTheme } from './theme-provider'
import { useTranslations, type Language } from '@/app/lib/translations'
import { usePathname } from 'next/navigation'

interface ReviewCarouselProps {
  lang?: Language
}

interface Review {
  name: string
  review: string
  rating: number
}

export default function ReviewCarousel({ lang }: ReviewCarouselProps) {
  const theme = useTheme()
  const pathname = usePathname()
  const currentLang = lang || (pathname.startsWith('/es') ? 'es' : 'en')
  const { t } = useTranslations(currentLang)
  const reviews = (t('reviews.items') as unknown) as Review[]

  const [currentIndex, setCurrentIndex] = useState(0)

  const nextReview = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length)
  }

  const prevReview = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length)
  }

  return (
    <section 
      className="py-16 md:py-24"
      style={{ backgroundColor: theme.colors.background }}
      aria-labelledby="reviews-title"
    >
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <h2 
          id="reviews-title"
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          style={{ color: theme.colors.text }}
        >
          {t('reviews.title')}
        </h2>
        <div 
          className="relative"
          role="region"
          aria-roledescription="carousel"
          aria-label={t('reviews.title')}
        >
          <div className="overflow-hidden px-8">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {reviews.map((review, index) => (
                <div 
                  key={index} 
                  className="w-full flex-shrink-0"
                  role="group"
                  aria-hidden={currentIndex !== index}
                >
                  <div className="bg-[#0F0F0F] p-8 rounded-lg shadow-lg">
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < review.rating ? 'text-[#C9A227] fill-[#C9A227]' : 'text-[#C9A227]'
                          }`}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <p className="text-[#FBFBFB] mb-4">{review.review}</p>
                    <p className="text-[#BCABAE] font-semibold">{review.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={prevReview}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-[#BCABAE] text-[#0F0F0F] p-2 rounded-full hover:bg-[#716969] transition-colors duration-300 select-none focus:outline-none min-h-[48px] min-w-[48px] flex items-center justify-center"
            aria-label="Previous review"
          >
            <ChevronLeft className="w-6 h-6" aria-hidden="true" />
          </button>
          <button
            onClick={nextReview}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#BCABAE] text-[#0F0F0F] p-2 rounded-full hover:bg-[#716969] transition-colors duration-300 select-none focus:outline-none min-h-[48px] min-w-[48px] flex items-center justify-center"
            aria-label="Next review"
          >
            <ChevronRight className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>
        <div className="flex justify-center mt-6 gap-2">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? 'bg-[#BCABAE]' : 'bg-[#716969]'
              } focus:ring-2 focus:ring-offset-2 focus:ring-[#BCABAE] focus:outline-none min-h-[24px] min-w-[24px]`}
              aria-label={`Go to review ${index + 1}`}
              aria-pressed={index === currentIndex}
            />
          ))}
        </div>
      </div>
    </section>
  )
} 