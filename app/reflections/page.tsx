"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Plus, Calendar, TrendingUp } from "lucide-react"

interface Reflection {
  id: string
  title: string
  content: string
  mood: string
  tradingDay: "Profitable" | "Loss" | "Breakeven"
  date: Date
  insights: string[]
}

const reflections: Reflection[] = [
  {
    id: "1",
    title: "Emotional Trading Patterns",
    content:
      "Today I noticed I was more impulsive when the market moved against me. I need to work on my patience and stick to my trading plan.",
    mood: "Frustrated",
    tradingDay: "Loss",
    date: new Date("2024-01-15"),
    insights: ["Patience", "Discipline", "Plan Adherence"],
  },
  {
    id: "2",
    title: "Successful Risk Management",
    content:
      "Followed my risk management rules perfectly today. Cut losses early and let winners run. Feeling confident about my progress.",
    mood: "Confident",
    tradingDay: "Profitable",
    date: new Date("2024-01-14"),
    insights: ["Risk Management", "Confidence", "Rule Following"],
  },
]

export default function ReflectionsPage() {
  const [showNewReflection, setShowNewReflection] = useState(false)
  const [newReflection, setNewReflection] = useState({
    title: "",
    content: "",
    mood: "",
    tradingDay: "Breakeven" as const,
    insights: "",
  })

  const getMoodColor = (mood: string) => {
    const moodColors: { [key: string]: string } = {
      Confident: "bg-green-100 text-green-800",
      Frustrated: "bg-red-100 text-red-800",
      Calm: "bg-blue-100 text-blue-800",
      Anxious: "bg-yellow-100 text-yellow-800",
      Excited: "bg-purple-100 text-purple-800",
    }
    return moodColors[mood] || "bg-gray-100 text-gray-800"
  }

  const getTradingDayColor = (day: string) => {
    switch (day) {
      case "Profitable":
        return "bg-green-100 text-green-800"
      case "Loss":
        return "bg-red-100 text-red-800"
      case "Breakeven":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Navigation />

      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Trading Reflections</h1>
              <p className="text-gray-600">Analyze your trading mindset and identify patterns for improvement</p>
            </div>
            <Button onClick={() => setShowNewReflection(true)}>
              <Plus className="mr-2 h-4 w-4" />
              New Reflection
            </Button>
          </div>

          {/* New Reflection Form */}
          {showNewReflection && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>New Trading Reflection</CardTitle>
                <CardDescription>Take a moment to reflect on your trading day and mindset</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Reflection Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Today's Emotional Patterns"
                    value={newReflection.title}
                    onChange={(e) => setNewReflection({ ...newReflection, title: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="mood">Current Mood</Label>
                    <Input
                      id="mood"
                      placeholder="e.g., Confident, Frustrated, Calm"
                      value={newReflection.mood}
                      onChange={(e) => setNewReflection({ ...newReflection, mood: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="tradingDay">Trading Day Result</Label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={newReflection.tradingDay}
                      onChange={(e) => setNewReflection({ ...newReflection, tradingDay: e.target.value as any })}
                    >
                      <option value="Profitable">Profitable</option>
                      <option value="Loss">Loss</option>
                      <option value="Breakeven">Breakeven</option>
                    </select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="content">Reflection Content</Label>
                  <Textarea
                    id="content"
                    placeholder="What did you learn about your trading psychology today? What patterns did you notice?"
                    rows={6}
                    value={newReflection.content}
                    onChange={(e) => setNewReflection({ ...newReflection, content: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="insights">Key Insights (comma-separated)</Label>
                  <Input
                    id="insights"
                    placeholder="e.g., Patience, Risk Management, Emotional Control"
                    value={newReflection.insights}
                    onChange={(e) => setNewReflection({ ...newReflection, insights: e.target.value })}
                  />
                </div>

                <div className="flex space-x-2">
                  <Button>Save Reflection</Button>
                  <Button variant="outline" onClick={() => setShowNewReflection(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Reflections List */}
          <div className="space-y-6">
            {reflections.map((reflection) => (
              <Card key={reflection.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <BookOpen className="h-5 w-5 text-blue-600 mr-2" />
                      <CardTitle className="text-lg">{reflection.title}</CardTitle>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {reflection.date.toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Badge className={getMoodColor(reflection.mood)}>{reflection.mood}</Badge>
                    <Badge className={getTradingDayColor(reflection.tradingDay)}>{reflection.tradingDay}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{reflection.content}</p>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      Key Insights
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {reflection.insights.map((insight, index) => (
                        <Badge key={index} variant="outline">
                          {insight}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Reflection Prompts */}
          <Card className="mt-8 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
            <CardHeader>
              <CardTitle className="text-purple-900">Reflection Prompts</CardTitle>
              <CardDescription className="text-purple-700">
                Use these questions to guide your reflection
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-purple-800">
                <li>• What emotions did I experience during trading today?</li>
                <li>• How did my emotional state affect my decision-making?</li>
                <li>• What trading rules did I follow or break?</li>
                <li>• What patterns am I noticing in my behavior?</li>
                <li>• What would I do differently next time?</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
