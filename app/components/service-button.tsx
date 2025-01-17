import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import ServiceButtonSkeleton from './service-button-skeleton'

interface ServiceButtonProps {
  id: string
  title: string
  iconName: string
}

// Create a map of dynamic icon components
const iconComponents = {
  CookingPot: dynamic(() => import('lucide-react').then(mod => mod.CookingPot), {
    loading: () => <div className="w-5 h-5 mr-2 bg-[#C9A227] rounded animate-pulse" />,
    ssr: true
  }),
  Bath: dynamic(() => import('lucide-react').then(mod => mod.Bath), {
    loading: () => <div className="w-5 h-5 mr-2 bg-[#C9A227] rounded animate-pulse" />,
    ssr: true
  }),
  Grid3X3: dynamic(() => import('lucide-react').then(mod => mod.Grid3X3), {
    loading: () => <div className="w-5 h-5 mr-2 bg-[#C9A227] rounded animate-pulse" />,
    ssr: true
  }),
  Lightbulb: dynamic(() => import('lucide-react').then(mod => mod.Lightbulb), {
    loading: () => <div className="w-5 h-5 mr-2 bg-[#C9A227] rounded animate-pulse" />,
    ssr: true
  }),
  PaintBucket: dynamic(() => import('lucide-react').then(mod => mod.PaintBucket), {
    loading: () => <div className="w-5 h-5 mr-2 bg-[#C9A227] rounded animate-pulse" />,
    ssr: true
  }),
  BrickWall: dynamic(() => import('lucide-react').then(mod => mod.BrickWall), {
    loading: () => <div className="w-5 h-5 mr-2 bg-[#C9A227] rounded animate-pulse" />,
    ssr: true
  }),
  Palette: dynamic(() => import('lucide-react').then(mod => mod.Palette), {
    loading: () => <div className="w-5 h-5 mr-2 bg-[#C9A227] rounded animate-pulse" />,
    ssr: true
  }),
  Hammer: dynamic(() => import('lucide-react').then(mod => mod.Hammer), {
    loading: () => <div className="w-5 h-5 mr-2 bg-[#C9A227] rounded animate-pulse" />,
    ssr: true
  })
} as const

function ServiceButton({ id, title, iconName }: ServiceButtonProps) {
  const Icon = iconComponents[iconName as keyof typeof iconComponents]

  return (
    <Suspense fallback={<ServiceButtonSkeleton />}>
      <a
        href={`#${id}`}
        className="inline-flex items-center px-4 py-2 border border-[#C9A227] rounded-md text-[#C9A227] hover:bg-[#C9A227] hover:text-black transition-colors duration-300"
      >
        <Icon className="w-5 h-5 mr-2" />
        {title}
      </a>
    </Suspense>
  )
}

ServiceButton.displayName = 'ServiceButton'

export default ServiceButton 