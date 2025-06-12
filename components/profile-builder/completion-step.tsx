"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle, Sparkles } from "lucide-react"

interface CompletionStepProps {
  onComplete: () => void
}

export function CompletionStep({ onComplete }: CompletionStepProps) {
  return (
    <div className="flex flex-col items-center text-center space-y-6 py-8">
      <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
        <CheckCircle className="h-10 w-10 text-blue-600" />
      </div>

      <h2 className="text-2xl font-bold text-gray-800">Your Trader's Journey Transformation Starts Now!</h2>

      <p className="text-gray-600 max-w-md">
        We've personalized your experience based on your profile. Your dashboard is ready with tailored insights and
        exercises.
      </p>

      <div className="pt-4 w-full max-w-xs">
        <Button
          onClick={onComplete}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 font-semibold py-6 transition-all duration-300 hover:scale-105 group"
        >
          <span>Let's Go</span>
          <Sparkles className="ml-2 h-4 w-4 group-hover:animate-pulse" />
        </Button>
      </div>
    </div>
  )
}
