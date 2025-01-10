import Hero from '@/app/components/hero'
import ServicesSection from '@/app/components/services-section'
import TestimonialCarousel from '@/app/components/testimonial-carousel'
import { useTranslations } from '@/app/lib/translations'

export default function SpanishHome() {
  const { t } = useTranslations('es')
  
  return (
    <main>
      <Hero 
        title={t('home.hero.title')}
        subtitle={t('home.hero.subtitle')}
      />
      <ServicesSection lang="es" />
      <TestimonialCarousel lang="es" />
    </main>
  )
} 