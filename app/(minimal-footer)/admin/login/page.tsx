'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useTheme } from '@/app/components/theme-provider'
import { useAuth } from '@/app/contexts/auth-context'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { Label } from '@/app/components/ui/label'
import { toast } from '@/app/components/ui/use-toast'

interface AuthError extends Error {
  message: string;
}

export default function AdminLogin() {
  const router = useRouter()
  const theme = useTheme()
  const { signIn, signInWithGoogle, user, loading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Redirect to admin if already authenticated
  useEffect(() => {
    if (!loading && user) {
      setTimeout(() => {
        router.push('/admin')
      }, 500)
    }
  }, [user, loading, router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await signIn(email, password)
      toast({
        title: "Success",
        description: "Logged in successfully",
      })
      setTimeout(() => {
        router.push('/admin')
      }, 500)
    } catch (error) {
      console.error('Login error:', error)
      const authError = error as AuthError
      toast({
        title: "Error",
        description: authError.message === 'Unauthorized email address' 
          ? "This email is not authorized to access the admin panel"
          : "Invalid credentials",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

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
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <Label htmlFor="email" className={`text-[${theme.colors.text}]`}>Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
              className={`w-full px-3 py-2 bg-transparent text-[${theme.colors.text}] border-b-2 border-[${theme.colors.primary}] focus:outline-none focus:border-[${theme.colors.secondary}] transition-colors`}
            />
          </div>
          <div>
            <Label htmlFor="password" className={`text-[${theme.colors.text}]`}>Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
              className={`w-full px-3 py-2 bg-transparent text-[${theme.colors.text}] border-b-2 border-[${theme.colors.primary}] focus:outline-none focus:border-[${theme.colors.secondary}] transition-colors`}
            />
          </div>
          <div className="space-y-4">
            <Button 
              type="submit" 
              disabled={isLoading}
              className={`w-full px-4 py-3 bg-[${theme.colors.primary}] text-[${theme.colors.onPrimary}] font-semibold rounded-md hover:bg-[${theme.colors.primary}]/90 transition-colors`}
            >
              {isLoading ? 'Logging in...' : 'Log In'}
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            <Button 
              type="button"
              onClick={handleGoogleLogin}
              disabled={isLoading}
              variant="outline"
              className="w-full"
            >
              <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
              </svg>
              Sign in with Google
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

