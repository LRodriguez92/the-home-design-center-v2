'use client'

import { useState, useCallback } from 'react'
import { useTheme } from './theme-provider'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs'
import PhotoUpload from './photo-upload'
import PhotoManager from './photo-manager'
import ReviewApproval from './review-approval'

interface AdminDashboardProps {
  className?: string
}

export default function AdminDashboard({ className }: AdminDashboardProps) {
  const theme = useTheme()
  const [activeTab, setActiveTab] = useState('photos')
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleRefresh = useCallback(() => {
    setRefreshTrigger(prev => prev + 1)
  }, [])

  return (
    <div className={`min-h-screen bg-[#0F0F0F] p-6 ${className || ''}`}>
      <div className="max-w-6xl mx-auto">
        <h1 className={`text-3xl font-bold text-[${theme.colors.text}] mb-6`}>Admin Dashboard</h1>
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-[#1C1F33] p-1 rounded-lg relative h-12">
            <span 
              className={`absolute top-1 bottom-1 w-[calc(50%-0.25rem)] bg-[${theme.colors.primary}] rounded-md transition-transform duration-300 ease-in-out ${
                activeTab === 'reviews' ? 'translate-x-[calc(100%+0.5rem)]' : ''
              }`} 
              aria-hidden="true"
            />
            <TabsTrigger 
              value="photos" 
              className="w-full h-full px-3 rounded-md text-sm font-medium transition-colors relative z-10 inline-flex items-center justify-center text-[#F5F5F5] hover:text-[#F5F5F5] data-[state=active]:text-[#0F0F0F] data-[state=inactive]:hover:text-[#C9A227] bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              Photo Management
            </TabsTrigger>
            <TabsTrigger 
              value="reviews" 
              className="w-full h-full px-3 rounded-md text-sm font-medium transition-colors relative z-10 inline-flex items-center justify-center text-[#F5F5F5] hover:text-[#F5F5F5] data-[state=active]:text-[#0F0F0F] data-[state=inactive]:hover:text-[#C9A227] bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              Review Approval
            </TabsTrigger>
          </TabsList>
          <TabsContent value="photos" className="mt-6 space-y-6">
            <div className={`rounded-md border border-[${theme.colors.surface}] bg-transparent p-6 text-[${theme.colors.textMuted}]`}>
              <PhotoUpload refreshPhotos={handleRefresh} />
            </div>
            <div className={`rounded-md border border-[${theme.colors.surface}] bg-transparent p-6 text-[${theme.colors.textMuted}]`}>
              <PhotoManager refreshTrigger={refreshTrigger} />
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="mt-6">
            <div className={`rounded-md border border-[${theme.colors.surface}] bg-transparent p-6 text-[${theme.colors.textMuted}]`}>
              <ReviewApproval />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}