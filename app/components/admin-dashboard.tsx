'use client'

import { useState, useCallback } from 'react'
import { useTheme } from './theme-provider'
import { useAuth } from '@/app/contexts/auth-context'
import { Button } from '@/app/components/ui/button'
import { useToast } from '@/app/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import PhotoUpload from './photo-upload'
import PhotoManager from './photo-manager'

interface AdminDashboardProps {
  className?: string
}

export default function AdminDashboard({ className }: AdminDashboardProps) {
  const theme = useTheme()
  const router = useRouter()
  const { toast } = useToast()
  const { logOut } = useAuth()
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleRefresh = useCallback(() => {
    setRefreshTrigger(prev => prev + 1)
  }, [])

  const handleLogout = useCallback(async () => {
    try {
      await logOut()
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of the admin dashboard",
        variant: "default",
      })
      router.push('/admin/login')
    } catch (error) {
      console.error('Logout error:', error)
      toast({
        title: "Error",
        description: "Failed to log out",
        variant: "destructive",
      })
    }
  }, [logOut, router, toast])

  return (
    <div className={`min-h-screen bg-[#0F0F0F] p-6 ${className || ''}`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className={`text-3xl font-bold text-[${theme.colors.text}]`}>Admin Dashboard</h1>
          <Button 
            onClick={handleLogout}
            variant="destructive"
            className="bg-red-600 hover:bg-red-700"
          >
            Logout
          </Button>
        </div>
        <div className="space-y-6">
          <div className={`rounded-md border border-[${theme.colors.surface}] bg-transparent p-6 text-[${theme.colors.textMuted}]`}>
            <PhotoUpload refreshPhotos={handleRefresh} />
          </div>
          <div className={`rounded-md border border-[${theme.colors.surface}] bg-transparent p-6 text-[${theme.colors.textMuted}]`}>
            <PhotoManager refreshTrigger={refreshTrigger} />
          </div>
        </div>
      </div>
    </div>
  )
}