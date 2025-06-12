"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BookOpen,
  Target,
  CheckCircle,
  Clock,
  Brain,
  TrendingUp,
  Lock,
  Play,
  FileText,
  PenTool,
  BarChart3,
} from "lucide-react"

interface ModuleProgress {
  id: string
  title: string
  type: "chapter" | "exercise" | "assessment"
  status: "locked" | "available" | "in-progress" | "completed"
  progress: number
  estimatedTime: number
  difficulty: "beginner" | "intermediate" | "advanced"
}

export default function LearningPathPage() {
  const [selectedPath, setSelectedPath] = useState<"core" | "remedial" | "advanced">("core")

  const learningPaths = {
    core: {
      title: "Core Trading Psychology Journey",
      description: "Master the fundamental principles from 'The Secrets of a Profitable Mind'",
      totalModules: 12,
      completedModules: 5,
      estimatedDuration: "8-10 weeks",
    },
    remedial: {
      title: "Foundation Strengthening Path",
      description: "Reinforce core concepts with additional practice and simplified explanations",
      totalModules: 8,
      completedModules: 3,
      estimatedDuration: "4-6 weeks",
    },
    advanced: {
      title: "Advanced Psychology Mastery",
      description: "Deep dive into complex trading psychology and advanced strategies",
      totalModules: 15,
      completedModules: 2,
      estimatedDuration: "12-16 weeks",
    },
  }

  const coreModules: ModuleProgress[] = [
    {
      id: "ch1",
      title: "The Psychology of Trading Success",
      type: "chapter",
      status: "completed",
      progress: 100,
      estimatedTime: 45,
      difficulty: "beginner",
    },
    {
      id: "ex1",
      title: "Self-Assessment: Trading Mindset",
      type: "exercise",
      status: "completed",
      progress: 100,
      estimatedTime: 20,
      difficulty: "beginner",
    },
    {
      id: "ch2",
      title: "Emotional Regulation Fundamentals",
      type: "chapter",
      status: "completed",
      progress: 100,
      estimatedTime: 50,
      difficulty: "intermediate",
    },
    {
      id: "ex2",
      title: "Emotion Tracking Exercise",
      type: "exercise",
      status: "in-progress",
      progress: 60,
      estimatedTime: 30,
      difficulty: "intermediate",
    },
    {
      id: "as1",
      title: "Module 1 Assessment",
      type: "assessment",
      status: "available",
      progress: 0,
      estimatedTime: 25,
      difficulty: "intermediate",
    },
    {
      id: "ch3",
      title: "Risk Management Psychology",
      type: "chapter",
      status: "locked",
      progress: 0,
      estimatedTime: 55,
      difficulty: "intermediate",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "in-progress":
        return <Play className="h-5 w-5 text-blue-600" />
      case "available":
        return <Target className="h-5 w-5 text-orange-600" />
      case "locked":
        return <Lock className="h-5 w-5 text-gray-400" />
      default:
        return <Target className="h-5 w-5" />
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "chapter":
        return <BookOpen className="h-4 w-4" />
      case "exercise":
        return <PenTool className="h-4 w-4" />
      case "assessment":
        return <BarChart3 className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800"
      case "intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Navigation />

      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Learning Path</h1>
            <p className="text-gray-600">Your personalized journey through trading psychology mastery</p>
          </div>

          {/* Path Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {Object.entries(learningPaths).map(([key, path]) => (
              <Card
                key={key}
                className={`cursor-pointer transition-all ${
                  selectedPath === key ? "ring-2 ring-blue-500 bg-blue-50" : "hover:shadow-lg"
                }`}
                onClick={() => setSelectedPath(key as any)}
              >
                <CardHeader>
                  <CardTitle className="text-lg">{path.title}</CardTitle>
                  <CardDescription>{path.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>
                        {path.completedModules}/{path.totalModules} modules
                      </span>
                    </div>
                    <Progress value={(path.completedModules / path.totalModules) * 100} />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>{path.estimatedDuration}</span>
                      <Badge variant="outline">{key}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Current Path Details */}
          <Tabs defaultValue="modules" className="space-y-6">
            <TabsList>
              <TabsTrigger value="modules">Modules</TabsTrigger>
              <TabsTrigger value="progress">Progress</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            </TabsList>

            <TabsContent value="modules" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Brain className="mr-2 h-5 w-5" />
                    {learningPaths[selectedPath].title}
                  </CardTitle>
                  <CardDescription>
                    Complete modules in sequence to build comprehensive trading psychology skills
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {coreModules.map((module, index) => (
                      <div
                        key={module.id}
                        className={`p-4 border rounded-lg transition-all ${
                          module.status === "locked"
                            ? "bg-gray-50 opacity-60"
                            : "bg-white hover:shadow-md cursor-pointer"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100">
                              <span className="text-sm font-medium">{index + 1}</span>
                            </div>
                            {getStatusIcon(module.status)}
                            <div>
                              <h3 className="font-semibold flex items-center">
                                {getTypeIcon(module.type)}
                                <span className="ml-2">{module.title}</span>
                              </h3>
                              <div className="flex items-center space-x-2 mt-1">
                                <Badge className={getDifficultyColor(module.difficulty)}>{module.difficulty}</Badge>
                                <span className="text-sm text-gray-500 flex items-center">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {module.estimatedTime} min
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            {module.status === "in-progress" && (
                              <div className="text-right">
                                <div className="text-sm text-gray-600 mb-1">{module.progress}%</div>
                                <Progress value={module.progress} className="w-20" />
                              </div>
                            )}
                            <Button
                              size="sm"
                              disabled={module.status === "locked"}
                              variant={module.status === "completed" ? "outline" : "default"}
                              onClick={() => {
                                if (module.status !== "locked") {
                                  window.location.href = `/learning-path/modules/${module.id}`
                                }
                              }}
                            >
                              {module.status === "completed"
                                ? "Review"
                                : module.status === "in-progress"
                                  ? "Continue"
                                  : module.status === "locked"
                                    ? "Locked"
                                    : "Start"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="progress" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Learning Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Overall Completion</span>
                          <span>42%</span>
                        </div>
                        <Progress value={42} />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Exercises Completed</span>
                          <span>8/15</span>
                        </div>
                        <Progress value={53} />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Assessments Passed</span>
                          <span>2/5</span>
                        </div>
                        <Progress value={40} />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Skill Development</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Emotional Regulation</span>
                          <span>75%</span>
                        </div>
                        <Progress value={75} />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Risk Management</span>
                          <span>45%</span>
                        </div>
                        <Progress value={45} />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Discipline & Consistency</span>
                          <span>60%</span>
                        </div>
                        <Progress value={60} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="recommendations" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="mr-2 h-5 w-5" />
                    AI Recommendations
                  </CardTitle>
                  <CardDescription>Personalized suggestions based on your progress and performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h3 className="font-semibold text-blue-900 mb-2">Focus Area: Risk Management</h3>
                      <p className="text-blue-800 text-sm mb-3">
                        Your assessment scores indicate room for improvement in risk psychology. Consider reviewing
                        Chapter 3 and completing additional risk management exercises.
                      </p>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Start Risk Module
                      </Button>
                    </div>

                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <h3 className="font-semibold text-green-900 mb-2">Strength: Emotional Awareness</h3>
                      <p className="text-green-800 text-sm mb-3">
                        Excellent progress in emotional regulation! You're ready for advanced emotional intelligence
                        modules and peer mentoring opportunities.
                      </p>
                      <Button size="sm" variant="outline" className="border-green-600 text-green-700">
                        Explore Advanced Topics
                      </Button>
                    </div>

                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <h3 className="font-semibold text-yellow-900 mb-2">Habit Building Opportunity</h3>
                      <p className="text-yellow-800 text-sm mb-3">
                        Your consistency in daily reflection is improving. Consider adding pre-market preparation to
                        your routine for enhanced performance.
                      </p>
                      <Button size="sm" variant="outline" className="border-yellow-600 text-yellow-700">
                        Build New Habit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
