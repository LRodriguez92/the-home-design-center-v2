'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/contexts/auth-context'
import AdminDashboard from '@/app/components/admin-dashboard'

export default function AdminPage() {
  const router = useRouter()
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace('/admin/login')
      }
    }
  }, [loading, user, router])

  if (loading || !user) {
    return null
  }

  return (
    <div className="min-h-screen bg-[#0F0F0F] flex flex-col p-4 pt-16">
      <AdminDashboard className="mt-8" />
    </div>
  )
}

