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
import { useTranslation } from "react-i18next" // Import useTranslation
import { useRouter } from "next/navigation"

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
  const { t } = useTranslation() // Initialize useTranslation
  const [selectedPath, setSelectedPath] = useState<"core" | "remedial" | "advanced">("core")
  const router = useRouter()

  const learningPaths = {
    core: {
      title: t("learningPath.coreTitle"),
      description: t("learningPath.coreDescription"),
      totalModules: 12,
      completedModules: 5,
      estimatedDuration: t("learningPath.coreDuration"),
    },
    remedial: {
      title: t("learningPath.remedialTitle"),
      description: t("learningPath.remedialDescription"),
      totalModules: 8,
      completedModules: 3,
      estimatedDuration: t("learningPath.remedialDuration"),
    },
    advanced: {
      title: t("learningPath.advancedTitle"),
      description: t("learningPath.advancedDescription"),
      totalModules: 15,
      completedModules: 2,
      estimatedDuration: t("learningPath.advancedDuration"),
    },
  }

  const coreModules: ModuleProgress[] = [
    {
      id: "ch1",
      title: t("module.psychologyOfTradingSuccess.title"),
      type: "chapter",
      status: "completed",
      progress: 100,
      estimatedTime: 45,
      difficulty: "beginner",
    },
    {
      id: "ex1",
      title: t("module.selfAssessmentTradingMindset.title"),
      type: "exercise",
      status: "completed",
      progress: 100,
      estimatedTime: 20,
      difficulty: "beginner",
    },
    {
      id: "ch2",
      title: t("module.emotionalRegulationFundamentals.title"),
      type: "chapter",
      status: "completed",
      progress: 100,
      estimatedTime: 50,
      difficulty: "intermediate",
    },
    {
      id: "ex2",
      title: t("module.emotionTrackingExercise.title"),
      type: "exercise",
      status: "in-progress",
      progress: 60,
      estimatedTime: 30,
      difficulty: "intermediate",
    },
    {
      id: "as1",
      title: t("module.module1Assessment.title"),
      type: "assessment",
      status: "available",
      progress: 0,
      estimatedTime: 25,
      difficulty: "intermediate",
    },
    {
      id: "ch3",
      title: t("module.riskManagementPsychology.title"),
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{t("learningPath.title")}</h1>
            <p className="text-gray-600">{t("learningPath.description")}</p>
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
                      <span>{t("learningPath.progress")}
</span>
                      <span>
                        {path.completedModules}/{path.totalModules} {t("learningPath.modules")}
                      </span>
                    </div>
                    <Progress value={(path.completedModules / path.totalModules) * 100} />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>{path.estimatedDuration}</span>
                      <Badge variant="outline">{t(`learningPath.badge.${key}`)}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Current Path Details */}
          <Tabs defaultValue="modules" className="space-y-6">
            <TabsList>
              <TabsTrigger value="modules">{t("learningPath.tabs.modules")}</TabsTrigger>
              <TabsTrigger value="progress">{t("learningPath.tabs.progress")}</TabsTrigger>
              <TabsTrigger value="recommendations">{t("learningPath.tabs.recommendations")}</TabsTrigger>
            </TabsList>

            <TabsContent value="modules" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Brain className="mr-2 h-5 w-5" />
                    {learningPaths[selectedPath].title}
                  </CardTitle>
                  <CardDescription>
                    {t("learningPath.modulesDescription")}
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
                                <Badge className={getDifficultyColor(module.difficulty)}>{t(`difficulty.${module.difficulty}`)}</Badge>
                                <span className="text-sm text-gray-500 flex items-center">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {module.estimatedTime} {t("common.minutes")}
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
                              {t(`module.status.${module.status}`)}
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
                    <CardTitle>{t("learningPath.progressCard.title")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{t("learningPath.progressCard.overallCompletion")}
</span>
                          <span>42%</span>
                        </div>
                        <Progress value={42} />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{t("learningPath.progressCard.exercisesCompleted")}
</span>
                          <span>8/15</span>
                        </div>
                        <Progress value={53} />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{t("learningPath.progressCard.assessmentsPassed")}
</span>
                          <span>2/5</span>
                        </div>
                        <Progress value={40} />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>{t("learningPath.skillDevelopmentCard.title")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{t("learningPath.skillDevelopmentCard.emotionalRegulation")}
</span>
                          <span>75%</span>
                        </div>
                        <Progress value={75} />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{t("learningPath.skillDevelopmentCard.riskManagement")}
</span>
                          <span>45%</span>
                        </div>
                        <Progress value={45} />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{t("learningPath.skillDevelopmentCard.disciplineConsistency")}
</span>
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
                    {t("learningPath.recommendationsCard.title")}
                  </CardTitle>
                  <CardDescription>{t("learningPath.recommendationsCard.description")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h3 className="font-semibold text-blue-900 mb-2">{t("learningPath.recommendationsCard.focusArea.title")}
</h3>
                      <p className="text-blue-800 text-sm mb-3">
                        {t("learningPath.recommendationsCard.focusArea.description")}
                      </p>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        {t("learningPath.recommendationsCard.focusArea.button")}
                      </Button>
                    </div>

                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <h3 className="font-semibold text-green-900 mb-2">{t("learningPath.recommendationsCard.strength.title")}
</h3>
                      <p className="text-green-800 text-sm mb-3">
                        {t("learningPath.recommendationsCard.strength.description")}
                      </p>
                      <Button size="sm" variant="outline" className="border-green-600 text-green-700">
                        {t("learningPath.recommendationsCard.strength.button")}
                      </Button>
                    </div>

                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <h3 className="font-semibold text-yellow-900 mb-2">{t("learningPath.recommendationsCard.habitBuilding.title")}
</h3>
                      <p className="text-yellow-800 text-sm mb-3">
                        {t("learningPath.recommendationsCard.habitBuilding.description")}
                      </p>
                      <Button size="sm" variant="outline" className="border-yellow-600 text-yellow-700">
                        {t("learningPath.recommendationsCard.habitBuilding.button")}
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





// Add these to your common.json for each language
/*
{
  "learningPath.title": "Learning Path",
  "learningPath.description": "Your personalized journey through trading psychology mastery",
  "learningPath.coreTitle": "Core Trading Psychology Journey",
  "learningPath.coreDescription": "Master the fundamental principles from 'The Secrets of a Profitable Mind'",
  "learningPath.coreDuration": "8-10 weeks",
  "learningPath.remedialTitle": "Foundation Strengthening Path",
  "learningPath.remedialDescription": "Reinforce core concepts with additional practice and simplified explanations",
  "learningPath.remedialDuration": "4-6 weeks",
  "learningPath.advancedTitle": "Advanced Psychology Mastery",
  "learningPath.advancedDescription": "Deep dive into complex trading psychology and advanced strategies",
  "learningPath.advancedDuration": "12-16 weeks",
  "learningPath.progress": "Progress",
  "learningPath.modules": "modules",
  "learningPath.badge.core": "core",
  "learningPath.badge.remedial": "remedial",
  "learningPath.badge.advanced": "advanced",
  "learningPath.tabs.modules": "Modules",
  "learningPath.tabs.progress": "Progress",
  "learningPath.tabs.recommendations": "Recommendations",
  "learningPath.modulesDescription": "Complete modules in sequence to build comprehensive trading psychology skills",
  "difficulty.beginner": "beginner",
  "difficulty.intermediate": "intermediate",
  "difficulty.advanced": "advanced",
  "common.minutes": "min",
  "module.status.completed": "Review",
  "module.status.in-progress": "Continue",
  "module.status.locked": "Locked",
  "module.status.available": "Start",
  "learningPath.progressCard.title": "Learning Progress",
  "learningPath.progressCard.overallCompletion": "Overall Completion",
  "learningPath.progressCard.exercisesCompleted": "Exercises Completed",
  "learningPath.progressCard.assessmentsPassed": "Assessments Passed",
  "learningPath.skillDevelopmentCard.title": "Skill Development",
  "learningPath.skillDevelopmentCard.emotionalRegulation": "Emotional Regulation",
  "learningPath.skillDevelopmentCard.riskManagement": "Risk Management",
  "learningPath.skillDevelopmentCard.disciplineConsistency": "Discipline & Consistency",
  "learningPath.recommendationsCard.title": "AI Recommendations",
  "learningPath.recommendationsCard.description": "Personalized suggestions based on your progress and performance",
  "learningPath.recommendationsCard.focusArea.title": "Focus Area: Risk Management",
  "learningPath.recommendationsCard.focusArea.description": "Your assessment scores indicate room for improvement in risk psychology. Consider reviewing Chapter 3 and completing additional risk management exercises.",
  "learningPath.recommendationsCard.focusArea.button": "Start Risk Module",
  "learningPath.recommendationsCard.strength.title": "Strength: Emotional Awareness",
  "learningPath.recommendationsCard.strength.description": "Excellent progress in emotional regulation! You're ready for advanced emotional intelligence modules and peer mentoring opportunities.",
  "learningPath.recommendationsCard.strength.button": "Explore Advanced Topics",
  "learningPath.recommendationsCard.habitBuilding.title": "Habit Building Opportunity",
  "learningPath.recommendationsCard.habitBuilding.description": "Your consistency in daily reflection is improving. Consider adding pre-market preparation to your routine for enhanced performance.",
  "learningPath.recommendationsCard.habitBuilding.button": "Build New Habit",
  "module.psychologyOfTradingSuccess.title": "The Psychology of Trading Success",
  "module.selfAssessmentTradingMindset.title": "Self-Assessment: Trading Mindset",
  "module.emotionalRegulationFundamentals.title": "Emotional Regulation Fundamentals",
  "module.emotionTrackingExercise.title": "Emotion Tracking Exercise",
  "module.module1Assessment.title": "Module 1 Assessment",
  "module.riskManagementPsychology.title": "Risk Management Psychology"
}
*/

