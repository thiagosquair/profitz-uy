// app/dashboard/page.tsx - Fixed version with proper i18n context
"use client"

import { ProfileBuilderProvider } from "@/providers/profile-builder-provider"
import DashboardContent from "./dashboard-content"

// Force dynamic rendering to avoid SSR issues
export const dynamic = 'force-dynamic'

export default function DashboardPage() {
  return (
    <ProfileBuilderProvider>
      <DashboardContent />
    </ProfileBuilderProvider>
  )
}

