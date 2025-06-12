"use client"

import type React from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import type { TradingInstrument } from "./profile-builder-modal"
import { ArrowRight, TrendingUp, BarChart2, DollarSign, Bitcoin, LineChart, Package } from "lucide-react"

interface InstrumentsStepProps {
  selectedInstruments: TradingInstrument[]
  onToggle: (instrument: TradingInstrument) => void
  onContinue: () => void
}

interface InstrumentOption {
  value: TradingInstrument
  label: string
  icon: React.ElementType
  color: string
}

export function InstrumentsStep({ selectedInstruments, onToggle, onContinue }: InstrumentsStepProps) {
  const options: InstrumentOption[] = [
    {
      value: "Stocks",
      label: "Stocks",
      icon: TrendingUp,
      color: "#3B82F6", // Blue
    },
    {
      value: "Options",
      label: "Options",
      icon: BarChart2,
      color: "#8B5CF6", // Purple
    },
    {
      value: "Forex",
      label: "Forex",
      icon: DollarSign,
      color: "#2563EB", // Darker Blue
    },
    {
      value: "Crypto",
      label: "Crypto",
      icon: Bitcoin,
      color: "#7C3AED", // Darker Purple
    },
    {
      value: "Futures",
      label: "Futures",
      icon: LineChart,
      color: "#3B82F6", // Blue
    },
    {
      value: "Other",
      label: "Other",
      icon: Package,
      color: "#6B7280",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center mb-2">
        <h2 className="text-2xl font-bold text-gray-800">What are you currently trading?</h2>
        <p className="text-gray-600 mt-2">Select all that apply</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {options.map((option) => {
          const Icon = option.icon
          const isSelected = selectedInstruments.includes(option.value)

          return (
            <button
              key={option.value}
              onClick={() => onToggle(option.value)}
              className={`
                relative flex flex-col items-center text-center p-4 rounded-xl border border-gray-200 bg-white
                transition-all duration-300
                ${
                  isSelected
                    ? `border-[${option.color}] bg-[${option.color}]/10`
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }
              `}
            >
              <div
                className={`
                  w-12 h-12 rounded-full flex items-center justify-center mb-3
                  transition-all duration-300
                  ${isSelected ? `bg-[${option.color}]/20` : "bg-blue-50"}
                `}
              >
                <Icon
                  className={`
                    h-6 w-6 transition-all duration-300
                    ${isSelected ? `text-[${option.color}]` : "text-blue-600"}
                  `}
                />
              </div>

              <h3 className="text-sm font-medium text-gray-800">{option.label}</h3>

              {isSelected && <div className="absolute top-2 right-2 w-3 h-3 bg-blue-500 rounded-full"></div>}
            </button>
          )
        })}
      </div>

      <div className="pt-4 flex justify-center">
        <Button
          onClick={onContinue}
          disabled={selectedInstruments.length === 0}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90 font-semibold py-6 px-8 transition-all duration-300 hover:scale-105 disabled:bg-gray-200 disabled:text-gray-400 disabled:hover:scale-100"
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
