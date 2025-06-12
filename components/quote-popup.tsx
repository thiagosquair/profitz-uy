"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { getDailyQuote } from "@/lib/quotes"

interface QuotePopupProps {
  isOpen: boolean
  onClose: () => void
}

export function QuotePopup({ isOpen, onClose }: QuotePopupProps) {
  const [quote, setQuote] = useState("")

  useEffect(() => {
    if (isOpen) {
      setQuote(getDailyQuote())
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white rounded-lg shadow-lg max-w-md mx-4 p-6 animate-in fade-in-0 zoom-in-95 duration-300">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Quote content */}
        <div className="pr-8">
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Daily Trading Wisdom</h3>
            <div className="w-12 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          </div>
          
          <blockquote className="text-gray-700 text-center italic leading-relaxed">
            "{quote}"
          </blockquote>
        </div>
      </div>
    </div>
  )
}
