interface ChatHistoryEntry {
  role: "user" | "coach";
  content: string;
}

"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Send,
  Brain,
  TrendingUp,
  Target,
  AlertTriangle,
  Lightbulb,
  Loader2,
} from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "coach"
  timestamp: Date
  type?: "intervention" | "recommendation" | "insight"
  metadata?: any
}

interface UserInsight {
  type: "pattern" | "risk" | "opportunity"
  title: string
  description: string
  confidence: number
  actionable: boolean
}

interface UserContext {
  emotionalState: string
  tradingExperience: string
  recentActivity: {
    consistency: number
    journalEntries: number
    completedExercises: number
  }
  knownPatterns: string[]
}

export default function EnhancedCoachPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Welcome! I've analyzed your recent activity and noticed some interesting patterns. Your consistency has improved 23% this week, but I see you're struggling with emotional regulation during volatile market periods. How are you feeling about your trading psychology journey today?",
      sender: "coach",
      timestamp: new Date(),
      type: "insight",
    },
  ])
  const [inputMessage, setInputMessage] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [userInsights, setUserInsights] = useState<UserInsight[]>([
    {
      type: "pattern",
      title: "Monday Morning Dip",
      description:
        "Your engagement drops 40% on Monday mornings, likely due to weekend market anxiety",
      confidence: 0.87,
      actionable: true,
    },
    {
      type: "opportunity",
      title: "Reflection Quality Improving",
      description:
        "Your journal entries show 35% more self-awareness compared to last month",
      confidence: 0.92,
      actionable: false,
    },
    {
      type: "risk",
      title: "Consistency Risk Detected",
      description:
        "Pattern suggests 68% chance of breaking streak in next 3 days without intervention",
      confidence: 0.74,
      actionable: true,
    },
  ])

  // Track chat history for context
  const [chatHistory, setChatHistory] = useState<ChatHistoryEntry[]>([
    {
      role: "coach",
      content:
        "Welcome! I've analyzed your recent activity and noticed some interesting patterns. Your consistency has improved 23% this week, but I see you're struggling with emotional regulation during volatile market periods. How are you feeling about your trading psychology journey today?",
    },
  ])

  // Mock user context - in a real app, this would come from user profile and activity data
  const userContext: UserContext = {
    emotionalState: "Mixed - some anxiety about market volatility",
    tradingExperience: "Intermediate",
    recentActivity: {
      consistency: 78,
      journalEntries: 12,
      completedExercises: 8,
    },
    knownPatterns: [
      "Anxiety during high volatility",
      "Early exits when in profit",
      "Weekend trading hesitation",
    ],
  }

  const sendMessage = async (): Promise<void> => {
    if (!inputMessage.trim() || isLoading) return

    // Only call fetch in the browser environment
    if (typeof window === "undefined") {
      console.warn(
        "Skipping API call to /api/ai-coach during server-side render/build."
      )
      return
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    }

    // Add user message to chat
    setMessages((prev) => [...prev, userMessage])

    // Update chat history for API context, including the new user message
    const updatedChatHistory = [...chatHistory, { role: "user" as const, content: inputMessage }]

    setChatHistory(updatedChatHistory)
    setInputMessage("")
    setIsLoading(true)

    try {
      // Call the AI Coach API
      const response = await fetch("/api/ai-coach", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: inputMessage,
          userContext,
          chatHistory: updatedChatHistory,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get AI coach response")
      }

      const data = await response.json()

      // Create coach response message
      const coachResponse: Message = {
        id: Date.now().toString(),
        content: data.response,
        sender: "coach",
        timestamp: new Date(),
        type: data.type,
      }

      // Add coach response to messages
      setMessages((prev) => [...prev, coachResponse])

      // Update chat history with coach response, keep last 10 for context
      setChatHistory((prev) =>
        [...prev, { role: "coach" as const, content: data.response }].slice(-10)
      )
    } catch (error) {
      console.error("Error getting AI coach response:", error)

      const errorMessage: Message = {
        id: Date.now().toString(),
        content: "I'm having trouble connecting right now. Please try again in a moment.",
        sender: "coach",
        timestamp: new Date(),
        type: "insight",
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "pattern":
        return <TrendingUp className="h-4 w-4" />
      case "risk":
        return <AlertTriangle className="h-4 w-4" />
      case "opportunity":
        return <Lightbulb className="h-4 w-4" />
      default:
        return <Target className="h-4 w-4" />
    }
  }

  const getInsightColor = (type: string): string => {
    switch (type) {
      case "pattern":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "risk":
        return "bg-red-100 text-red-800 border-red-200"
      case "opportunity":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Navigation />

      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              AI Psychology Coach
            </h1>
            <p className="text-gray-600">
              Advanced behavioral analysis and personalized guidance
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Chat Interface */}
            <div className="lg:col-span-2">
              <Card className="h-[600px] flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Brain className="mr-2 h-5 w-5 text-blue-600" />
                    Behavioral Analysis Coach
                  </CardTitle>
                  <CardDescription>
                    AI-powered coaching with pattern recognition and predictive
                    insights
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col">
                  <ScrollArea className="flex-1 pr-4 mb-4">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${
                            message.sender === "user"
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >
                          <div
                            className={`flex items-start space-x-2 max-w-[85%] ${
                              message.sender === "user"
                                ? "flex-row-reverse space-x-reverse"
                                : ""
                            }`}
                          >
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>
                                {message.sender === "user" ? "U" : "AI"}
                              </AvatarFallback>
                            </Avatar>
                            <div
                              className={`rounded-lg p-4 ${
                                message.sender === "user"
                                  ? "bg-blue-600 text-white"
                                  : "bg-white border border-gray-200 text-gray-900"
                              }`}
                            >
                              {message.type && message.sender === "coach" && (
                                <div className="flex items-center mb-2">
                                  <Badge
                                    variant="outline"
                                    className={`text-xs ${
                                      message.type === "intervention"
                                        ? "border-red-300 text-red-700"
                                        : message.type === "recommendation"
                                        ? "border-green-300 text-green-700"
                                        : message.type === "insight"
                                        ? "border-blue-300 text-blue-700"
                                        : ""
                                    }`}
                                  >
                                    {message.type.toUpperCase()}
                                  </Badge>
                                </div>
                              )}
                              <p className="whitespace-pre-wrap">{message.content}</p>
                              <small className="block mt-1 text-xs text-gray-400">
                                {message.timestamp.toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </small>
                            </div>
                          </div>
                        </div>
                      ))}
                      {isLoading && (
                        <div className="flex justify-start">
                          <div className="flex items-center space-x-2 max-w-[85%]">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>AI</AvatarFallback>
                            </Avatar>
                            <div className="rounded-lg p-4 bg-white border border-gray-200 text-gray-900 flex items-center space-x-2">
                              <Loader2 className="animate-spin h-5 w-5 text-blue-600" />
                              <span>Thinking...</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </ScrollArea>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      sendMessage()
                    }}
                    className="flex space-x-2"
                  >
                    <Input
                      placeholder="Type your message..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      disabled={isLoading}
                      aria-label="Chat input"
                      autoComplete="off"
                    />
                    <Button
                      type="submit"
                      disabled={isLoading || !inputMessage.trim()}
                      aria-label="Send message"
                    >
                      <Send className="h-5 w-5" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar with Insights */}
            <div>
              <Card className="h-[600px] flex flex-col">
                <CardHeader>
                  <CardTitle>Insights & Patterns</CardTitle>
                  <CardDescription>
                    Behavioral patterns and risk analysis detected from your data
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto space-y-4">
                  {userInsights.map((insight, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded border flex items-center space-x-3 ${getInsightColor(
                        insight.type
                      )}`}
                    >
                      <div>{getInsightIcon(insight.type)}</div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{insight.title}</h4>
                        <p className="text-sm">{insight.description}</p>
                        <Progress
                          value={insight.confidence * 100}
                          className="mt-1 h-2"
                          aria-label={`Confidence: ${
                            (insight.confidence * 100).toFixed(0)
                          }%`}
                        />
                      </div>
                      {insight.actionable && (
                        <Badge className="ml-2" variant="secondary">
                          Actionable
                        </Badge>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
