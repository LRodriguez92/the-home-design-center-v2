import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Skip admin routes
  if (pathname.startsWith('/admin')) {
    return NextResponse.next()
  }

  // If the pathname already has a language prefix, do nothing
  if (pathname.startsWith('/en') || pathname.startsWith('/es')) {
    return NextResponse.next()
  }
  
  // Get the preferred language from the Accept-Language header
  const acceptLanguage = request.headers.get('accept-language')
  let lang = 'en' // Default to English
  
  if (acceptLanguage) {
    // Check if Spanish is preferred
    if (acceptLanguage.startsWith('es')) {
      lang = 'es'
    }
  }
  
  // Special case for the root path
  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${lang}`, request.url))
  }
  
  // Redirect to the same path with language prefix
  return NextResponse.redirect(new URL(`/${lang}${pathname}`, request.url))
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    // Skip all API routes
    // Skip all static files
    // Skip admin routes
    '/((?!_next|api|static|admin|.*\\..*).*)',
  ],
}

