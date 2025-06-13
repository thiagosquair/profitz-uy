"use client"

import { createContext } from "react"

export interface ProfileBuilderContextType {
  showPsychologyAssessment: () => void
}

export const ProfileBuilderContext = createContext<ProfileBuilderContextType | null>(null)
