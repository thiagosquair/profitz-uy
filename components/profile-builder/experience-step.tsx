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
      color: "#3B82F6", // Blue
    },
    {
      value: "1-3 years",
      label: "Intermediate",
      description: "Building my trading skills",
      icon: TrendingUp,
      color: "#8B5CF6", // Purple
    },
    {
      value: "3-5 years",
      label: "Advanced",
      description: "Experienced with consistent results",
      icon: Award,
      color: "#2563EB", // Darker Blue
    },
    {
      value: "5+ years",
      label: "Expert",
      description: "Seasoned professional trader",
      icon: Trophy,
      color: "#7C3AED", // Darker Purple
    },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center mb-2">
        <h2 className="text-2xl font-bold text-gray-800">When did you start trading?</h2>
        <p className="text-gray-600 mt-2">This helps us personalize your experience</p>
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
                relative flex flex-col items-center text-center p-6 rounded-xl border border-gray-200 bg-white
                transition-all duration-300 hover:border-[${option.color}] hover:bg-[${option.color}]/5
                ${isHovered ? `border-[${option.color}] bg-[${option.color}]/5 scale-105` : ""}
              `}
            >
              <div
                className={`
                  w-16 h-16 rounded-full flex items-center justify-center mb-4
                  transition-all duration-300
                  ${isHovered ? `bg-[${option.color}]/20` : "bg-blue-50"}
                `}
              >
                <Icon
                  className={`
                    h-8 w-8 transition-all duration-300
                    ${isHovered ? `text-[${option.color}]` : "text-blue-600"}
                  `}
                />
              </div>

              <h3 className="text-lg font-semibold text-gray-800">{option.label}</h3>
              <p className="text-sm text-gray-600 mt-1">{option.value}</p>
              <p className="text-xs text-gray-500 mt-2">{option.description}</p>
            </button>
          )
        })}
      </div>
    </div>
  )
}
