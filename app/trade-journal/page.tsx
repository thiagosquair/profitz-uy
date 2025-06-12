"use client"
import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar, Upload, Search, BarChart3, Brain, TrendingUp, TrendingDown, Activity, Gauge } from "lucide-react"
import Link from "next/link"

export default function TradeJournalPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTimeframe, setSelectedTimeframe] = useState("all")
  const [selectedResult, setSelectedResult] = useState("all")
  const [selectedEmotion, setSelectedEmotion] = useState("all")
  const [trades, setTrades] = useState([])

  useEffect(() => {
    // Load trades from localStorage
    const storedTrades = JSON.parse(localStorage.getItem("userTrades") || "[]")

    // Combine with sample data for demo
    const sampleTrades = [
      {
        id: "sample_1",
        symbol: "EURUSD",
        direction: "long",
        result: "win",
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        emotion: "anxiety",
        emotionIntensity: 7,
        timeframe: "1H",
        imageUrl: "/placeholder.svg?height=200&width=300",
        pips: 30,
        marketContext: {
          volatility: { value: 0.65, isHigh: false },
          trend: { direction: "sideways", strength: 25 },
        },
      },
      {
        id: "sample_2",
        symbol: "GBPJPY",
        direction: "short",
        result: "win",
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        emotion: "confidence",
        emotionIntensity: 8,
        timeframe: "4H",
        imageUrl: "/placeholder.svg?height=200&width=300",
        pips: 85,
        marketContext: {
          volatility: { value: 0.85, isHigh: true },
          trend: { direction: "down", strength: 82 },
        },
      },
      {
        id: "sample_3",
        symbol: "GBPUSD",
        direction: "long",
        result: "loss",
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        emotion: "impatient",
        emotionIntensity: 6,
        timeframe: "1H",
        imageUrl: "/placeholder.svg?height=200&width=300",
        pips: -45,
        marketContext: {
          volatility: { value: 0.72, isHigh: false },
          trend: { direction: "up", strength: 45 },
        },
      },
      {
        id: "sample_4",
        symbol: "USDJPY",
        direction: "short",
        result: "loss",
        date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        emotion: "fear",
        emotionIntensity: 8,
        timeframe: "Daily",
        imageUrl: "/placeholder.svg?height=200&width=300",
        pips: -65,
        marketContext: {
          volatility: { value: 0.95, isHigh: true },
          trend: { direction: "up", strength: 75 },
        },
      },
    ]

    // Convert stored trades to display format
    const formattedStoredTrades = storedTrades.map((trade) => ({
      id: trade.id,
      symbol: trade.tradeDetails?.symbol || "Unknown",
      direction: trade.tradeDetails?.direction || "unknown",
      result: trade.tradeDetails?.result || "unknown",
      date: new Date(trade.timestamp),
      emotion: trade.emotionalState?.primaryEmotion || "unknown",
      emotionIntensity: trade.emotionalState?.intensity || 5,
      timeframe: trade.tradeDetails?.timeframe || "1H",
      imageUrl: trade.imageUrl,
      pips: trade.tradeDetails?.result === "win" ? 30 : -20, // Simplified for demo
      marketContext: {
        volatility: { value: 0.65, isHigh: false },
        trend: { direction: "sideways", strength: 25 },
      },
    }))

    setTrades([...formattedStoredTrades, ...sampleTrades])
  }, [])

  // Filter trades based on search and filters
  const filteredTrades = trades.filter((trade) => {
    const matchesSearch =
      searchQuery === "" ||
      trade.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trade.direction.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesTimeframe = selectedTimeframe === "all" || trade.timeframe === selectedTimeframe
    const matchesResult = selectedResult === "all" || trade.result === selectedResult
    const matchesEmotion = selectedEmotion === "all" || trade.emotion === selectedEmotion

    return matchesSearch && matchesTimeframe && matchesResult && matchesEmotion
  })

  // Calculate statistics
  const totalTrades = trades.length
  const winningTrades = trades.filter((trade) => trade.result === "win").length
  const losingTrades = trades.filter((trade) => trade.result === "loss").length
  const winRate = totalTrades > 0 ? Math.round((winningTrades / totalTrades) * 100) : 0
  const totalPips = trades.reduce((sum, trade) => sum + trade.pips, 0)

  const getResultColor = (result: string) => {
    switch (result) {
      case "win":
        return "bg-green-100 text-green-800"
      case "loss":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getEmotionColor = (emotion: string) => {
    const emotionColors: { [key: string]: string } = {
      anxiety: "bg-yellow-100 text-yellow-800",
      confidence: "bg-blue-100 text-blue-800",
      impatient: "bg-orange-100 text-orange-800",
      fear: "bg-red-100 text-red-800",
    }
    return emotionColors[emotion.toLowerCase()] || "bg-gray-100 text-gray-800"
  }

  const getTrendIcon = (direction: string) => {
    switch (direction) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-600" />
      default:
        return <Activity className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Navigation />

      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Trade Journal</h1>
              <p className="text-gray-500">Track, analyze, and improve your trading performance</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link href="/trade-journal/upload">
                <Button className="flex items-center">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Trade
                </Button>
              </Link>
            </div>
          </div>

          <Tabs defaultValue="journal" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="journal">Journal</TabsTrigger>
              <TabsTrigger value="statistics">Statistics</TabsTrigger>
            </TabsList>

            <TabsContent value="journal" className="space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Filters</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                      <Input
                        placeholder="Search trades..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                      <SelectTrigger>
                        <SelectValue placeholder="Timeframe" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Timeframes</SelectItem>
                        <SelectItem value="1H">1 Hour</SelectItem>
                        <SelectItem value="4H">4 Hours</SelectItem>
                        <SelectItem value="Daily">Daily</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={selectedResult} onValueChange={setSelectedResult}>
                      <SelectTrigger>
                        <SelectValue placeholder="Result" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Results</SelectItem>
                        <SelectItem value="win">Win</SelectItem>
                        <SelectItem value="loss">Loss</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={selectedEmotion} onValueChange={setSelectedEmotion}>
                      <SelectTrigger>
                        <SelectValue placeholder="Emotion" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Emotions</SelectItem>
                        <SelectItem value="anxiety">Anxiety</SelectItem>
                        <SelectItem value="confidence">Confidence</SelectItem>
                        <SelectItem value="impatient">Impatience</SelectItem>
                        <SelectItem value="fear">Fear</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTrades.length > 0 ? (
                  filteredTrades.map((trade) => (
                    <Link href={`/trade-journal/${trade.id}`} key={trade.id}>
                      <Card className="h-full hover:shadow-md transition-shadow">
                        <div className="relative">
                          <img
                            src={trade.imageUrl || "/placeholder.svg"}
                            alt={`${trade.symbol} chart`}
                            className="w-full h-40 object-cover rounded-t-lg"
                          />
                          <div className="absolute top-2 right-2 flex space-x-2">
                            <Badge className={getResultColor(trade.result)}>{trade.result}</Badge>
                          </div>
                        </div>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-center">
                            <CardTitle className="text-xl">{trade.symbol}</CardTitle>
                            <Badge variant="outline">{trade.timeframe}</Badge>
                          </div>
                          <CardDescription className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {trade.date.toLocaleDateString()}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="flex justify-between items-center mb-3">
                            <Badge variant="outline" className="capitalize">
                              {trade.direction}
                            </Badge>
                            <span className={`font-medium ${trade.pips > 0 ? "text-green-600" : "text-red-600"}`}>
                              {trade.pips > 0 ? "+" : ""}
                              {trade.pips} pips
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <Badge className={getEmotionColor(trade.emotion)}>
                              {trade.emotion} ({trade.emotionIntensity}/10)
                            </Badge>
                          </div>
                        </CardContent>
                        <Separator />
                        <CardFooter className="pt-3">
                          <div className="w-full grid grid-cols-2 gap-2">
                            <div className="flex items-center text-sm">
                              <Gauge className="h-4 w-4 mr-1 text-blue-600" />
                              <span className="text-gray-600">Volatility:</span>
                              <span className="ml-1 font-medium">{trade.marketContext.volatility.value}%</span>
                              {trade.marketContext.volatility.isHigh && (
                                <Badge variant="outline" className="ml-1 py-0 h-5 bg-yellow-50">
                                  High
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center text-sm">
                              {getTrendIcon(trade.marketContext.trend.direction)}
                              <span className="text-gray-600 ml-1">Trend:</span>
                              <span className="ml-1 font-medium capitalize">{trade.marketContext.trend.direction}</span>
                            </div>
                          </div>
                        </CardFooter>
                      </Card>
                    </Link>
                  ))
                ) : (
                  <div className="col-span-3 text-center py-12">
                    <p className="text-gray-500">No trades match your filters.</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="statistics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Total Trades</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{totalTrades}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Win Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{winRate}%</div>
                    <p className="text-sm text-gray-500">
                      {winningTrades} wins, {losingTrades} losses
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Total Pips</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className={`text-3xl font-bold ${totalPips >= 0 ? "text-green-600" : "text-red-600"}`}>
                      {totalPips > 0 ? "+" : ""}
                      {totalPips}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Avg. Pips per Trade</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div
                      className={`text-3xl font-bold ${
                        totalTrades > 0 && totalPips / totalTrades >= 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {totalTrades > 0 ? (totalPips / totalTrades > 0 ? "+" : "") : ""}
                      {totalTrades > 0 ? (totalPips / totalTrades).toFixed(1) : "0"}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart3 className="mr-2 h-5 w-5" />
                      Performance by Timeframe
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12 text-gray-500">More data needed for meaningful statistics.</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Brain className="mr-2 h-5 w-5" />
                      Emotional Impact
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12 text-gray-500">More data needed for meaningful statistics.</div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
