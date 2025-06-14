'use client'

import Link from 'next/link'
import { Navigation } from '@/components/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Brain, Target, BookOpen, Sparkles, Flame, Award } from 'lucide-react'
import { InteractiveStatCard, LiveMetricDisplay, AnimatedCounter } from '@/components/interactive-widgets'
import { useEffect, useState } from 'react'
import { useTranslation } from '@/app/i18n/client'
import { getCurrentUser, needsPsychologyAssessment } from '@/lib/auth-simulation'

export default function DashboardContent({ lng }: { lng: string }) {
  const { t } = useTranslation(lng, 'common')
  const [user, setUser] = useState<any>(null)
  const [showPsychologyPrompt, setShowPsychologyPrompt] = useState(false)

  useEffect(() => {
    const currentUser = getCurrentUser()
    setUser(currentUser)
    
    if (currentUser && needsPsychologyAssessment()) {
      setShowPsychologyPrompt(true)
    }
  }, [])

  const handleTakePsychologyAssessment = () => {
    setShowPsychologyPrompt(false)
  }

  if (!user) {
    return (
      <div className="flex min-h-screen bg-gray-50 items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">{t('dashboard.loading')}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Navigation lng={lng} />
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
                      {t('dashboard.psychology_prompt_title')}
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      {t('dashboard.psychology_prompt_subtitle')}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  {t('dashboard.psychology_prompt_description')}
                </p>
                <div className="flex gap-3">
                  <Button
                    onClick={handleTakePsychologyAssessment}
                    className="bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 font-semibold"
                  >
                    <Brain className="h-4 w-4 mr-2" />
                    {t('dashboard.take_assessment')}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowPsychologyPrompt(false)}
                    className="border-gray-300 text-gray-600 hover:bg-gray-100"
                  >
                    {t('dashboard.maybe_later')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Greeting */}
          <div className="mb-8 relative">
            <Badge className="mb-4 bg-purple-100 text-purple-600 border-purple-200 px-4 py-1 hover:scale-105 transition-transform cursor-pointer">
              <Sparkles className="h-4 w-4 mr-2 animate-pulse" />
              {t('dashboard.day_badge')} <AnimatedCounter value={15} /> {t('dashboard.of_journey')}
            </Badge>
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {t('dashboard.welcome_back', { name: user.name })}
            </h1>
            <p className="text-gray-600">{t('dashboard.welcome_description')}</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <InteractiveStatCard
              title={t('dashboard.exercises_completed')}
              value={12}
              change={16.7}
              icon={Target}
              color="#8b5cf6"
            />
            <InteractiveStatCard
              title={t('dashboard.reflection_streak')}
              value={7}
              change={14.3}
              icon={Flame}
              color="#8b5cf6"
              suffix=" days"
            />
            <InteractiveStatCard
              title={t('dashboard.ai_coach_sessions')}
              value={24}
              change={20.0}
              icon={Brain}
              color="#8b5cf6"
            />
            <InteractiveStatCard
              title={t('dashboard.progress_score')}
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
              title={t('dashboard.focus_score')}
              value={85}
              target={100}
              unit="%"
              trend="up"
              isLive={true}
            />
            <LiveMetricDisplay
              title={t('dashboard.emotional_control')}
              value={72}
              target={90}
              unit="%"
              trend="up"
              isLive={true}
            />
            <LiveMetricDisplay
              title={t('dashboard.consistency_rating')}
              value={68}
              target={80}
              unit="/100"
              trend="stable"
              isLive={true}
            />
          </div>

          {/* Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg mr-3">
                    <Brain className="h-5 w-5 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">{t('dashboard.ai_coach_session')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{t('dashboard.ai_coach_description')}</p>
                <Button className="w-full bg-blue-500 hover:bg-blue-600">
                  {t('dashboard.start_session')}
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg mr-3">
                    <Target className="h-5 w-5 text-green-600" />
                  </div>
                  <CardTitle className="text-lg">{t('dashboard.daily_exercise')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{t('dashboard.daily_exercise_description')}</p>
                <Button className="w-full bg-green-500 hover:bg-green-600">
                  {t('dashboard.start_exercise')}
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg mr-3">
                    <BookOpen className="h-5 w-5 text-purple-600" />
                  </div>
                  <CardTitle className="text-lg">{t('dashboard.trade_journal')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{t('dashboard.trade_journal_description')}</p>
                <Button className="w-full bg-purple-500 hover:bg-purple-600">
                  {t('dashboard.open_journal')}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
