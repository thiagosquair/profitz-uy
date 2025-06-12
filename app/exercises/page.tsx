"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Target, Clock, CheckCircle, Play } from "lucide-react"

interface Exercise {
  id: string
  title: string
  description: string
  category: string
  duration: number
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  completed: boolean
  progress: number
}

const exercises: Exercise[] = [
  {
    id: "1",
    title: "Emotional State Check-In",
    description: "Assess your emotional state before trading to make better decisions",
    category: "Emotional Regulation",
    duration: 5,
    difficulty: "Beginner",
    completed: true,
    progress: 100,
  },
  {
    id: "2",
    title: "Risk Tolerance Assessment",
    description: "Evaluate your comfort level with different risk scenarios",
    category: "Risk Management",
    duration: 15,
    difficulty: "Intermediate",
    completed: false,
    progress: 60,
  },
  {
    id: "3",
    title: "Trading Journal Reflection",
    description: "Analyze your recent trades for psychological patterns",
    category: "Self-Analysis",
    duration: 20,
    difficulty: "Intermediate",
    completed: false,
    progress: 0,
  },
  {
    id: "4",
    title: "Visualization Exercise",
    description: "Practice mental rehearsal for different market scenarios",
    category: "Mental Preparation",
    duration: 10,
    difficulty: "Beginner",
    completed: false,
    progress: 0,
  },
  {
    id: "5",
    title: "Cognitive Bias Identification",
    description: "Learn to recognize and overcome common trading biases",
    category: "Cognitive Training",
    duration: 25,
    difficulty: "Advanced",
    completed: false,
    progress: 0,
  },
]

export default function ExercisesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All")

  const categories = ["All", ...Array.from(new Set(exercises.map((e) => e.category)))]
  const filteredExercises =
    selectedCategory === "All" ? exercises : exercises.filter((e) => e.category === selectedCategory)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800 border-green-200"
      case "Intermediate":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Advanced":
        return "bg-purple-100 text-purple-800 border-purple-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Navigation />

      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Trading Psychology Exercises</h1>
            <p className="text-gray-600">Strengthen your mental discipline through targeted practice</p>
          </div>

          {/* Category Filter */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={
                    selectedCategory === category
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Exercises Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExercises.map((exercise) => (
              <Card key={exercise.id} className="hover:shadow-lg transition-shadow bg-white border-gray-200">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <Target className="h-6 w-6 text-blue-600" />
                    {exercise.completed && <CheckCircle className="h-5 w-5 text-green-600" />}
                  </div>
                  <CardTitle className="text-lg text-gray-900">{exercise.title}</CardTitle>
                  <CardDescription className="text-gray-600">{exercise.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        {exercise.duration} min
                      </div>
                      <Badge className={getDifficultyColor(exercise.difficulty)}>{exercise.difficulty}</Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-gray-700">
                        <span>Progress</span>
                        <span>{exercise.progress}%</span>
                      </div>
                      <Progress value={exercise.progress} className="h-2" />
                    </div>

                    <Button
                      className={
                        exercise.completed
                          ? "w-full border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
                          : "w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600"
                      }
                      variant={exercise.completed ? "outline" : "default"}
                      onClick={() => {
                        if (exercise.id === "1") {
                          window.location.href = "/exercises/emotional-checkin"
                        } else {
                          // For other exercises, show coming soon
                          alert("This exercise will be available in the next update!")
                        }
                      }}
                    >
                      <Play className="mr-2 h-4 w-4" />
                      {exercise.completed ? "Review" : "Start Exercise"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Daily Challenge */}
          <Card className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-900">
                <Target className="mr-2 h-6 w-6" />
                Today's Challenge
              </CardTitle>
              <CardDescription className="text-blue-700">
                Complete this exercise to maintain your streak
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-blue-900">Pre-Market Emotional Check-In</h3>
                  <p className="text-sm text-blue-700">
                    Rate your emotional state and set intentions for today's trading
                  </p>
                </div>
                <Button
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600"
                  onClick={() => (window.location.href = "/exercises/emotional-checkin")}
                >
                  Start Challenge
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
