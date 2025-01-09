'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Metadata } from 'next'
import AdminDashboard from '../components/admin-dashboard'

export const metadata: Metadata = {
  title: 'Admin Dashboard | Home Design Center',
  description: 'Admin dashboard for managing photos and reviews',
}

export default function AdminPage() {
  const router = useRouter()

  useEffect(() => {
    const adminToken = document.cookie.includes('admin_token=authenticated')
    if (!adminToken) {
      router.push('/admin/login')
    }
  }, [router])

  return (
    <div className="min-h-screen bg-[#0F0F0F] flex flex-col p-4 pt-16">
      <h1 className="text-4xl font-bold mb-8 text-[#F5F5F5]">Admin Dashboard</h1>
      <AdminDashboard className="mt-8" />
    </div>
  )
}

