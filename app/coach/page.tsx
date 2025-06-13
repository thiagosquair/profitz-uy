"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Send, Brain, TrendingUp, Target, AlertTriangle, Lightbulb, Loader2 } from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "coach"
  timestamp: Date
  type?: "intervention" | "recommendation" | "insight"
  metadata?: any
}
interface ChatHistoryEntry {
  role: "user" | "coach"
  content: string
}
interface UserInsight {
  type: "pattern" | "risk" | "opportunity"
  title: string
  description: string
  confidence: number
  actionable: boolean
}

export default function EnhancedCoachPage() {
  const [messages, setMessages] = useState<Message[]>([/* initial messages */])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [userInsights, setUserInsights] = useState<UserInsight[]>([/* initial insights */])

  const [chatHistory, setChatHistory] = useState<ChatHistoryEntry[]>([
    { role: "coach", content: "Welcome! ..." }
  ])

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return
    if (typeof window === "undefined") return // skip SSR

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages(prev => [...prev, userMessage])

    // Add with correct literal role type
    const updatedChatHistory: ChatHistoryEntry[] = [
      ...chatHistory,
      { role: "user", content: inputMessage },
    ]
    setChatHistory(updatedChatHistory)
    setIsLoading(true)
    setInputMessage("")

    try {
      const response = await fetch("/api/ai-coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: inputMessage, userContext: {}, chatHistory: updatedChatHistory }),
      })
      const data = await response.json()

      const coachResponse: Message = {
        id: Date.now().toString(),
        content: data.response,
        sender: "coach",
        timestamp: new Date(),
        type: data.type as Message["type"],
      }
      setMessages(prev => [...prev, coachResponse])

      // Make sure role is literally "coach"
      setChatHistory(prev => [
        ...prev,
        { role: "coach", content: data.response },
      ].slice(-10))
    } catch (err) {
      console.error(err)
      const errorMsg: Message = {
        id: Date.now().toString(),
        content: "Error, please try again.",
        sender: "coach",
        timestamp: new Date(),
        type: "insight",
      }
      setMessages(prev => [...prev, errorMsg])
    } finally {
      setIsLoading(false)
    }
  }

  // ... The rest of your render logic remains the same, using `messages`, `isLoading`, `userInsights`, etc.

  return (
    <div>
      <Navigation />
      <main>
        {/* UI structure with ScrollArea, Input, Button */}
        // ...
      </main>
    </div>
  )
}
