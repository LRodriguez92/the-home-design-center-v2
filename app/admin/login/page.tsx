'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTheme } from '../../components/theme-provider'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { Label } from '@/app/components/ui/label'

export default function AdminLogin() {
  const theme = useTheme()
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would validate credentials against a backend
    if (username === 'admin' && password === 'password') {
      // Set a cookie to simulate authentication
      document.cookie = 'admin_token=authenticated; path=/; max-age=3600'
      router.push('/admin')
    } else {
      setError('Invalid credentials')
    }
  }

  return (
    <div className={`min-h-screen flex items-center justify-center bg-[${theme.colors.background}]`}>
      <div className={`w-full max-w-md p-8 space-y-8 bg-transparent border-2 border-[${theme.colors.primary}] rounded-lg`}>
        <h1 className={`text-3xl font-bold text-center text-[${theme.colors.text}]`}>Admin Login</h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <Label htmlFor="username" className={`text-[${theme.colors.text}]`}>Username</Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
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
              className={`w-full px-3 py-2 bg-transparent text-[${theme.colors.text}] border-b-2 border-[${theme.colors.primary}] focus:outline-none focus:border-[${theme.colors.secondary}] transition-colors`}
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <Button 
            type="submit" 
            className={`w-full px-4 py-3 bg-[${theme.colors.primary}] text-[${theme.colors.onPrimary}] font-semibold rounded-md hover:bg-[${theme.colors.primary}]/90 transition-colors`}
          >
            Log In
          </Button>
        </form>
      </div>
    </div>
  )
}

