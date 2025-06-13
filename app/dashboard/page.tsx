"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Brain,
  Target,
  BookOpen,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Zap,
  Calendar,
  CheckCircle,
  Award,
  Flame,
  BarChart3,
  Activity,
  Trophy,
  Timer,
} from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getCurrentUser, needsPsychologyAssessment } from "@/lib/auth-simulation"
import { useProfileBuilder } from "@/providers/profile-builder-provider"
import {
  InteractiveStatCard,
  AnimatedProgressRing,
  InteractiveActivityItem,
  LiveMetricDisplay,
  AnimatedCounter,
} from "@/components/interactive-widgets"
// app/dashboard/page.tsx
import { ProfileBuilderProvider } from "@/providers/profile-builder-provider"; // Correct import path
import { useProfileBuilder } from "@/hooks/use-profile-builder"; // Assuming this is the path to your hook

export default function DashboardPage() {
  return (
    <ProfileBuilderProvider>
      {/* The content that uses useProfileBuilder goes here */}
      <DashboardContent /> 
    </ProfileBuilderProvider>
  );
}

function DashboardContent() {
  const profile = useProfileBuilder();
  // ... rest of your dashboard page content
  return (
    <div>
      {/* Your dashboard UI */}
    </div>
  );
}
export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [showPsychologyPrompt, setShowPsychologyPrompt] = useState(false)
  const { showPsychologyAssessment } = useProfileBuilder()

  useEffect(() => {
    const currentUser = getCurrentUser()
    setUser(currentUser)

    // Check if user needs psychology assessment
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
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Navigation />

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {/* Psychology Assessment Prompt */}
          {showPsychologyPrompt && (
            <Card className="mb-8 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
              <CardHeader>
                <div className="flex items-center">
                  <div className="p-3 bg-purple-100 rounded-xl mr-4">
                    <Brain className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                      Unlock Your Trading Psychology
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      Take our comprehensive assessment to get personalized insights
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Discover your trading personality type, identify your strengths and areas for improvement, and get
                  personalized coaching recommendations based on your psychological profile.
                </p>
                <div className="flex gap-3">
                  <Button
                    onClick={handleTakePsychologyAssessment}
                    className="bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 font-semibold"
                  >
                    <Brain className="h-4 w-4 mr-2" />
                    Take Assessment
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowPsychologyPrompt(false)}
                    className="border-gray-300 text-gray-600 hover:bg-gray-100"
                  >
                    Maybe Later
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Welcome Section with personalized greeting */}
          <div className="mb-8 relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-100 rounded-full blur-[6rem] -z-10"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-100 rounded-full blur-[6rem] -z-10"></div>

            <Badge className="mb-4 bg-purple-100 text-purple-600 border-purple-200 px-4 py-1 hover:scale-105 transition-transform cursor-pointer">
              <Sparkles className="h-4 w-4 mr-2 animate-pulse" />
              Day <AnimatedCounter value={15} /> of Your Journey
            </Badge>

            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Welcome Back, {user.name}
            </h1>
            <p className="text-gray-600">Your trading transformation continues. Today is a new opportunity to grow.</p>

            {/* Quick Actions */}
            <div className="flex gap-2 mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={showPsychologyAssessment}
                className="border-purple-200 text-purple-600 hover:bg-purple-50"
              >
                <Brain className="h-4 w-4 mr-2" />
                Psychology Assessment
              </Button>
            </div>
          </div>

          {/* Interactive Stats with hover effects */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <InteractiveStatCard
              title="Exercises Completed"
              value={12}
              change={16.7}
              icon={Target}
              color="#8b5cf6"
              onClick={() => console.log("Navigate to exercises")}
            />
            <InteractiveStatCard
              title="Reflection Streak"
              value={7}
              change={14.3}
              icon={Flame}
              color="#8b5cf6"
              suffix=" days"
              onClick={() => console.log("Navigate to reflections")}
            />
            <InteractiveStatCard
              title="AI Coach Sessions"
              value={24}
              change={20.0}
              icon={Brain}
              color="#8b5cf6"
              onClick={() => console.log("Navigate to coach")}
            />
            <InteractiveStatCard
              title="Progress Score"
              value={78}
              change={8.3}
              icon={Award}
              color="#8b5cf6"
              suffix="%"
              onClick={() => console.log("View detailed progress")}
            />
          </div>

          {/* Live Metrics Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <LiveMetricDisplay title="Focus Score" value={85} target={100} unit="" trend="up" isLive={true} />
            <LiveMetricDisplay title="Emotional Control" value={72} target={90} unit="%" trend="up" isLive={true} />
            <LiveMetricDisplay
              title="Consistency Rating"
              value={68}
              target={80}
              unit="/100"
              trend="stable"
              isLive={true}
            />
          </div>

          {/* Main Actions with enhanced hover effects */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="group">
              <Card className="bg-white border-gray-200 hover:border-purple-300 transition-all duration-500 h-full overflow-hidden relative hover:shadow-lg cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-blue-50/50 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <CardHeader className="relative z-10">
                  <div className="flex items-center">
                    <div className="p-3 bg-purple-100 rounded-xl mr-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                      <Brain className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <CardTitle className="text-gray-900 group-hover:text-purple-600 transition-colors">
                        AI Coach Session
                      </CardTitle>
                      <CardDescription className="text-gray-600">Get personalized guidance</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="text-gray-700 mb-6">
                    Your AI coach has identified patterns in your recent trades that could help improve your
                    performance.
                  </p>

                  {/* Interactive progress indicator */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Session Progress</span>
                      <span className="text-purple-600">3/5 completed</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-500 rounded-full group-hover:animate-pulse transition-all duration-1000"
                        style={{ width: "60%" }}
                      ></div>
                    </div>
                  </div>

                  <Link href="/coach">
                    <Button className="w-full bg-purple-100 text-purple-600 hover:bg-purple-200 transition-all border border-purple-200 group-hover:scale-105">
                      Start Session
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            <div className="group">
              <Card className="bg-white border-gray-200 hover:border-purple-300 transition-all duration-500 h-full overflow-hidden relative hover:shadow-lg cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-blue-50/50 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <CardHeader className="relative z-10">
                  <div className="flex items-center">
                    <div className="p-3 bg-purple-100 rounded-xl mr-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                      <Target className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <CardTitle className="text-gray-900 group-hover:text-purple-600 transition-colors">
                        Daily Exercise
                      </CardTitle>
                      <CardDescription className="text-gray-600">Build mental discipline</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="text-gray-700 mb-6">
                    Today's recommended exercise focuses on managing emotions during high-volatility market conditions.
                  </p>

                  {/* Circular progress for today's exercise */}
                  <div className="flex justify-center mb-4">
                    <AnimatedProgressRing progress={75} size={80} color="#8b5cf6" label="Today" />
                  </div>

                  <Link href="/exercises">
                    <Button className="w-full bg-purple-100 text-purple-600 hover:bg-purple-200 transition-all border border-purple-200 group-hover:scale-105">
                      View Exercises
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            <div className="group">
              <Card className="bg-white border-gray-200 hover:border-purple-300 transition-all duration-500 h-full overflow-hidden relative hover:shadow-lg cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-blue-50/50 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <CardHeader className="relative z-10">
                  <div className="flex items-center">
                    <div className="p-3 bg-purple-100 rounded-xl mr-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                      <BookOpen className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <CardTitle className="text-gray-900 group-hover:text-purple-600 transition-colors">
                        Reflection Journal
                      </CardTitle>
                      <CardDescription className="text-gray-600">Analyze your mindset</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="text-gray-700 mb-6">
                    Maintain your 7-day streak by reflecting on today's trading decisions and emotional responses.
                  </p>

                  {/* Streak visualization */}
                  <div className="flex items-center justify-center space-x-1 mb-4">
                    {[...Array(7)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          i < 7 ? "bg-purple-500 group-hover:scale-125" : "bg-gray-300"
                        }`}
                        style={{ animationDelay: `${i * 100}ms` }}
                      />
                    ))}
                  </div>

                  <Link href="/reflections">
                    <Button className="w-full bg-purple-100 text-purple-600 hover:bg-purple-200 transition-all border border-purple-200 group-hover:scale-105">
                      Write Reflection
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Enhanced Tabs with interactive content */}
          <Tabs defaultValue="activity" className="space-y-6">
            <TabsList className="bg-white border border-gray-200">
              <TabsTrigger
                value="activity"
                className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-600 hover:bg-gray-50 transition-all"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Recent Activity
              </TabsTrigger>
              <TabsTrigger
                value="insights"
                className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-600 hover:bg-gray-50 transition-all"
              >
                <Zap className="h-4 w-4 mr-2" />
                Insights
              </TabsTrigger>
              <TabsTrigger
                value="journey"
                className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-600 hover:bg-gray-50 transition-all"
              >
                <Trophy className="h-4 w-4 mr-2" />
                Your Journey
              </TabsTrigger>
            </TabsList>

            <TabsContent value="activity">
              <Card className="bg-white border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-gray-900">
                    <Activity className="mr-2 h-5 w-5 text-purple-600" />
                    Recent Activity
                  </CardTitle>
                  <CardDescription className="text-gray-600">Your latest interactions with ProFitz</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <InteractiveActivityItem
                      icon={CheckCircle}
                      title="Completed 'Risk Assessment' exercise"
                      time="2 hours ago"
                      points={10}
                      type="exercise"
                      onClick={() => console.log("View exercise details")}
                    />
                    <InteractiveActivityItem
                      icon={Brain}
                      title="AI Coach session on emotional regulation"
                      time="Yesterday"
                      type="coaching"
                      onClick={() => console.log("View coaching session")}
                    />
                    <InteractiveActivityItem
                      icon={BookOpen}
                      title="Weekly reflection submitted"
                      time="3 days ago"
                      points={15}
                      type="reflection"
                      onClick={() => console.log("View reflection")}
                    />
                    <InteractiveActivityItem
                      icon={Trophy}
                      title="Achieved 'Consistent Trader' badge"
                      time="1 week ago"
                      points={50}
                      type="achievement"
                      onClick={() => console.log("View achievement")}
                    />
                  </div>
                </CardContent>
                <CardFooter className="border-t border-gray-200 pt-4">
                  <Button
                    variant="ghost"
                    className="text-gray-600 hover:text-purple-600 hover:bg-purple-50 w-full transition-all hover:scale-105"
                  >
                    View All Activity
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="insights">
              <Card className="bg-white border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-gray-900">
                    <BarChart3 className="mr-2 h-5 w-5 text-purple-600" />
                    AI-Generated Insights
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Personalized observations about your trading psychology
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-purple-50 border border-purple-100 rounded-lg hover:bg-purple-100 transition-all cursor-pointer group">
                      <h3 className="font-semibold text-purple-700 mb-2 flex items-center group-hover:scale-105 transition-transform">
                        <TrendingUp className="h-5 w-5 mr-2" />
                        Pattern Detected
                      </h3>
                      <p className="text-gray-700">
                        Your trading performance improves significantly when you complete a reflection exercise before
                        market open. Consider making this a consistent part of your routine.
                      </p>
                      <div className="mt-3 h-1 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-purple-500 rounded-full group-hover:animate-pulse transition-all duration-1000"
                          style={{ width: "85%" }}
                        ></div>
                      </div>
                    </div>

                    <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg hover:bg-blue-100 transition-all cursor-pointer group">
                      <h3 className="font-semibold text-blue-700 mb-2 flex items-center group-hover:scale-105 transition-transform">
                        <Brain className="h-5 w-5 mr-2" />
                        Emotional Insight
                      </h3>
                      <p className="text-gray-700">
                        Anxiety levels decrease by 35% after completing the breathing exercises. Your decision-making
                        clarity improves most when you manage this emotion effectively.
                      </p>
                      <div className="mt-3 h-1 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full group-hover:animate-pulse transition-all duration-1000"
                          style={{ width: "65%" }}
                        ></div>
                      </div>
                    </div>

                    <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-lg hover:bg-indigo-100 transition-all cursor-pointer group">
                      <h3 className="font-semibold text-indigo-700 mb-2 flex items-center group-hover:scale-105 transition-transform">
                        <Target className="h-5 w-5 mr-2" />
                        Growth Opportunity
                      </h3>
                      <p className="text-gray-700">
                        Your risk management discipline has improved 28% this month. Focus on maintaining this progress
                        by continuing with the "Calculated Risk" exercise series.
                      </p>
                      <div className="mt-3 h-1 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-indigo-500 rounded-full group-hover:animate-pulse transition-all duration-1000"
                          style={{ width: "90%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t border-gray-200 pt-4">
                  <Button
                    variant="ghost"
                    className="text-gray-600 hover:text-purple-600 hover:bg-purple-50 w-full transition-all hover:scale-105"
                  >
                    Get More Insights
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="journey">
              <Card className="bg-white border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-gray-900">
                    <Award className="mr-2 h-5 w-5 text-purple-600" />
                    Your Transformation Journey
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Track your progress toward trading mastery
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    {/* Animated journey path */}
                    <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 via-purple-300 to-gray-300"></div>

                    <div className="space-y-8 relative">
                      <div className="flex group cursor-pointer">
                        <div className="w-16 relative">
                          <div className="absolute top-0 left-8 transform -translate-x-1/2 w-6 h-6 bg-purple-500 rounded-full border-4 border-white group-hover:scale-125 transition-transform shadow-lg"></div>
                        </div>
                        <div className="flex-1 bg-purple-50 border border-purple-200 rounded-lg p-4 group-hover:bg-purple-100 transition-all">
                          <h3 className="font-semibold text-purple-700 mb-1 group-hover:scale-105 transition-transform">
                            Initial Setup
                          </h3>
                          <p className="text-gray-600 text-sm mb-2">
                            You've completed your initial profile setup and joined ProFitz.
                          </p>
                          <Badge className="bg-purple-100 text-purple-700 border-purple-200">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Completed
                          </Badge>
                        </div>
                      </div>

                      <div className="flex group cursor-pointer">
                        <div className="w-16 relative">
                          <div className="absolute top-0 left-8 transform -translate-x-1/2 w-6 h-6 bg-blue-500 rounded-full border-4 border-white group-hover:scale-125 transition-transform shadow-lg"></div>
                        </div>
                        <div className="flex-1 bg-blue-50 border border-blue-200 rounded-lg p-4 group-hover:bg-blue-100 transition-all">
                          <h3 className="font-semibold text-blue-700 mb-1 group-hover:scale-105 transition-transform">
                            Psychology Assessment
                          </h3>
                          <p className="text-gray-600 text-sm mb-2">
                            Discover your trading psychology profile and get personalized insights.
                          </p>
                          <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                            <Brain className="h-3 w-3 mr-1" />
                            Available
                          </Badge>
                        </div>
                      </div>

                      <div className="flex group cursor-pointer opacity-60 hover:opacity-80 transition-opacity">
                        <div className="w-16 relative">
                          <div className="absolute top-0 left-8 transform -translate-x-1/2 w-6 h-6 bg-gray-300 rounded-full border-4 border-white group-hover:scale-110 transition-transform"></div>
                        </div>
                        <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg p-4 group-hover:bg-gray-100 transition-all">
                          <h3 className="font-semibold text-gray-500 mb-1">Advanced Techniques</h3>
                          <p className="text-gray-500 text-sm mb-2">
                            Master advanced psychological techniques for high-pressure market situations.
                          </p>
                          <Badge variant="outline" className="border-gray-300 text-gray-500">
                            <Timer className="h-3 w-3 mr-1" />
                            Coming Soon
                          </Badge>
                        </div>
                      </div>

                      <div className="flex group cursor-pointer opacity-40 hover:opacity-60 transition-opacity">
                        <div className="w-16 relative">
                          <div className="absolute top-0 left-8 transform -translate-x-1/2 w-6 h-6 bg-gray-300 rounded-full border-4 border-white group-hover:scale-110 transition-transform"></div>
                        </div>
                        <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg p-4 group-hover:bg-gray-100 transition-all">
                          <h3 className="font-semibold text-gray-500 mb-1">Trading Mastery</h3>
                          <p className="text-gray-500 text-sm">
                            Achieve consistent profitability through complete emotional mastery and disciplined
                            execution.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t border-gray-200 pt-4">
                  <Button
                    variant="ghost"
                    className="text-gray-600 hover:text-purple-600 hover:bg-purple-50 w-full transition-all hover:scale-105"
                  >
                    View Full Journey Map
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
