import Hero from '@/app/components/hero'
import ServicesSection from '@/app/components/services-section'
import ReviewCarousel from '@/app/components/review-carousel'
import { useTranslations } from '@/app/lib/translations'

export default function EnglishHome() {
  const { t } = useTranslations('en')
  
  return (
    <main>
      <Hero 
        title={t('home.hero.title')}
        subtitle={t('home.hero.subtitle')}
      />
      <ServicesSection lang="en" />
      <ReviewCarousel lang="en" />
    </main>
  )
} 