'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useTheme } from '@/app/components/theme-provider'
import { useAuth } from '@/app/contexts/auth-context'
import { Button } from '@/app/components/ui/button'
import { toast } from '@/app/components/ui/use-toast'

interface AuthError extends Error {
  message: string;
}

export default function AdminLogin() {
  const router = useRouter()
  const theme = useTheme()
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
      toast({
        title: "Success",
        description: "Logged in successfully with Google",
      })
      setTimeout(() => {
        router.push('/admin')
      }, 500)
    } catch (error) {
      console.error('Google login error:', error)
      const authError = error as AuthError
      toast({
        title: "Error",
        description: authError.message === 'Unauthorized email address'
          ? "This Google account is not authorized to access the admin panel"
          : "Failed to login with Google",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={`min-h-screen flex items-center justify-center bg-[${theme.colors.background}]`}>
      <div className={`w-full max-w-md p-8 space-y-8 bg-transparent border-2 border-[${theme.colors.primary}] rounded-lg`}>
        <h1 className={`text-3xl font-bold text-center text-[${theme.colors.text}]`}>Admin Login</h1>
        <div className="space-y-6">
          <Button 
            onClick={handleGoogleLogin}
            disabled={isLoading}
            variant="outline"
            className="w-full h-12 text-base"
          >
            <svg className="mr-2 h-5 w-5" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
              <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
            </svg>
            {isLoading ? 'Signing in...' : 'Sign in with Google'}
          </Button>
          <p className="text-sm text-center text-muted-foreground">
            Only authorized Google accounts can access the admin panel
          </p>
        </div>
      </div>
    </div>
  )
}

