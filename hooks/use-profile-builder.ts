"use client"

import { useContext } from "react"
import { ProfileBuilderContext } from "@/contexts/profile-builder-context"

export function useProfileBuilder() {
  const context = useContext(ProfileBuilderContext)

  if (!context) {
    throw new Error("useProfileBuilder must be used within a ProfileBuilderProvider")
  }

  return context
}
