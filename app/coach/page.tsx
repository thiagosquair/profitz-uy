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
import { Send, Brain, TrendingUp, Target, AlertTriangle, Lightbulb } from "lucide-react"

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
  const [inputMessage, setInputMessage] = useState("")
  const [userInsights, setUserInsights] = useState<UserInsight[]>([
    {
      type: "pattern",
      title: "Monday Morning Dip",
      description: "Your engagement drops 40% on Monday mornings, likely due to weekend market anxiety",
      confidence: 0.87,
      actionable: true,
    },
    {
      type: "opportunity",
      title: "Reflection Quality Improving",
      description: "Your journal entries show 35% more self-awareness compared to last month",
      confidence: 0.92,
      actionable: false,
    },
    {
      type: "risk",
      title: "Consistency Risk Detected",
      description: "Pattern suggests 68% chance of breaking streak in next 3 days without intervention",
      confidence: 0.74,
      actionable: true,
    },
  ])

  const sendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")

    // Simulate advanced AI response with behavioral analysis
    setTimeout(() => {
      const coachResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getAdvancedCoachResponse(inputMessage),
        sender: "coach",
        timestamp: new Date(),
        type: determineResponseType(inputMessage),
      }
      setMessages((prev) => [...prev, coachResponse])
    }, 1500)
  }

  const getAdvancedCoachResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()

    if (input.includes("anxious") || input.includes("worried")) {
      return "I understand you're feeling anxious. Based on your behavioral patterns, this typically happens when market volatility increases. Let's work through the CALM technique: C - Center yourself with deep breathing, A - Acknowledge the emotion without judgment, L - Locate the physical sensation, M - Move forward with intention. Your anxiety response has decreased 15% since last month, showing real progress. Would you like me to guide you through a specific exercise for managing trading anxiety?"
    }

    if (input.includes("consistency") || input.includes("habit")) {
      return "Your consistency data shows interesting patterns. You've maintained a 78% completion rate over the past month, with strongest performance on Tuesday-Thursday (89% avg) and challenges on weekends (52% avg). The predictive model suggests focusing on micro-habits during low-energy periods. I recommend the '2-minute rule' for weekend engagement - just 2 minutes of reflection can maintain your neural pathways. Shall we design a personalized weekend routine?"
    }

    if (input.includes("progress") || input.includes("improvement")) {
      return "Your progress metrics are encouraging! Emotional regulation skills have improved 34% based on assessment scores and reflection quality analysis. The consistency tracker shows you're in the 'sustainable growth' zone. However, I notice risk management psychology could use attention - your confidence in risk scenarios has plateaued. This is normal at your development stage. Ready to tackle some advanced risk psychology exercises?"
    }

    return "I'm analyzing your question in the context of your behavioral patterns and current development stage. Based on your profile as an intermediate learner with strong self-awareness but developing emotional regulation skills, I'd recommend focusing on the intersection of market psychology and personal triggers. Your recent activity suggests you're ready for more advanced concepts. What specific aspect of trading psychology feels most challenging right now?"
  }

  const determineResponseType = (input: string): "intervention" | "recommendation" | "insight" => {
    if (input.toLowerCase().includes("anxious") || input.toLowerCase().includes("struggling")) {
      return "intervention"
    }
    if (input.toLowerCase().includes("what should") || input.toLowerCase().includes("recommend")) {
      return "recommendation"
    }
    return "insight"
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

  const getInsightColor = (type: string) => {
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Psychology Coach</h1>
            <p className="text-gray-600">Advanced behavioral analysis and personalized guidance</p>
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
                    AI-powered coaching with pattern recognition and predictive insights
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col">
                  <ScrollArea className="flex-1 pr-4 mb-4">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`flex items-start space-x-2 max-w-[85%] ${
                              message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
                            }`}
                          >
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{message.sender === "user" ? "U" : "AI"}</AvatarFallback>
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
                                          ? "border-blue-300 text-blue-700"
                                          : "border-green-300 text-green-700"
                                    }`}
                                  >
                                    {message.type}
                                  </Badge>
                                </div>
                              )}
                              <p className="text-sm leading-relaxed">{message.content}</p>
                              <p
                                className={`text-xs mt-2 ${
                                  message.sender === "user" ? "text-blue-100" : "text-gray-500"
                                }`}
                              >
                                {message.timestamp.toLocaleTimeString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>

                  <div className="flex space-x-2">
                    <Input
                      placeholder="Describe your current trading psychology challenges..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                      className="flex-1"
                    />
                    <Button onClick={sendMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Insights Panel */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Behavioral Insights</CardTitle>
                  <CardDescription>AI-detected patterns and recommendations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {userInsights.map((insight, index) => (
                    <div key={index} className={`p-3 rounded-lg border ${getInsightColor(insight.type)}`}>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center">
                          {getInsightIcon(insight.type)}
                          <span className="ml-2 font-medium text-sm">{insight.title}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {Math.round(insight.confidence * 100)}%
                        </Badge>
                      </div>
                      <p className="text-xs leading-relaxed">{insight.description}</p>
                      {insight.actionable && (
                        <Button size="sm" variant="outline" className="mt-2 text-xs">
                          Take Action
                        </Button>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Progress Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Emotional Regulation</span>
                      <span>78%</span>
                    </div>
                    <Progress value={78} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Consistency Score</span>
                      <span>85%</span>
                    </div>
                    <Progress value={85} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Risk Psychology</span>
                      <span>62%</span>
                    </div>
                    <Progress value={62} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Target className="mr-2 h-4 w-4" />
                    Emotional Check-In
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    View Patterns
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Lightbulb className="mr-2 h-4 w-4" />
                    Get Recommendations
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
