"use client"

import type React from "react"
import type { TradingExperience } from "./profile-builder-modal"
import { Clock, TrendingUp, Award, Trophy } from "lucide-react"
import { useState } from "react"

interface ExperienceStepProps {
  onSelect: (experience: TradingExperience) => void
}

interface ExperienceOption {
  value: TradingExperience
  label: string
  description: string
  icon: React.ElementType
  color: string
}

export function ExperienceStep({ onSelect }: ExperienceStepProps) {
  const [hoveredOption, setHoveredOption] = useState<TradingExperience | null>(null)

  const options: ExperienceOption[] = [
    {
      value: "< 1 year",
      label: "Beginner",
      description: "Just starting my trading journey",
      icon: Clock,
      color: "#4ECDC4",
    },
    {
      value: "1-3 years",
      label: "Intermediate",
      description: "Building my trading skills",
      icon: TrendingUp,
      color: "#FFD700",
    },
    {
      value: "3-5 years",
      label: "Advanced",
      description: "Experienced with consistent results",
      icon: Award,
      color: "#FF6B6B",
    },
    {
      value: "5+ years",
      label: "Expert",
      description: "Seasoned professional trader",
      icon: Trophy,
      color: "#9D65FF",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center mb-2">
        <h2 className="text-2xl font-bold text-white">When did you start trading?</h2>
        <p className="text-gray-400 mt-2">This helps us personalize your experience</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((option) => {
          const Icon = option.icon
          const isHovered = hoveredOption === option.value

          return (
            <button
              key={option.value}
              onClick={() => onSelect(option.value)}
              onMouseEnter={() => setHoveredOption(option.value)}
              onMouseLeave={() => setHoveredOption(null)}
              className={`
                relative flex flex-col items-center text-center p-6 rounded-xl border border-gray-800
                transition-all duration-300 hover:border-[${option.color}] hover:bg-[${option.color}]/5
                ${isHovered ? `border-[${option.color}] bg-[${option.color}]/5 scale-105` : ""}
              `}
            >
              <div
                className={`
                  w-16 h-16 rounded-full flex items-center justify-center mb-4
                  transition-all duration-300
                  ${isHovered ? `bg-[${option.color}]/20` : "bg-gray-800"}
                `}
              >
                <Icon
                  className={`
                    h-8 w-8 transition-all duration-300
                    ${isHovered ? `text-[${option.color}]` : "text-gray-400"}
                  `}
                />
              </div>

              <h3 className="text-lg font-semibold text-white">{option.label}</h3>
              <p className="text-sm text-gray-400 mt-1">{option.value}</p>
              <p className="text-xs text-gray-500 mt-2">{option.description}</p>
            </button>
          )
        })}
      </div>
    </div>
  )
}
