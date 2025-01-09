'use client'

import { useState } from 'react'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah Johnson',
    review: 'The Home Design Center transformed our outdated kitchen into a modern masterpiece. Their attention to detail and quality craftsmanship exceeded our expectations!',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    review: 'We couldn\'t be happier with our bathroom renovation. The team was professional, efficient, and delivered exactly what we envisioned. Highly recommended!',
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    review: 'The 3D design service was a game-changer for our home makeover. It helped us visualize the end result and make confident decisions. Thank you, Home Design Center!',
    rating: 4,
  },
  {
    name: 'David Thompson',
    review: 'From start to finish, the Home Design Center team was fantastic. They guided us through the entire process and delivered a stunning living room remodel on time and within budget.',
    rating: 5,
  },
]

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-16 md:py-24 bg-[#2D2E2E]">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#FBFBFB] mb-12">
          What Our Clients Say
        </h2>
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <div className="bg-[#0F0F0F] p-8 rounded-lg shadow-lg">
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < testimonial.rating ? 'text-[#BCABAE] fill-[#BCABAE]' : 'text-[#716969]'
                          }`}
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
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-[#BCABAE] text-[#0F0F0F] p-2 rounded-full hover:bg-[#716969] transition-colors duration-300"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 bg-[#BCABAE] text-[#0F0F0F] p-2 rounded-full hover:bg-[#716969] transition-colors duration-300"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
        <div className="flex justify-center mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full mx-1 ${
                index === currentIndex ? 'bg-[#BCABAE]' : 'bg-[#716969]'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

