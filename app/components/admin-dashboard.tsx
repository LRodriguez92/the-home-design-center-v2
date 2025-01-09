'use client'

import { useState } from 'react'
import { useTheme } from './theme-provider'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs'
import PhotoUpload from './photo-upload'
import ReviewApproval from './review-approval'

export default function AdminDashboard() {
  const theme = useTheme()
  const [activeTab, setActiveTab] = useState('photos')

  return (
    <div className="w-full max-w-3xl">
      <div className="fixed top-16 left-0 right-0 bg-[#0F0F0F] z-10 p-6">
        <h1 className={`text-3xl font-bold text-[${theme.colors.text}] mb-6`}>Admin Dashboard</h1>
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className={`grid w-full grid-cols-2 bg-[${theme.colors.surface}] p-1 rounded-lg`}>
            <TabsTrigger 
              value="photos" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors data-[state=active]:bg-[${theme.colors.primary}] data-[state=active]:text-[${theme.colors.onPrimary}] data-[state=inactive]:text-[${theme.colors.text}] data-[state=inactive]:hover:bg-[${theme.colors.surface}]/80`}
            >
              Photo Management
            </TabsTrigger>
            <TabsTrigger 
              value="reviews" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors data-[state=active]:bg-[${theme.colors.primary}] data-[state=active]:text-[${theme.colors.onPrimary}] data-[state=inactive]:text-[${theme.colors.text}] data-[state=inactive]:hover:bg-[${theme.colors.surface}]/80`}
            >
              Review Approval
            </TabsTrigger>
          </TabsList>
          <TabsContent value="photos" className="mt-6">
            <div className={`rounded-md border border-[${theme.colors.border}] p-6 text-[${theme.colors.textMuted}]`}>
              <PhotoUpload />
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="mt-6">
            <div className={`rounded-md border border-[${theme.colors.border}] p-6 text-[${theme.colors.textMuted}]`}>
              <ReviewApproval />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

