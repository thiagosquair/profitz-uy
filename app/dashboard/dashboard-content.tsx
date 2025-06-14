// app/dashboard/dashboard-content.tsx
"use client"

import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Target, BookOpen, TrendingUp, ArrowRight, Sparkles, Zap, Calendar, CheckCircle, Award, Flame, BarChart3, Activity, Trophy, Timer } from "lucide-react"
import { InteractiveStatCard, AnimatedProgressRing, InteractiveActivityItem, LiveMetricDisplay, AnimatedCounter } from "@/components/interactive-widgets"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useProfileBuilder } from "@/hooks/use-profile-builder"
import { getCurrentUser, needsPsychologyAssessment } from "@/lib/auth-simulation"

export default function DashboardContent() {
  const { t } = useTranslation()
  const [user, setUser] = useState<any>(null)
  const [showPsychologyPrompt, setShowPsychologyPrompt] = useState(false)
  const { showPsychologyAssessment } = useProfileBuilder()

  useEffect(() => {
    const currentUser = getCurrentUser()
    setUser(currentUser)
    if (currentUser && needsPsychologyAssessment()) {
      setShowPsychologyPrompt(true)
    }
  }, [])

  const handleTakePsychologyAssessment = () => {
    showPsychologyAssessment()
    setShowPsychologyPrompt(false)
  }

  if (!user) {
    return (
      <div className="flex min-h-screen bg-gray-50 items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">{t("dashboard.loading")}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Navigation />
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {/* Psychology Prompt */}
          {showPsychologyPrompt && (
            <Card className="mb-8 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
              <CardHeader>
                <div className="flex items-center">
                  <div className="p-3 bg-purple-100 rounded-xl mr-4">
                    <Brain className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                      {t("dashboard.psychology_prompt_title")}
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      {t("dashboard.psychology_prompt_subtitle")}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  {t("dashboard.psychology_prompt_description")}
                </p>
                <div className="flex gap-3">
                  <Button 
                    onClick={handleTakePsychologyAssessment} 
                    className="bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 font-semibold"
                  >
                    <Brain className="h-4 w-4 mr-2" />
                    {t("dashboard.take_assessment")}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowPsychologyPrompt(false)} 
                    className="border-gray-300 text-gray-600 hover:bg-gray-100"
                  >
                    {t("dashboard.maybe_later")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Greeting */}
          <div className="mb-8 relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-100 rounded-full blur-[6rem] -z-10"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-100 rounded-full blur-[6rem] -z-10"></div>
            <Badge className="mb-4 bg-purple-100 text-purple-600 border-purple-200 px-4 py-1 hover:scale-105 transition-transform cursor-pointer">
              <Sparkles className="h-4 w-4 mr-2 animate-pulse" />
              {t("dashboard.day_badge")} <AnimatedCounter value={15} /> {t("dashboard.of_journey")}
            </Badge>
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {t("dashboard.welcome_back", { name: user.name })}
            </h1>
            <p className="text-gray-600">{t("dashboard.welcome_description")}</p>
            <div className="flex gap-2 mt-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={showPsychologyAssessment} 
                className="border-purple-200 text-purple-600 hover:bg-purple-50"
              >
                <Brain className="h-4 w-4 mr-2" />
                {t("dashboard.psychology_assessment")}
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <InteractiveStatCard 
              title={t("dashboard.exercises_completed")} 
              value={12} 
              change={16.7} 
              icon={Target} 
              color="#8b5cf6" 
            />
            <InteractiveStatCard 
              title={t("dashboard.reflection_streak")} 
              value={7} 
              change={14.3} 
              icon={Flame} 
              color="#8b5cf6" 
              suffix=" days" 
            />
            <InteractiveStatCard 
              title={t("dashboard.ai_coach_sessions")} 
              value={24} 
              change={20.0} 
              icon={Brain} 
              color="#8b5cf6" 
            />
            <InteractiveStatCard 
              title={t("dashboard.progress_score")} 
              value={78} 
              change={8.3} 
              icon={Award} 
              color="#8b5cf6" 
              suffix="%" 
            />
          </div>

          {/* Live Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <LiveMetricDisplay 
              title={t("dashboard.focus_score")} 
              value={85} 
              target={100} 
              unit="%" 
              trend="up" 
              isLive={true} 
            />
            <LiveMetricDisplay 
              title={t("dashboard.emotional_control")} 
              value={72} 
              target={90} 
              unit="%" 
              trend="up" 
              isLive={true} 
            />
            <LiveMetricDisplay 
              title={t("dashboard.consistency_rating")} 
              value={68} 
              target={80} 
              unit="/100" 
              trend="stable" 
              isLive={true} 
            />
          </div>

          {/* You can include your action cards, tabs, and other sections here as you had them */}
        </div>
      </main>
    </div>
  )
}


