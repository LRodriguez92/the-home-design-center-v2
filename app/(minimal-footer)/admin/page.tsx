'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/contexts/auth-context'
import AdminDashboard from '@/app/components/admin-dashboard'

export default function AdminPage() {
  const router = useRouter()
<<<<<<< HEAD
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const adminToken = document.cookie.includes('admin_token=authenticated')
    if (!adminToken) {
      router.replace('/admin/login')
    } else {
      setIsAuthenticated(true)
=======
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace('/admin/login')
      }
>>>>>>> add-login
    }
  }, [loading, user, router])

  if (loading || !user) {
    return null
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-[#0F0F0F] flex flex-col p-4 pt-16">
      <AdminDashboard className="mt-8" />
    </div>
  )
}

