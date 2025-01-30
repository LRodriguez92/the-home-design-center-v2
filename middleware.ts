import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Handle admin routes
  if (pathname.startsWith('/admin')) {
    // Skip login page
    if (pathname === '/admin/login') {
      return NextResponse.next()
    }

    // Check for session token
    const sessionToken = request.cookies.get('session')
    if (!sessionToken) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
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
    // Match all paths except static files and api routes
    '/((?!api|_next/static|_next/image|favicon|images|.*\\..*).*)',
  ],
}

