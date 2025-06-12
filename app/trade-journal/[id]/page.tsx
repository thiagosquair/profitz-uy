"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, TrendingUp, Brain, Target, AlertTriangle, Share, Download, Bot } from "lucide-react"
import type { TradeAnalysis } from "@/lib/trade-analysis-service"

export default function TradeDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [trade, setTrade] = useState<TradeAnalysis | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadTrade = () => {
      try {
        // Load from localStorage
        const storedTrades = JSON.parse(localStorage.getItem("userTrades") || "[]")
        const foundTrade = storedTrades.find((t: TradeAnalysis) => t.id === params.id)

        if (foundTrade) {
          setTrade(foundTrade)
        } else {
          // Fallback to sample data if not found
          console.log("Trade not found in localStorage, using sample data")
          setTrade(null)
        }
      } catch (error) {
        console.error("Error loading trade:", error)
        setTrade(null)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      loadTrade()
    }
  }, [params.id])

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Navigation />
        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-64 bg-gray-200 rounded mb-4"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (!trade) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Navigation />
        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            <Button variant="ghost" onClick={() => router.back()} className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Journal
            </Button>
            <Card>
              <CardContent className="p-8 text-center">
                <h2 className="text-xl font-semibold mb-2">Trade Not Found</h2>
                <p className="text-gray-500 mb-4">The requested trade could not be found.</p>
                <Button onClick={() => router.push("/trade-journal")}>Return to Trade Journal</Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    )
  }

  const formatDate = (date: Date | string) => {
    const d = typeof date === "string" ? new Date(date) : date
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getResultColor = (result?: string) => {
    switch (result) {
      case "win":
        return "bg-green-100 text-green-800"
      case "loss":
        return "bg-red-100 text-red-800"
      case "breakeven":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getEmotionColor = (emotion: string) => {
    const colors: Record<string, string> = {
      anxiety: "bg-orange-100 text-orange-800",
      fear: "bg-red-100 text-red-800",
      confidence: "bg-blue-100 text-blue-800",
      excitement: "bg-purple-100 text-purple-800",
      doubt: "bg-gray-100 text-gray-800",
      satisfaction: "bg-green-100 text-green-800",
    }
    return colors[emotion] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Navigation />

      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => router.back()}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Journal
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {trade.tradeDetails.symbol || "Trade"} {trade.tradeDetails.direction?.toUpperCase()}
                </h1>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge className={getResultColor(trade.tradeDetails.result)}>
                    {trade.tradeDetails.result || "unknown"}
                  </Badge>
                  <Badge variant="outline">{trade.tradeDetails.timeframe}</Badge>
                  <Badge variant="outline">{trade.tradeDetails.strategy || "No Strategy"}</Badge>
                  <Badge variant="outline">{trade.tradeDetails.setupType || "No Setup"}</Badge>
                  <span className="text-sm text-gray-500">{formatDate(trade.timestamp)}</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Share className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Chart and Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Trade Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Trade Chart</CardTitle>
                </CardHeader>
                <CardContent>
                  <img
                    src={trade.imageUrl || "/placeholder.svg?height=400&width=600"}
                    alt="Trade chart"
                    className="w-full rounded-lg"
                  />
                </CardContent>
              </Card>

              {/* Analysis Tabs */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center">
                      {trade.aiAnalysis.analysisMethod === "openai" ? (
                        <>
                          <Bot className="mr-2 h-5 w-5 text-blue-600" />
                          AI Analysis (OpenAI GPT-4o)
                        </>
                      ) : (
                        <>
                          <Brain className="mr-2 h-5 w-5 text-purple-600" />
                          AI Analysis (Simulated)
                        </>
                      )}
                    </CardTitle>
                    <Badge variant={trade.aiAnalysis.analysisMethod === "openai" ? "default" : "secondary"}>
                      {trade.aiAnalysis.analysisMethod === "openai" ? "Real AI" : "Demo Mode"}
                    </Badge>
                  </div>
                  <CardDescription>
                    {trade.aiAnalysis.analysisMethod === "openai"
                      ? "Analysis powered by OpenAI's GPT-4o with vision capabilities"
                      : "Simulated AI analysis based on your trade data (OpenAI API key not configured)"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="summary" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="summary">Summary</TabsTrigger>
                      <TabsTrigger value="technical">Technical</TabsTrigger>
                      <TabsTrigger value="psychological">Psychology</TabsTrigger>
                      <TabsTrigger value="patterns">Patterns</TabsTrigger>
                    </TabsList>

                    <TabsContent value="summary" className="space-y-4">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <p className="text-blue-900">{trade.aiAnalysis.summary}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">Analysis Confidence:</span>
                        <Progress value={trade.aiAnalysis.confidenceScore * 100} className="flex-1" />
                        <span className="text-sm text-gray-500">
                          {Math.round(trade.aiAnalysis.confidenceScore * 100)}%
                        </span>
                      </div>
                    </TabsContent>

                    <TabsContent value="technical" className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center">
                          <TrendingUp className="mr-2 h-4 w-4" />
                          Technical Observations
                        </h4>
                        <ul className="space-y-2">
                          {trade.aiAnalysis.technicalObservations.map((observation, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                              <span className="text-sm">{observation}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center">
                          <Target className="mr-2 h-4 w-4" />
                          Risk Management Assessment
                        </h4>
                        <p className="text-sm bg-gray-50 p-3 rounded">{trade.aiAnalysis.riskManagementAssessment}</p>
                      </div>
                    </TabsContent>

                    <TabsContent value="psychological" className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center">
                          <Brain className="mr-2 h-4 w-4" />
                          Psychological Insights
                        </h4>
                        <ul className="space-y-2">
                          {trade.aiAnalysis.psychologicalInsights.map((insight, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                              <span className="text-sm">{insight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center">
                          <AlertTriangle className="mr-2 h-4 w-4" />
                          Improvement Suggestions
                        </h4>
                        <ul className="space-y-2">
                          {trade.aiAnalysis.improvementSuggestions.map((suggestion, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                              <span className="text-sm">{suggestion}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </TabsContent>

                    <TabsContent value="patterns" className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Pattern Recognition</h4>
                        <ul className="space-y-2">
                          {trade.aiAnalysis.patternRecognition.map((pattern, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                              <span className="text-sm">{pattern}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      {trade.aiAnalysis.marketContextInsights && (
                        <div>
                          <h4 className="font-semibold mb-2">Market Context</h4>
                          <ul className="space-y-2">
                            {trade.aiAnalysis.marketContextInsights.map((insight, index) => (
                              <li key={index} className="flex items-start space-x-2">
                                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                                <span className="text-sm">{insight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Trade Details */}
            <div className="space-y-6">
              {/* Trade Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Trade Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm font-medium text-gray-500">Entry Price</span>
                      <p className="text-lg font-semibold">{trade.tradeDetails.entryPrice || "N/A"}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Exit Price</span>
                      <p className="text-lg font-semibold">{trade.tradeDetails.exitPrice || "N/A"}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm font-medium text-gray-500">Risk:Reward</span>
                      <p className="text-lg font-semibold">{trade.tradeDetails.riskRewardRatio || "N/A"}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Direction</span>
                      <p className="text-lg font-semibold capitalize">{trade.tradeDetails.direction || "N/A"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Emotional State */}
              <Card>
                <CardHeader>
                  <CardTitle>Emotional State</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Primary: {trade.emotionalState.primaryEmotion}</span>
                      <span className="text-sm text-gray-500">Intensity: {trade.emotionalState.intensity}/10</span>
                    </div>
                    <Progress value={trade.emotionalState.intensity * 10} className="h-2" />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {trade.emotionalState.secondaryEmotions.map((emotion) => (
                      <Badge key={emotion} variant="secondary" className={getEmotionColor(emotion)}>
                        {emotion}
                      </Badge>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <span className="text-sm font-medium text-gray-500">Mental Clarity</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={trade.emotionalState.mentalClarity * 10} className="flex-1 h-2" />
                        <span className="text-sm">{trade.emotionalState.mentalClarity}/10</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Stress Level</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={trade.emotionalState.stressLevel * 10} className="flex-1 h-2" />
                        <span className="text-sm">{trade.emotionalState.stressLevel}/10</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Confidence</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={trade.emotionalState.confidence * 10} className="flex-1 h-2" />
                        <span className="text-sm">{trade.emotionalState.confidence}/10</span>
                      </div>
                    </div>
                  </div>

                  {trade.emotionalState.notes && (
                    <div>
                      <span className="text-sm font-medium text-gray-500">Notes</span>
                      <p className="text-sm mt-1 p-3 bg-gray-50 rounded">{trade.emotionalState.notes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Tags */}
              <Card>
                <CardHeader>
                  <CardTitle>Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {trade.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
