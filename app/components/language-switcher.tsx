'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Button } from './ui/button'

export default function LanguageSwitcher() {
  const pathname = usePathname()
  const router = useRouter()

  const switchLanguage = () => {
    const currentLang = pathname.startsWith('/es') ? 'es' : 'en'
    const newLang = currentLang === 'en' ? 'es' : 'en'
    
    // Remove current language prefix and add new one
    const newPath = pathname.replace(/^\/(?:en|es)/, '')
    router.push(`/${newLang}${newPath}`)
  }

  const currentLang = pathname.startsWith('/es') ? 'es' : 'en'

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={switchLanguage}
      className="px-2"
    >
      {currentLang.toUpperCase()}
    </Button>
  )
} 