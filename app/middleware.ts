import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname

  // Check if it's an admin route
  if (path.startsWith('/admin') && path !== '/admin/login') {
    // Get the token from the session cookie
    const token = request.cookies.get('session')

    // If there's no token, redirect to login
    if (!token) {
      const loginUrl = new URL('/admin/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

// Configure the paths that should be matched by this middleware
export const config = {
  matcher: '/admin/:path*'
} 