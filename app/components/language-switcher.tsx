'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Button } from './ui/button'
import Image from 'next/image'

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
  const nextLang = currentLang === 'en' ? 'es' : 'en'
  const flagSrc = `/images/flags/${nextLang}.svg`

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={switchLanguage}
      className="px-2 h-8 w-8"
    >
      <Image
        src={flagSrc}
        alt={`Switch to ${nextLang.toUpperCase()}`}
        width={20}
        height={20}
      />
    </Button>
  )
} 