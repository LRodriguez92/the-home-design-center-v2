'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/contexts/auth-context'
import { Button } from '@/app/components/ui/button'
import { toast } from '@/app/components/ui/use-toast'
import { Suspense } from 'react'

interface AuthError extends Error {
  message: string;
}

function AdminLoginContent() {
  const router = useRouter()
  const { signInWithGoogle, user, loading } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  // Redirect to admin if already authenticated
  useEffect(() => {
    if (!loading && user) {
      setTimeout(() => {
        router.push('/admin')
      }, 500)
    }
  }, [user, loading, router])

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    try {
      await signInWithGoogle()
    } catch (error) {
      const authError = error as AuthError
      toast({
        title: "Error",
        description: authError.message || "An error occurred during login.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0F0F0F] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-[#1A1A1A] rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold text-center text-[#F5F5F5]">Admin Login</h1>
        <Button
          className="w-full"
          onClick={handleGoogleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-current border-t-transparent animate-spin rounded-full" />
              <span>Logging in...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <svg viewBox="0 0 48 48" className="w-5 h-5">
                <path
                  fill="#FFC107"
                  d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
                />
                <path
                  fill="#FF3D00"
                  d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
                />
                <path
                  fill="#4CAF50"
                  d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
                />
                <path
                  fill="#1976D2"
                  d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
                />
              </svg>
              <span>Sign in with Google</span>
            </div>
          )}
        </Button>
      </div>
    </div>
  )
}

export default function AdminLogin() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0F0F0F]" />}>
      <AdminLoginContent />
    </Suspense>
  )
}

