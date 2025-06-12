"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Brain, BarChart3, PieChart, LineChart, AlertTriangle, CheckCircle, Clock } from "lucide-react"

export default function AnalyticsPage() {
  const [timeframe, setTimeframe] = useState<"week" | "month" | "quarter">("month")

  const behaviorPatterns = [
    {
      pattern: "Peak Performance Hours",
      description: "Most productive between 9-11 AM and 2-4 PM",
      confidence: 0.89,
      impact: "high",
    },
    {
      pattern: "Monday Motivation Dip",
      description: "40% lower engagement on Monday mornings",
      confidence: 0.76,
      impact: "medium",
    },
    {
      pattern: "Volatility Response",
      description: "Increased anxiety during high VIX periods (>25)",
      confidence: 0.92,
      impact: "high",
    },
  ]

  const consistencyMetrics = {
    overall: 78,
    studyConsistency: 85,
    exerciseCompletion: 72,
    journalFrequency: 90,
    platformEngagement: 68,
    qualityScore: 82,
  }

  const predictiveInsights = [
    {
      type: "risk",
      title: "Streak Break Risk",
      probability: 0.23,
      timeframe: "3 days",
      recommendation: "Schedule lighter activities for weekend",
    },
    {
      type: "opportunity",
      title: "Skill Acceleration",
      probability: 0.87,
      timeframe: "2 weeks",
      recommendation: "Ready for advanced risk psychology modules",
    },
    {
      type: "milestone",
      title: "Habit Formation",
      probability: 0.94,
      timeframe: "5 days",
      recommendation: "Emotional regulation habit will be established",
    },
  ]

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Navigation />

      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Advanced Analytics</h1>
              <p className="text-gray-600">Deep insights into your trading psychology development</p>
            </div>
            <div className="flex space-x-2">
              {(["week", "month", "quarter"] as const).map((period) => (
                <Button
                  key={period}
                  variant={timeframe === period ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTimeframe(period)}
                >
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="patterns">Behavior Patterns</TabsTrigger>
              <TabsTrigger value="predictions">Predictions</TabsTrigger>
              <TabsTrigger value="comparisons">Benchmarks</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Overall Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold mb-2">{consistencyMetrics.overall}%</div>
                    <Progress value={consistencyMetrics.overall} className="mb-2" />
                    <p className="text-xs text-green-600">↑ 12% from last month</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Consistency Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold mb-2">{consistencyMetrics.studyConsistency}%</div>
                    <Progress value={consistencyMetrics.studyConsistency} className="mb-2" />
                    <p className="text-xs text-green-600">↑ 8% from last month</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Quality Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold mb-2">{consistencyMetrics.qualityScore}%</div>
                    <Progress value={consistencyMetrics.qualityScore} className="mb-2" />
                    <p className="text-xs text-blue-600">↑ 15% from last month</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Engagement Level</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold mb-2">{consistencyMetrics.platformEngagement}%</div>
                    <Progress value={consistencyMetrics.platformEngagement} className="mb-2" />
                    <p className="text-xs text-yellow-600">↓ 3% from last month</p>
                  </CardContent>
                </Card>
              </div>

              {/* Detailed Breakdown */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart3 className="mr-2 h-5 w-5" />
                      Skill Development Breakdown
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Emotional Regulation</span>
                        <span>85%</span>
                      </div>
                      <Progress value={85} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Risk Management Psychology</span>
                        <span>72%</span>
                      </div>
                      <Progress value={72} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Discipline & Consistency</span>
                        <span>78%</span>
                      </div>
                      <Progress value={78} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Self-Awareness</span>
                        <span>90%</span>
                      </div>
                      <Progress value={90} />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <PieChart className="mr-2 h-5 w-5" />
                      Activity Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Exercises</span>
                        <div className="flex items-center">
                          <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: "45%" }}></div>
                          </div>
                          <span className="text-sm">45%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Reflections</span>
                        <div className="flex items-center">
                          <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                            <div className="bg-green-600 h-2 rounded-full" style={{ width: "30%" }}></div>
                          </div>
                          <span className="text-sm">30%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">AI Coaching</span>
                        <div className="flex items-center">
                          <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                            <div className="bg-purple-600 h-2 rounded-full" style={{ width: "25%" }}></div>
                          </div>
                          <span className="text-sm">25%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="patterns" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Brain className="mr-2 h-5 w-5" />
                    Behavioral Pattern Analysis
                  </CardTitle>
                  <CardDescription>AI-detected patterns in your learning and engagement behavior</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {behaviorPatterns.map((pattern, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold">{pattern.pattern}</h3>
                          <div className="flex items-center space-x-2">
                            <Badge
                              variant={
                                pattern.impact === "high"
                                  ? "destructive"
                                  : pattern.impact === "medium"
                                    ? "default"
                                    : "secondary"
                              }
                            >
                              {pattern.impact} impact
                            </Badge>
                            <Badge variant="outline">{Math.round(pattern.confidence * 100)}% confidence</Badge>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">{pattern.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="predictions" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <LineChart className="mr-2 h-5 w-5" />
                    Predictive Insights
                  </CardTitle>
                  <CardDescription>AI predictions based on your behavioral patterns and progress data</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {predictiveInsights.map((insight, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center">
                            {insight.type === "risk" && <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />}
                            {insight.type === "opportunity" && <TrendingUp className="h-5 w-5 text-green-500 mr-2" />}
                            {insight.type === "milestone" && <CheckCircle className="h-5 w-5 text-blue-500 mr-2" />}
                            <h3 className="font-semibold">{insight.title}</h3>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">{Math.round(insight.probability * 100)}% probability</Badge>
                            <Badge variant="secondary">
                              <Clock className="h-3 w-3 mr-1" />
                              {insight.timeframe}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{insight.recommendation}</p>
                        <Button size="sm" variant="outline">
                          Take Action
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="comparisons" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Peer Benchmarks</CardTitle>
                  <CardDescription>Compare your progress with similar learners (anonymized data)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Your Progress vs. Peer Average</span>
                        <span>+12% above average</span>
                      </div>
                      <div className="relative">
                        <Progress value={78} className="mb-1" />
                        <div className="absolute top-0 left-[66%] w-0.5 h-2 bg-gray-400"></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Peer Average: 66%</span>
                        <span>Your Score: 78%</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Consistency vs. Top 25%</span>
                        <span>Within top quartile</span>
                      </div>
                      <div className="relative">
                        <Progress value={85} className="mb-1" />
                        <div className="absolute top-0 left-[75%] w-0.5 h-2 bg-green-500"></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Top 25% Threshold: 75%</span>
                        <span>Your Score: 85%</span>
                      </div>
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
