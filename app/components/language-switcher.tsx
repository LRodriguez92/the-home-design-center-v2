'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Button } from './ui/button'
import Image from 'next/image'
import { useRef } from 'react'

export default function LanguageSwitcher() {
  const pathname = usePathname()
  const router = useRouter()
  const buttonRef = useRef<HTMLButtonElement>(null)

  const switchLanguage = () => {
    const currentLang = pathname.startsWith('/es') ? 'es' : 'en'
    const newLang = currentLang === 'en' ? 'es' : 'en'
    
    // Remove current language prefix and add new one
    const newPath = pathname.replace(/^\/(?:en|es)/, '')
    router.push(`/${newLang}${newPath}`)
    
    // Remove focus
    buttonRef.current?.blur()
  }

  const currentLang = pathname.startsWith('/es') ? 'es' : 'en'
  const flagCode = currentLang === 'en' ? 'us' : 'es'
  const flagSrc = `/images/flags/${flagCode}.svg`

  return (
    <Button
      ref={buttonRef}
      variant="ghost"
      size="sm"
      onClick={switchLanguage}
      className="px-2 h-8 w-8 flex items-center justify-center hover:bg-transparent focus:bg-transparent active:bg-transparent"
    >
      <div className="w-[24px] h-[16px] relative">
        <Image
          src={flagSrc}
          alt={`Current language: ${currentLang.toUpperCase()}`}
          fill
          sizes="24px"
          className="object-fill"
        />
      </div>
    </Button>
  )
} 