"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"

interface GoogleAuthButtonProps {
  mode: "signin" | "signup"
  onSuccess?: () => void
}

export function GoogleAuthButton({ mode, onSuccess }: GoogleAuthButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleGoogleAuth = async () => {
    setIsLoading(true)

    // Simulate Google OAuth flow
    try {
      // In a real implementation, this would integrate with Google OAuth
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Simulate successful authentication
      console.log(`Google ${mode} successful`)
      onSuccess?.()
    } catch (error) {
      console.error("Google auth error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant="outline"
      className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-[#FFD700]/50 transition-all duration-300 group relative overflow-hidden"
      onClick={handleGoogleAuth}
      disabled={isLoading}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700]/0 to-[#FFD700]/0 group-hover:from-[#FFD700]/5 group-hover:to-[#FFD700]/10 transition-all duration-300"></div>
      <div className="relative flex items-center justify-center space-x-2">
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-gray-400 border-t-[#FFD700] rounded-full animate-spin"></div>
        ) : (
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
        )}
        <span>{isLoading ? "Connecting..." : `Continue with Google`}</span>
      </div>
    </Button>
  )
}
