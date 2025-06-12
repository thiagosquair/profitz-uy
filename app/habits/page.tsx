"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Target, TrendingUp, Brain, BookOpen, Shield, Heart, BarChart3, CheckCircle, Flame, Award } from "lucide-react"

interface Habit {
  id: string
  name: string
  description: string
  category: "study" | "reflection" | "trading" | "mindfulness" | "analysis"
  icon: any
  streak: number
  longestStreak: number
  completionRate: number
  weeklyGoal: number
  completedToday: boolean
  completedThisWeek: number
}

interface HabitEntry {
  date: string
  completed: boolean
  notes?: string
}

export default function HabitsPage() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])

  const habits: Habit[] = [
    {
      id: "daily-study",
      name: "Daily Learning",
      description: "Engage with educational content for at least 20 minutes",
      category: "study",
      icon: BookOpen,
      streak: 12,
      longestStreak: 18,
      completionRate: 85,
      weeklyGoal: 7,
      completedToday: true,
      completedThisWeek: 5,
    },
    {
      id: "trading-journal",
      name: "Trading Journal",
      description: "Reflect on trades and emotional responses",
      category: "reflection",
      icon: Brain,
      streak: 8,
      longestStreak: 15,
      completionRate: 78,
      weeklyGoal: 5,
      completedToday: false,
      completedThisWeek: 3,
    },
    {
      id: "risk-review",
      name: "Risk Management Check",
      description: "Review and confirm risk management rules",
      category: "trading",
      icon: Shield,
      streak: 5,
      longestStreak: 12,
      completionRate: 72,
      weeklyGoal: 5,
      completedToday: true,
      completedThisWeek: 4,
    },
    {
      id: "mindfulness",
      name: "Mindfulness Practice",
      description: "5-10 minutes of meditation or breathing exercises",
      category: "mindfulness",
      icon: Heart,
      streak: 3,
      longestStreak: 21,
      completionRate: 65,
      weeklyGoal: 7,
      completedToday: false,
      completedThisWeek: 2,
    },
    {
      id: "post-trade-analysis",
      name: "Post-Trade Analysis",
      description: "Analyze completed trades for learning opportunities",
      category: "analysis",
      icon: BarChart3,
      streak: 7,
      longestStreak: 10,
      completionRate: 80,
      weeklyGoal: 3,
      completedToday: false,
      completedThisWeek: 2,
    },
  ]

  const toggleHabit = (habitId: string) => {
    // Implementation would update habit completion status
    console.log(`Toggling habit: ${habitId}`)
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      study: "bg-blue-100 text-blue-800",
      reflection: "bg-purple-100 text-purple-800",
      trading: "bg-green-100 text-green-800",
      mindfulness: "bg-pink-100 text-pink-800",
      analysis: "bg-orange-100 text-orange-800",
    }
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  const getStreakColor = (streak: number) => {
    if (streak >= 14) return "text-green-600"
    if (streak >= 7) return "text-blue-600"
    if (streak >= 3) return "text-yellow-600"
    return "text-gray-600"
  }

  const totalHabitsToday = habits.length
  const completedHabitsToday = habits.filter((h) => h.completedToday).length
  const todayCompletionRate = (completedHabitsToday / totalHabitsToday) * 100

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Navigation />

      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Habit Tracking</h1>
            <p className="text-gray-600">Build the consistent routines essential for trading success</p>
          </div>

          {/* Today's Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Today's Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2">
                  {completedHabitsToday}/{totalHabitsToday}
                </div>
                <Progress value={todayCompletionRate} className="mb-2" />
                <p className="text-xs text-gray-500">{Math.round(todayCompletionRate)}% complete</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Active Streaks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2 flex items-center">
                  <Flame className="h-6 w-6 text-orange-500 mr-1" />
                  {habits.filter((h) => h.streak > 0).length}
                </div>
                <p className="text-xs text-gray-500">Habits with active streaks</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Best Streak</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2">{Math.max(...habits.map((h) => h.longestStreak))} days</div>
                <p className="text-xs text-gray-500">Personal record</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Weekly Goal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2">
                  {habits.reduce((sum, h) => sum + h.completedThisWeek, 0)}/
                  {habits.reduce((sum, h) => sum + h.weeklyGoal, 0)}
                </div>
                <Progress
                  value={
                    (habits.reduce((sum, h) => sum + h.completedThisWeek, 0) /
                      habits.reduce((sum, h) => sum + h.weeklyGoal, 0)) *
                    100
                  }
                  className="mb-2"
                />
                <p className="text-xs text-gray-500">This week's progress</p>
              </CardContent>
            </Card>
          </div>

          {/* Habit List */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="mr-2 h-5 w-5" />
                Today's Habits
              </CardTitle>
              <CardDescription>Complete your daily habits to build trading discipline</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {habits.map((habit) => {
                  const Icon = habit.icon
                  return (
                    <div
                      key={habit.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center space-x-4">
                        <Checkbox
                          checked={habit.completedToday}
                          onCheckedChange={() => toggleHabit(habit.id)}
                          className="h-5 w-5"
                        />
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            <Icon className="h-5 w-5 text-gray-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{habit.name}</h3>
                            <p className="text-sm text-gray-600">{habit.description}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge className={getCategoryColor(habit.category)}>{habit.category}</Badge>
                              <span className="text-xs text-gray-500">Goal: {habit.weeklyGoal}/week</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className={`text-sm font-medium ${getStreakColor(habit.streak)}`}>
                            {habit.streak > 0 ? `${habit.streak} day streak` : "No streak"}
                          </div>
                          <div className="text-xs text-gray-500">Best: {habit.longestStreak} days</div>
                        </div>

                        <div className="text-right">
                          <div className="text-sm font-medium">{habit.completionRate}%</div>
                          <div className="text-xs text-gray-500">completion rate</div>
                        </div>

                        <div className="w-16">
                          <Progress value={(habit.completedThisWeek / habit.weeklyGoal) * 100} />
                          <div className="text-xs text-center text-gray-500 mt-1">
                            {habit.completedThisWeek}/{habit.weeklyGoal}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Habit Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Habit Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <h3 className="font-semibold text-green-900 mb-1">Strong Consistency</h3>
                    <p className="text-sm text-green-800">
                      Your daily learning habit is performing excellently with an 85% completion rate. This consistency
                      is building strong knowledge foundations.
                    </p>
                  </div>

                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h3 className="font-semibold text-yellow-900 mb-1">Improvement Opportunity</h3>
                    <p className="text-sm text-yellow-800">
                      Mindfulness practice could use attention. Consider linking it to an existing habit like morning
                      coffee to improve consistency.
                    </p>
                  </div>

                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-1">Pattern Recognition</h3>
                    <p className="text-sm text-blue-800">
                      You tend to complete more habits on weekdays. Consider adjusting weekend expectations or creating
                      simplified weekend routines.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="mr-2 h-5 w-5" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center p-3 bg-purple-50 border border-purple-200 rounded-lg">
                    <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                      <Flame className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-purple-900">Week Warrior</h3>
                      <p className="text-sm text-purple-700">Completed all habits for 7 days straight</p>
                    </div>
                  </div>

                  <div className="flex items-center p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <BookOpen className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-green-900">Learning Streak</h3>
                      <p className="text-sm text-green-700">12 days of consistent daily learning</p>
                    </div>
                  </div>

                  <div className="flex items-center p-3 bg-blue-50 border border-blue-200 rounded-lg opacity-60">
                    <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <CheckCircle className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-900">Perfect Month</h3>
                      <p className="text-sm text-blue-700">Complete all habits for 30 days (18/30)</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
