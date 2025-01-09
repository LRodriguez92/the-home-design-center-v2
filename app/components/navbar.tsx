'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { ChevronDown, Menu, X } from 'lucide-react'
import Image from 'next/image'
import { useTheme } from './theme-provider'

const NavItem = ({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) => {
  const pathname = usePathname()
  const isActive = pathname === href
  const theme = useTheme()

  return (
    <Link
      href={href}
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
  const [isOpen, setIsOpen] = useState(false)
  const [menuHeight, setMenuHeight] = useState(0)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const [isAdmin, setIsAdmin] = useState(false)

  const closeMobileMenu = useCallback(() => {
    setIsOpen(false)
  }, [])

  useEffect(() => {
    const adminToken = document.cookie.includes('admin_token=authenticated')
    setIsAdmin(adminToken)
  }, [])

  useEffect(() => {
    if (isOpen && mobileMenuRef.current) {
      setMenuHeight(mobileMenuRef.current.scrollHeight)
    } else {
      setMenuHeight(0)
    }
  }, [isOpen])

  return (
    <nav className={`bg-[${theme.colors.background}] sticky top-0 z-50`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Image
                src="/images/logo.svg"
                alt="Home Design Center Logo"
                width={40}
                height={40}
                className="mr-3"
              />
              <Link href="/" className={`text-[${theme.colors.primary}] font-bold text-xl`}>
                Home Design Center
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <NavItem href="/">Home</NavItem>
              <NavItem href="/services">Services</NavItem>
              <NavItem href="/projects">Projects</NavItem>
              <NavItem href="/contact">Contact</NavItem>
              {isAdmin && <NavItem href="/admin">Admin</NavItem>}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md text-[${theme.colors.text}] hover:text-[${theme.colors.primary}] hover:bg-[${theme.colors.surface}] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[${theme.colors.primary}] transition-colors duration-200`}
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div 
        ref={mobileMenuRef}
        className={`md:hidden absolute top-16 left-0 right-0 bg-[${theme.colors.background}] overflow-hidden transition-all duration-300 ease-in-out`}
        style={{ maxHeight: `${menuHeight}px` }}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <NavItem href="/" onClick={closeMobileMenu}>Home</NavItem>
          <NavItem href="/services" onClick={closeMobileMenu}>Services</NavItem>
          <NavItem href="/projects" onClick={closeMobileMenu}>Projects</NavItem>
          <NavItem href="/contact" onClick={closeMobileMenu}>Contact</NavItem>
          {isAdmin && <NavItem href="/admin" onClick={closeMobileMenu}>Admin</NavItem>}
        </div>
      </div>
    </nav>
  )
}

