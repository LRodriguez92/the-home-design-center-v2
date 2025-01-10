'use client'

import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'

export default function FloatingLanguageSwitcher() {
  const pathname = usePathname()
  const router = useRouter()
  const currentLang = pathname?.startsWith('/es') ? 'es' : 'en'

  const switchLanguage = (lang: 'en' | 'es') => {
    if (lang === currentLang) return
    const newPath = pathname?.replace(/^\/(?:en|es)/, `/${lang}`) || `/${lang}`
    router.push(newPath)
  }

  return (
    <div className="fixed right-4 top-20 z-40">
      <button
        onClick={() => switchLanguage(currentLang === 'en' ? 'es' : 'en')}
        className="relative flex items-center w-[72px] h-8 bg-black/60 rounded-full p-1 cursor-pointer border border-amber-400/50 hover:border-amber-400/80 transition-colors duration-300"
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
              alt=""
              layout="fill"
              objectFit="cover"
              className="rounded-[1px]"
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
    </div>
  )
} 