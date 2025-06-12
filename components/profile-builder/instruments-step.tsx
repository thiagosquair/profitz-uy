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
      color: "#4ECDC4",
    },
    {
      value: "Options",
      label: "Options",
      icon: BarChart2,
      color: "#3B82F6", // Changed to blue
    },
    {
      value: "Forex",
      label: "Forex",
      icon: DollarSign,
      color: "#4F46E5", // Changed to indigo
    },
    {
      value: "Crypto",
      label: "Crypto",
      icon: Bitcoin,
      color: "#9D65FF",
    },
    {
      value: "Futures",
      label: "Futures",
      icon: LineChart,
      color: "#8B5CF6", // Changed to purple
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
      {/* Logo Header */}
      <div className="flex items-center justify-between mb-4">
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
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((step) => (
            <div 
              key={step} 
              className={`w-2 h-2 rounded-full ${
                step <= 2 ? "bg-blue-500" : step === 3 ? "bg-yellow-500" : "bg-gray-600"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="text-center mb-2">
        <h2 className="text-2xl font-bold text-white">What are you currently trading?</h2>
        <p className="text-gray-400 mt-2">Select all that apply</p>
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
                relative flex flex-col items-center text-center p-4 rounded-xl border
                transition-all duration-300
                ${
                  isSelected
                    ? `border-[${option.color}] bg-[${option.color}]/10`
                    : "border-gray-800 hover:border-gray-700 hover:bg-gray-800/50"
                }
              `}
            >
              <div
                className={`
                  w-12 h-12 rounded-full flex items-center justify-center mb-3
                  transition-all duration-300
                  ${isSelected ? `bg-[${option.color}]/20` : "bg-gray-800"}
                `}
              >
                <Icon
                  className={`
                    h-6 w-6 transition-all duration-300
                    ${isSelected ? `text-[${option.color}]` : "text-gray-400"}
                  `}
                />
              </div>

              <h3 className="text-sm font-medium text-white">{option.label}</h3>

              {isSelected && <div className="absolute top-2 right-2 w-3 h-3 bg-blue-500 rounded-full"></div>}
            </button>
          )
        })}
      </div>

      <div className="pt-4 flex justify-center">
        <Button
          onClick={onContinue}
          disabled={selectedInstruments.length === 0}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90 font-semibold py-6 px-8 transition-all duration-300 hover:scale-105 disabled:bg-gray-700 disabled:text-gray-400 disabled:hover:scale-100"
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
