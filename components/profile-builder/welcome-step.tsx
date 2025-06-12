"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface WelcomeStepProps {
  onContinue: () => void
}

export function WelcomeStep({ onContinue }: WelcomeStepProps) {
  return (
    <div className="flex flex-col items-center text-center space-y-6 py-8">
      <h2 className="text-2xl font-bold text-gray-800">Welcome to ProFitz</h2>

      <p className="text-gray-600 max-w-md">
        You've just taken the first step toward mastering your trader mind. Let's transform your path together.
      </p>

      <div className="pt-4 w-full max-w-xs">
        <Button
          onClick={onContinue}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 font-semibold py-6 transition-all duration-300 hover:scale-105"
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
