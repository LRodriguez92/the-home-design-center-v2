'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import { useTheme } from './theme-provider'
import { useTranslations } from '@/app/lib/translations'
import LanguageSwitcher from './language-switcher'

const NavItem = ({ href, children, onClick, isCTA = false }: { href: string; children: React.ReactNode; onClick?: () => void; isCTA?: boolean }) => {
  const pathname = usePathname()
  const currentLang = pathname.startsWith('/es') ? 'es' : 'en'
  const langPrefixedHref = href === '/' ? `/${currentLang}` : `/${currentLang}${href}`
  const isActive = href === '/' 
    ? pathname === `/${currentLang}` 
    : pathname.endsWith(href)
  const theme = useTheme()

  if (isCTA) {
    return (
      <Link
        href={langPrefixedHref}
        className={`block px-4 py-2 rounded-md text-base font-medium bg-[${theme.colors.primary}] text-[${theme.colors.onPrimary}] hover:opacity-90 transition-all duration-200`}
        onClick={onClick}
      >
        {children}
      </Link>
    )
  }

  return (
    <Link
      href={langPrefixedHref}
      className={`block px-3 py-2 text-base font-medium relative group
        ${isActive 
          ? `text-[${theme.colors.primary}] border-b-2 border-[${theme.colors.primary}]` 
          : `text-[${theme.colors.text}] hover:text-[${theme.colors.primary}]`
        } transition-colors duration-200`}
      onClick={onClick}
    >
      {children}
    </Link>
  )
}

export default function Navbar() {
  const theme = useTheme()
  const pathname = usePathname()
  const { t } = useTranslations(pathname?.startsWith('/es') ? 'es' : 'en')
  const [isOpen, setIsOpen] = useState(false)
  const [menuHeight, setMenuHeight] = useState(0)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  const closeMobileMenu = useCallback(() => {
    setIsOpen(false)
  }, [])

  useEffect(() => {
    if (isOpen && mobileMenuRef.current) {
      setMenuHeight(mobileMenuRef.current.scrollHeight)
    } else {
      setMenuHeight(0)
    }
  }, [isOpen])

  return (
    <>
      <nav className={`bg-[${theme.colors.background}] fixed top-0 left-0 right-0 z-50 shadow-md`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="absolute right-0 lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`inline-flex items-center justify-center p-2 rounded-md text-[${theme.colors.text}] hover:text-[${theme.colors.primary}] hover:bg-[${theme.colors.surface}] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[${theme.colors.primary}] transition-colors duration-200`}
                aria-expanded={isOpen}
              >
                <span className="sr-only">{t('navigation.openMenu')}</span>
                {isOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
            
            <div className="flex items-center justify-start w-full lg:w-auto lg:flex-none">
              <div className="flex-shrink-0 flex items-center">
                <Image
                  src="/favicon/favicon-96x96.png"
                  alt={t('navigation.logo')}
                  width={80}
                  height={80}
                  className="hidden min-[410px]:block"
                />
                <Link 
                  href="/" 
                  className={`text-[${theme.colors.primary}] font-bold text-xl`}
                >
                  {t('navigation.title')}
                </Link>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="ml-10 flex items-center space-x-4">
                <NavItem href="/">{t('navigation.home')}</NavItem>
                <NavItem href="/about">{t('navigation.about')}</NavItem>
                <NavItem href="/services">{t('navigation.services')}</NavItem>
                <NavItem href="/projects">{t('navigation.projects')}</NavItem>
                <NavItem href="/contact" isCTA={true}>{t('navigation.contact')}</NavItem>
              </div>
            </div>
          </div>
        </div>

        <div 
          ref={mobileMenuRef}
          className={`lg:hidden absolute top-16 left-0 right-0 bg-[${theme.colors.background}] overflow-hidden transition-all duration-300 ease-in-out`}
          style={{ maxHeight: `${menuHeight}px` }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavItem href="/" onClick={closeMobileMenu}>{t('navigation.home')}</NavItem>
            <NavItem href="/about" onClick={closeMobileMenu}>{t('navigation.about')}</NavItem>
            <NavItem href="/services" onClick={closeMobileMenu}>{t('navigation.services')}</NavItem>
            <NavItem href="/projects" onClick={closeMobileMenu}>{t('navigation.projects')}</NavItem>
            <NavItem href="/contact" onClick={closeMobileMenu} isCTA={true}>{t('navigation.contact')}</NavItem>
          </div>
        </div>
      </nav>
      <div className="fixed top-20 right-4 z-50">
        <LanguageSwitcher isMobileMenuOpen={isOpen} />
      </div>
    </>
  )
}

