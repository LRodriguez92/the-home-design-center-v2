'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTheme } from '@/app/components/theme-provider'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { Label } from '@/app/components/ui/label'

export default function AdminLogin() {
  const router = useRouter()
  const theme = useTheme()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      })

      const data = await response.json()

      if (data.success) {
        document.cookie = 'admin_token=authenticated; path=/; max-age=3600'
        router.push('/admin')
      } else {
        setError('Invalid password')
      }
    } catch {
      setError('An error occurred. Please try again.')
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
          {error && <p className="text-red-500">{error}</p>}
          <Button 
            type="submit" 
            disabled={isLoading}
            className={`w-full px-4 py-3 bg-[${theme.colors.primary}] text-[${theme.colors.onPrimary}] font-semibold rounded-md hover:bg-[${theme.colors.primary}]/90 transition-colors`}
          >
            {isLoading ? 'Logging in...' : 'Log In'}
          </Button>
        </form>
      </div>
    </div>
  )
}

