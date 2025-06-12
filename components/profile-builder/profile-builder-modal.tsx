"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import Image from "next/image"
import { WelcomeStep } from "./welcome-step"
import { ExperienceStep } from "./experience-step"
import { InstrumentsStep } from "./instruments-step"
import { PsychologyAssessmentStep } from "./psychology-assessment-step"
import { AssessmentResultsStep } from "./assessment-results-step"
import { CompletionStep } from "./completion-step"
import { useRouter } from "next/navigation"

// Rest of the imports and interfaces remain unchanged...

export function ProfileBuilderModal({ open, onOpenChange }: ProfileBuilderModalProps) {
  // All state management and handlers remain unchanged...

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] p-0 bg-[#1A1A1A] border-gray-800 overflow-hidden">
        {/* Progress bar */}
        <div className="w-full h-1 bg-gray-800">
          <div className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
        </div>

        {/* Logo and step indicator */}
        <div className="flex items-center justify-between px-6 pt-6">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10">
              <Image 
                src="/profitz-logo-large.png" 
                alt="ProFitz Logo" 
                width={40} 
                height={40} 
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-lg font-bold text-white">ProFitz</span>
          </div>
          <div className="flex items-center space-x-1">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === step ? "bg-blue-500 w-6" : i < step ? "bg-blue-500/50" : "bg-gray-700"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step content - remains unchanged */}
        <div className="p-6">
          {/* All step components remain unchanged */}
        </div>
      </DialogContent>
    </Dialog>
  )
}
