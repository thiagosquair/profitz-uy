"use client"

import { useState, useEffect } from "react"
import { QuotePopup } from "@/components/quote-popup"

interface QuoteTimerProps {
  children: React.ReactNode
}

export function QuoteTimer({ children }: QuoteTimerProps) {
  const [showQuote, setShowQuote] = useState(false)
  const [hasShownToday, setHasShownToday] = useState(false)

  useEffect(() => {
    // Check if quote has already been shown today
    const today = new Date().toDateString()
    const lastShown = localStorage.getItem("lastQuoteShown")
    
    if (lastShown === today) {
      setHasShownToday(true)
      return
    }

    // Set timer for 30 seconds
    const timer = setTimeout(() => {
      if (!hasShownToday) {
        setShowQuote(true)
      }
    }, 30000) // 30 seconds

    return () => clearTimeout(timer)
  }, [hasShownToday])

  const handleCloseQuote = () => {
    setShowQuote(false)
    setHasShownToday(true)
    
    // Store today's date to prevent showing again
    const today = new Date().toDateString()
    localStorage.setItem("lastQuoteShown", today)
  }

  return (
    <>
      {children}
      <QuotePopup isOpen={showQuote} onClose={handleCloseQuote} />
    </>
  )
}
