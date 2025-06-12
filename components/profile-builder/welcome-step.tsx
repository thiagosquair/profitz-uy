"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

interface WelcomeStepProps {
  onContinue: () => void
}

export function WelcomeStep({ onContinue }: WelcomeStepProps) {
  return (
    <div className="flex flex-col items-center text-center space-y-6 py-8">
      <div className="w-16 h-16 bg-[#FFD700]/20 rounded-full flex items-center justify-center">
        <Sparkles className="h-8 w-8 text-[#FFD700]" />
      </div>

      <h2 className="text-2xl font-bold text-white">Welcome to ProFitz</h2>

      <p className="text-gray-300 max-w-md">
        You've just taken the first step toward mastering your trader mind. Let's transform your path together.
      </p>

      <div className="pt-4 w-full max-w-xs">
        <Button
          onClick={onContinue}
          className="w-full bg-[#FFD700] text-[#1A1A1A] hover:bg-[#FFD700]/90 font-semibold py-6 transition-all duration-300 hover:scale-105"
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
