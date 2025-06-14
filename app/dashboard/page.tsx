// app/dashboard/page.tsx
"use client"

import { ProfileBuilderProvider } from "@/providers/profile-builder-provider"
import DashboardContent from "./dashboard-content"

export const dynamic = 'force-dynamic'

export default function DashboardPage() {
  return (
    <ProfileBuilderProvider>
      <DashboardContent />
    </ProfileBuilderProvider>
  )
}


