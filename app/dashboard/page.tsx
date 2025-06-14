// app/dashboard/page.tsx
"use client"

import dynamicImport from 'next/dynamic'
import { ProfileBuilderProvider } from "@/providers/profile-builder-provider"

// Disable static generation
export const dynamic = 'force-dynamic'

// Dynamically import the dashboard content to ensure it only renders on client
const DashboardContent = dynamicImport(() => import('./dashboard-content'), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-screen bg-gray-50 items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Loading your dashboard...</p>
      </div>
    </div>
  )
})

export default function DashboardPage() {
  return (
    <ProfileBuilderProvider>
      <DashboardContent />
    </ProfileBuilderProvider>
  )
}

