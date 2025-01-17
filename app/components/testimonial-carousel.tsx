'use client'

import { useState } from 'react'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/app/components/ui/button'
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from '@/app/components/ui/dialog'
import ReviewSubmissionForm from '@/app/components/review-submission-form'
import { useTheme } from './theme-provider'
import { useTranslations, type Language } from '@/app/lib/translations'
import { usePathname } from 'next/navigation'

interface TestimonialCarouselProps {
  lang?: Language
}

interface Testimonial {
  name: string
  review: string
  rating: number
}

export default function TestimonialCarousel({ lang }: TestimonialCarouselProps) {
  const theme = useTheme()
  const pathname = usePathname()
  const currentLang = lang || (pathname.startsWith('/es') ? 'es' : 'en')
  const { t } = useTranslations(currentLang)
  const testimonials = (t('testimonials.items') as unknown) as Testimonial[]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  const handleReviewSubmit = () => {
    setIsReviewDialogOpen(false)
    setTimeout(() => {
      setShowSuccessMessage(true)
      setTimeout(() => {
        setShowSuccessMessage(false)
      }, 2000)
    }, 100)
  }

  return (
    <section 
      className="py-16 md:py-24"
      style={{ backgroundColor: theme.colors.background }}
      aria-labelledby="testimonials-title"
    >
      {showSuccessMessage && (
        <div 
          className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg shadow-lg z-50" 
          role="alert"
          aria-live="polite"
        >
          <span className="block font-medium">{t('testimonials.successMessage.title')}</span>
          <span className="block">{t('testimonials.successMessage.message')}</span>
        </div>
      )}
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <h2 
          id="testimonials-title"
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          style={{ color: theme.colors.text }}
        >
          {t('testimonials.title')}
        </h2>
        <div 
          className="relative"
          role="region"
          aria-roledescription="carousel"
          aria-label={t('testimonials.title')}
        >
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
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
                            i < testimonial.rating ? 'text-[#C9A227] fill-[#C9A227]' : 'text-[#C9A227]'
                          }`}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <p className="text-[#FBFBFB] mb-4">{testimonial.review}</p>
                    <p className="text-[#BCABAE] font-semibold">{testimonial.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-[#BCABAE] text-[#0F0F0F] p-2 rounded-full hover:bg-[#716969] transition-colors duration-300 focus:ring-2 focus:ring-offset-2 focus:ring-[#BCABAE] focus:outline-none min-h-[48px] min-w-[48px]"
            aria-label={t('testimonials.submitButton')}
          >
            <ChevronLeft className="w-6 h-6" aria-hidden="true" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 bg-[#BCABAE] text-[#0F0F0F] p-2 rounded-full hover:bg-[#716969] transition-colors duration-300 focus:ring-2 focus:ring-offset-2 focus:ring-[#BCABAE] focus:outline-none min-h-[48px] min-w-[48px]"
            aria-label={t('testimonials.submitButton')}
          >
            <ChevronRight className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>
        <div className="flex justify-center mt-8">
          <Dialog 
            open={isReviewDialogOpen} 
            onOpenChange={setIsReviewDialogOpen}
          >
            <DialogTrigger asChild>
              <Button 
                className={`bg-[${theme.colors.primary}] text-[${theme.colors.onPrimary}] hover:bg-[${theme.colors.primary}]/90 focus:ring-2 focus:ring-offset-2 focus:ring-[${theme.colors.primary}] focus:outline-none min-h-[48px]`}
                aria-label={t('testimonials.submitButton')}
              >
                {t('testimonials.submitButton')}
              </Button>
            </DialogTrigger>
            <DialogContent 
              className={`bg-[${theme.colors.background}] text-[${theme.colors.text}]`}
              aria-labelledby="review-dialog-title"
            >
              <DialogHeader>
                <DialogTitle id="review-dialog-title">{t('testimonials.submitDialog.title')}</DialogTitle>
              </DialogHeader>
              <ReviewSubmissionForm onSubmit={handleReviewSubmit} />
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex justify-center mt-6 gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? 'bg-[#BCABAE]' : 'bg-[#716969]'
              } focus:ring-2 focus:ring-offset-2 focus:ring-[#BCABAE] focus:outline-none min-h-[24px] min-w-[24px]`}
              aria-label={`${t('testimonials.submitButton')} ${index + 1}`}
              aria-pressed={index === currentIndex}
            />
          ))}
        </div>
      </div>
    </section>
  )
}