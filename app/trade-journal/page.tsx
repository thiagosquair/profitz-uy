"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Upload, Calendar, Filter, ArrowUpDown, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function TradeJournalPage() {
  const [trades, setTrades] = useState<any[]>([])
  const [filteredTrades, setFilteredTrades] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [filterType, setFilterType] = useState("all")

  useEffect(() => {
    // Load trades from localStorage
    const storedTrades = localStorage.getItem("userTrades")
    if (storedTrades) {
      const parsedTrades = JSON.parse(storedTrades)
      setTrades(parsedTrades)
      setFilteredTrades(parsedTrades)
    }
  }, [])

  useEffect(() => {
    let result = [...trades]

    // Apply search filter
    if (searchQuery) {
      result = result.filter(
        (trade) =>
          trade.tradeDetails?.symbol?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          trade.tradeDetails?.strategy?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          trade.emotionalState?.primaryEmotion?.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Apply type filter
    if (filterType !== "all") {
      result = result.filter((trade) => {
        if (filterType === "winning" && trade.tradeDetails.result === "win") return true
        if (filterType === "losing" && trade.tradeDetails.result === "loss") return true
        if (filterType === "breakeven" && trade.tradeDetails.result === "breakeven") return true
        return false
      })
    }

    // Apply sort
    result.sort((a, b) => {
      const dateA = new Date(a.timestamp).getTime()
      const dateB = new Date(b.timestamp).getTime()
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA
    })

    setFilteredTrades(result)
  }, [trades, searchQuery, sortOrder, filterType])

  const getResultColor = (result: string) => {
    switch (result) {
      case "win":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      case "loss":
        return "bg-red-100 text-red-800 hover:bg-red-200"
      case "breakeven":
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
      default:
        return "bg-blue-100 text-blue-800 hover:bg-blue-200"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Navigation />

      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Trade Journal</h1>
              <p className="text-gray-500">Track, analyze, and improve your trading performance</p>
            </div>
            <Link href="/trade-journal/upload">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Upload className="mr-2 h-4 w-4" />
                Upload Trade
              </Button>
            </Link>
          </div>

          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search trades by symbol, strategy, or emotion..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-[180px] bg-white">
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4 text-gray-500" />
                    <SelectValue placeholder="Filter" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Trades</SelectItem>
                  <SelectItem value="winning">Winning Trades</SelectItem>
                  <SelectItem value="losing">Losing Trades</SelectItem>
                  <SelectItem value="breakeven">Breakeven Trades</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                className="bg-white"
                onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              >
                <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                Date
                <ArrowUpDown className="ml-2 h-4 w-4 text-gray-500" />
              </Button>
            </div>
          </div>

          <Tabs defaultValue="list" className="w-full">
            <TabsList className="mb-6 bg-white">
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="grid">Grid View</TabsTrigger>
              <TabsTrigger value="calendar">Calendar View</TabsTrigger>
              <TabsTrigger value="stats">Statistics</TabsTrigger>
            </TabsList>

            <TabsContent value="list" className="space-y-4">
              {filteredTrades.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Upload className="h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-xl font-medium text-gray-900 mb-2">No trades found</h3>
                    <p className="text-gray-500 mb-4 text-center max-w-md">
                      Upload your first trade to start tracking your performance and get AI-powered insights
                    </p>
                    <Link href="/trade-journal/upload">
                      <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Trade
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                filteredTrades.map((trade) => (
                  <Link href={`/trade-journal/${trade.id}`} key={trade.id}>
                    <Card className="hover:shadow-md transition-shadow">
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          <div className="w-full md:w-48 h-32 relative">
                            <img
                              src={trade.imageUrl || "/placeholder.svg"}
                              alt="Trade chart"
                              className="w-full h-full object-cover object-center"
                            />
                          </div>
                          <div className="p-4 flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium text-gray-900">
                                  {trade.tradeDetails.symbol || "Unknown Symbol"}{" "}
                                  <Badge
                                    variant="secondary"
                                    className={getResultColor(trade.tradeDetails.result || "unknown")}
                                  >
                                    {trade.tradeDetails.result === "win"
                                      ? "Win"
                                      : trade.tradeDetails.result === "loss"
                                        ? "Loss"
                                        : trade.tradeDetails.result === "breakeven"
                                          ? "Breakeven"
                                          : "Unknown"}
                                  </Badge>
                                </h3>
                                <div className="text-sm text-gray-500 mt-1">
                                  {formatDate(trade.timestamp)} • {trade.tradeDetails.timeframe} •{" "}
                                  {trade.tradeDetails.direction === "long" ? "Long" : "Short"}
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-sm font-medium">
                                  {trade.tradeDetails.entryPrice && trade.tradeDetails.exitPrice ? (
                                    <span
                                      className={
                                        trade.tradeDetails.result === "win"
                                          ? "text-green-600"
                                          : trade.tradeDetails.result === "loss"
                                            ? "text-red-600"
                                            : "text-gray-600"
                                      }
                                    >
                                      {trade.tradeDetails.direction === "long"
                                        ? (
                                            ((trade.tradeDetails.exitPrice - trade.tradeDetails.entryPrice) /
                                              trade.tradeDetails.entryPrice) *
                                            100
                                          ).toFixed(2)
                                        : (
                                            ((trade.tradeDetails.entryPrice - trade.tradeDetails.exitPrice) /
                                              trade.tradeDetails.entryPrice) *
                                            100
                                          ).toFixed(2)}
                                      %
                                    </span>
                                  ) : (
                                    "N/A"
                                  )}
                                </div>
                                {trade.tradeDetails.riskRewardRatio && (
                                  <div className="text-xs text-gray-500 mt-1">
                                    R:R {trade.tradeDetails.riskRewardRatio}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="mt-3 flex flex-wrap gap-2">
                              {trade.tradeDetails.strategy && (
                                <Badge variant="outline" className="bg-white">
                                  {trade.tradeDetails.strategy}
                                </Badge>
                              )}
                              {trade.emotionalState.primaryEmotion && (
                                <Badge variant="outline" className="bg-white">
                                  {trade.emotionalState.primaryEmotion}
                                </Badge>
                              )}
                              {trade.aiAnalysis && (
                                <Badge
                                  variant="outline"
                                  className="bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border-blue-200"
                                >
                                  AI Analyzed
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))
              )}
            </TabsContent>

            <TabsContent value="grid">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTrades.length === 0 ? (
                  <Card className="col-span-full">
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <Upload className="h-12 w-12 text-gray-400 mb-4" />
                      <h3 className="text-xl font-medium text-gray-900 mb-2">No trades found</h3>
                      <p className="text-gray-500 mb-4 text-center max-w-md">
                        Upload your first trade to start tracking your performance and get AI-powered insights
                      </p>
                      <Link href="/trade-journal/upload">
                        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                          <Upload className="mr-2 h-4 w-4" />
                          Upload Trade
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ) : (
                  filteredTrades.map((trade) => (
                    <Link href={`/trade-journal/${trade.id}`} key={trade.id}>
                      <Card className="hover:shadow-md transition-shadow h-full">
                        <div className="w-full h-40 relative">
                          <img
                            src={trade.imageUrl || "/placeholder.svg"}
                            alt="Trade chart"
                            className="w-full h-full object-cover object-center"
                          />
                          <Badge
                            className={`absolute top-2 right-2 ${getResultColor(
                              trade.tradeDetails.result || "unknown",
                            )}`}
                          >
                            {trade.tradeDetails.result === "win"
                              ? "Win"
                              : trade.tradeDetails.result === "loss"
                                ? "Loss"
                                : trade.tradeDetails.result === "breakeven"
                                  ? "Breakeven"
                                  : "Unknown"}
                          </Badge>
                        </div>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium text-gray-900">
                              {trade.tradeDetails.symbol || "Unknown Symbol"}
                            </h3>
                            <div className="text-right">
                              <div className="text-sm font-medium">
                                {trade.tradeDetails.entryPrice && trade.tradeDetails.exitPrice ? (
                                  <span
                                    className={
                                      trade.tradeDetails.result === "win"
                                        ? "text-green-600"
                                        : trade.tradeDetails.result === "loss"
                                          ? "text-red-600"
                                          : "text-gray-600"
                                    }
                                  >
                                    {trade.tradeDetails.direction === "long"
                                      ? (
                                          ((trade.tradeDetails.exitPrice - trade.tradeDetails.entryPrice) /
                                            trade.tradeDetails.entryPrice) *
                                          100
                                        ).toFixed(2)
                                      : (
                                          ((trade.tradeDetails.entryPrice - trade.tradeDetails.exitPrice) /
                                            trade.tradeDetails.entryPrice) *
                                          100
                                        ).toFixed(2)}
                                    %
                                  </span>
                                ) : (
                                  "N/A"
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="text-sm text-gray-500 mt-1">
                            {formatDate(trade.timestamp)} • {trade.tradeDetails.timeframe}
                          </div>
                          <div className="mt-3 flex flex-wrap gap-1">
                            {trade.tradeDetails.strategy && (
                              <Badge variant="outline" className="bg-white text-xs">
                                {trade.tradeDetails.strategy}
                              </Badge>
                            )}
                            {trade.emotionalState.primaryEmotion && (
                              <Badge variant="outline" className="bg-white text-xs">
                                {trade.emotionalState.primaryEmotion}
                              </Badge>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="calendar">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center py-12">
                    <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-xl font-medium text-gray-900 mb-2">Calendar View Coming Soon</h3>
                    <p className="text-gray-500 mb-4">
                      We're working on a calendar view to help you visualize your trading patterns over time.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="stats">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center py-12">
                    <ArrowUpDown className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-xl font-medium text-gray-900 mb-2">Statistics Coming Soon</h3>
                    <p className="text-gray-500 mb-4">
                      We're working on comprehensive statistics to help you analyze your trading performance.
                    </p>
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
