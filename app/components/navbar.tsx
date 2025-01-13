'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import { useTheme } from './theme-provider'
import { useTranslations } from '@/app/lib/translations'

const NavItem = ({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) => {
  const pathname = usePathname()
  const currentLang = pathname.startsWith('/es') ? 'es' : 'en'
  const langPrefixedHref = href === '/' ? `/${currentLang}` : `/${currentLang}${href}`
  const isActive = pathname === langPrefixedHref
  const theme = useTheme()

  return (
    <Link
      href={langPrefixedHref}
      className={`block w-full px-3 py-2 rounded-md text-base font-medium ${
        isActive
          ? `bg-[${theme.colors.primary}] text-[${theme.colors.onPrimary}]`
          : `text-[${theme.colors.text}] hover:bg-[${theme.colors.surface}] hover:text-[${theme.colors.primary}]`
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
    <nav className={`bg-[${theme.colors.background}] fixed top-0 left-0 right-0 z-50`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute right-0 md:hidden">
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
          
          <div className="flex items-center justify-start w-full md:w-auto md:flex-none">
            <div className="flex-shrink-0 flex items-center">
              <Image
                src="/images/logo-gold.png"
                alt={t('navigation.logo')}
                width={100}
                height={100}
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

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <NavItem href="/">{t('navigation.home')}</NavItem>
              <NavItem href="/services">{t('navigation.services')}</NavItem>
              <NavItem href="/projects">{t('navigation.projects')}</NavItem>
              <NavItem href="/contact">{t('navigation.contact')}</NavItem>
            </div>
          </div>
        </div>
      </div>

      <div 
        ref={mobileMenuRef}
        className={`md:hidden absolute top-16 left-0 right-0 bg-[${theme.colors.background}] overflow-hidden transition-all duration-300 ease-in-out`}
        style={{ maxHeight: `${menuHeight}px` }}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <NavItem href="/" onClick={closeMobileMenu}>{t('navigation.home')}</NavItem>
          <NavItem href="/services" onClick={closeMobileMenu}>{t('navigation.services')}</NavItem>
          <NavItem href="/projects" onClick={closeMobileMenu}>{t('navigation.projects')}</NavItem>
          <NavItem href="/contact" onClick={closeMobileMenu}>{t('navigation.contact')}</NavItem>
        </div>
      </div>
    </nav>
  )
}

