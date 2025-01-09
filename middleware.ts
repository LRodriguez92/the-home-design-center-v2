import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const adminToken = request.cookies.get('admin_token')
  const isAdminPage = request.nextUrl.pathname.startsWith('/admin')
  const isLoginPage = request.nextUrl.pathname === '/admin/login'

  // If trying to access admin pages without token, redirect to login
  if (isAdminPage && !isLoginPage && !adminToken) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  // If trying to access login page with valid token, redirect to admin
  if (isLoginPage && adminToken?.value === 'authenticated') {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
}

