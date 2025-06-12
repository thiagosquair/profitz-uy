"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { ProfileBuilderModal } from "@/components/profile-builder/profile-builder-modal"
import { InitialProfileModal } from "@/components/profile-builder/initial-profile-modal"
import { getCurrentUser, needsInitialProfile } from "@/lib/auth-simulation"

interface ProfileBuilderContextType {
  showPsychologyAssessment: () => void
  hidePsychologyAssessment: () => void
  isPsychologyAssessmentOpen: boolean
}

const ProfileBuilderContext = createContext<ProfileBuilderContextType | undefined>(undefined)

export function ProfileBuilderProvider({ children }: { children: ReactNode }) {
  const [isPsychologyAssessmentOpen, setIsPsychologyAssessmentOpen] = useState(false)
  const [isInitialProfileOpen, setIsInitialProfileOpen] = useState(false)
  const [hasChecked, setHasChecked] = useState(false)

  // Check if user needs initial profile or psychology assessment
  useEffect(() => {
    if (hasChecked) return

    const checkUserProfile = () => {
      const user = getCurrentUser()

      if (user) {
        // Check for initial profile setup (only for new signups)
        if (needsInitialProfile()) {
          setTimeout(() => {
            setIsInitialProfileOpen(true)
            setHasChecked(true)
          }, 1000)
        } else {
          setHasChecked(true)
        }
      } else {
        setHasChecked(true)
      }
    }

    // Check immediately
    checkUserProfile()

    // Listen for signup events (not signin)
    const handleUserSignedUp = () => {
      setTimeout(() => {
        checkUserProfile()
      }, 500)
    }

    window.addEventListener("userSignedUp", handleUserSignedUp)

    return () => {
      window.removeEventListener("userSignedUp", handleUserSignedUp)
    }
  }, [hasChecked])

  const showPsychologyAssessment = () => setIsPsychologyAssessmentOpen(true)
  const hidePsychologyAssessment = () => setIsPsychologyAssessmentOpen(false)

  return (
    <ProfileBuilderContext.Provider
      value={{
        showPsychologyAssessment,
        hidePsychologyAssessment,
        isPsychologyAssessmentOpen,
      }}
    >
      {children}

      {/* Initial Profile Modal - Only shows once after signup */}
      <InitialProfileModal open={isInitialProfileOpen} onOpenChange={setIsInitialProfileOpen} />

      {/* Psychology Assessment Modal - Can be opened anytime from dashboard */}
      <ProfileBuilderModal open={isPsychologyAssessmentOpen} onOpenChange={setIsPsychologyAssessmentOpen} />
    </ProfileBuilderContext.Provider>
  )
}

export function useProfileBuilder() {
  const context = useContext(ProfileBuilderContext)
  if (context === undefined) {
    throw new Error("useProfileBuilder must be used within a ProfileBuilderProvider")
  }
  return context
}
