'use client'

import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import { useRef } from 'react'

export default function LanguageSwitcher() {
  const pathname = usePathname()
  const router = useRouter()
  const buttonRef = useRef<HTMLButtonElement>(null)
  const currentLang = pathname.startsWith('/es') ? 'es' : 'en'

  const switchLanguage = () => {
    const newLang = currentLang === 'en' ? 'es' : 'en'
    const newPath = pathname.replace(/^\/(?:en|es)/, `/${newLang}`)
    router.push(newPath)
    buttonRef.current?.blur()
  }

  return (
    <button
      ref={buttonRef}
      onClick={switchLanguage}
      className="relative flex items-center w-[72px] h-8 bg-black/60 rounded-full p-1 cursor-pointer border border-amber-400/50 hover:border-amber-400 transition-colors duration-300"
      title={currentLang === 'en' ? 'Cambiar a Español' : 'Switch to English'}
    >
      {/* Sliding circle with flag */}
      <div
        className={`absolute flex items-center justify-center w-6 h-6 bg-black/80 rounded-full shadow-sm transition-transform duration-300 ${
          currentLang === 'en' ? 'translate-x-0' : 'translate-x-9'
        }`}
      >
        <div className="relative w-4 h-3">
          <Image
            src={`/images/flags/${currentLang === 'en' ? 'us' : 'es'}.svg`}
            alt={currentLang === 'en' ? 'English' : 'Español'}
            fill
            sizes="16px"
            className="object-cover rounded-[1px]"
          />
        </div>
      </div>
      
      {/* Language text */}
      <span className={`absolute left-8 text-xs font-medium text-amber-400 transition-opacity duration-300 ${
        currentLang === 'en' ? 'opacity-100' : 'opacity-0'
      }`}>
        EN
      </span>
      <span className={`absolute right-8 text-xs font-medium text-amber-400 transition-opacity duration-300 ${
        currentLang === 'es' ? 'opacity-100' : 'opacity-0'
      }`}>
        ES
      </span>
    </button>
  )
} 