"use client"
import { useState } from "react"
import type React from "react"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Upload, ArrowRight, X, Plus, Info, Brain, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { TradeAnalysisService } from "@/lib/trade-analysis-service"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function TradeUploadPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [includeMarketContext, setIncludeMarketContext] = useState(true)
  const [validationErrors, setValidationErrors] = useState<string[]>([])

  // Form state
  const [formData, setFormData] = useState({
    // Emotional state
    primaryEmotion: "anxiety",
    intensity: [7],
    secondaryEmotions: ["anxiety"],
    mentalClarity: [6],
    stressLevel: [7],
    confidence: [5],
    emotionalNotes: "",

    // Trade details - now required
    symbol: "",
    timeframe: "1H",
    direction: "long",
    entryPrice: "",
    exitPrice: "",
    strategy: "",
    setupType: "",
    riskReward: "",
  })

  const [emotionInput, setEmotionInput] = useState("")

  const emotionOptions = [
    "anxiety",
    "fear",
    "excitement",
    "confidence",
    "doubt",
    "frustration",
    "hope",
    "impatience",
    "regret",
    "satisfaction",
    "uncertainty",
  ]

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadedImage(URL.createObjectURL(file))
    }
  }

  const handleRemoveImage = () => {
    setUploadedImage(null)
  }

  const handleAddEmotion = () => {
    if (emotionInput && !formData.secondaryEmotions.includes(emotionInput)) {
      setFormData((prev) => ({
        ...prev,
        secondaryEmotions: [...prev.secondaryEmotions, emotionInput],
      }))
      setEmotionInput("")
    }
  }

  const handleRemoveEmotion = (emotion: string) => {
    setFormData((prev) => ({
      ...prev,
      secondaryEmotions: prev.secondaryEmotions.filter((e) => e !== emotion),
    }))
  }

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear validation errors when user starts typing
    if (validationErrors.length > 0) {
      setValidationErrors([])
    }
  }

  const validateTradeDetails = (): boolean => {
    const errors: string[] = []

    if (!formData.symbol.trim()) {
      errors.push("Symbol is required")
    }
    if (!formData.entryPrice.trim()) {
      errors.push("Entry Price is required")
    }
    if (!formData.exitPrice.trim()) {
      errors.push("Exit Price is required")
    }
    if (!formData.strategy.trim()) {
      errors.push("Strategy is required")
    }
    if (!formData.setupType.trim()) {
      errors.push("Setup Type is required")
    }
    if (!formData.riskReward.trim()) {
      errors.push("Risk:Reward Ratio is required")
    }

    // Validate numeric fields
    if (formData.entryPrice && isNaN(Number(formData.entryPrice))) {
      errors.push("Entry Price must be a valid number")
    }
    if (formData.exitPrice && isNaN(Number(formData.exitPrice))) {
      errors.push("Exit Price must be a valid number")
    }
    if (formData.riskReward && isNaN(Number(formData.riskReward))) {
      errors.push("Risk:Reward Ratio must be a valid number")
    }

    setValidationErrors(errors)
    return errors.length === 0
  }

  const handleSubmit = async () => {
    if (!uploadedImage) return

    // Validate required fields
    if (!validateTradeDetails()) {
      return
    }

    setIsAnalyzing(true)

    try {
      console.log("🚀 Starting trade analysis with OpenAI...")

      const tradeAnalysisService = new TradeAnalysisService()

      // Prepare emotional state data
      const emotionalState = {
        primaryEmotion: formData.primaryEmotion,
        intensity: formData.intensity[0],
        secondaryEmotions: formData.secondaryEmotions,
        mentalClarity: formData.mentalClarity[0],
        stressLevel: formData.stressLevel[0],
        confidence: formData.confidence[0],
        notes: formData.emotionalNotes,
      }

      // Prepare trade details - all required now
      const tradeDetails = {
        symbol: formData.symbol,
        entryPrice: Number.parseFloat(formData.entryPrice),
        exitPrice: Number.parseFloat(formData.exitPrice),
        direction: formData.direction as "long" | "short",
        timeframe: formData.timeframe,
        riskRewardRatio: Number.parseFloat(formData.riskReward),
        strategy: formData.strategy,
        setupType: formData.setupType,
        result: "unknown" as const, // Will be determined by AI
      }

      console.log("📊 Sending to OpenAI:", { emotionalState, tradeDetails })

      // Force OpenAI analysis - no fallback to simulated
      const aiAnalysis = await tradeAnalysisService.analyzeTradeImage(
        uploadedImage,
        emotionalState,
        tradeDetails,
        includeMarketContext,
      )

      // Check if we actually got OpenAI analysis
      if (aiAnalysis.analysisMethod === "simulated") {
        throw new Error("OpenAI analysis failed - API key may not be configured correctly")
      }

      console.log("✅ OpenAI Analysis completed:", aiAnalysis)

      // Create trade data object
      const tradeData = {
        id: `trade_${Date.now()}`,
        userId: "demo_user",
        imageUrl: uploadedImage,
        timestamp: new Date(),
        emotionalState,
        tradeDetails,
        aiAnalysis,
        tags: ["uploaded", "ai-analyzed"],
      }

      // Store in localStorage for demo
      const existingTrades = JSON.parse(localStorage.getItem("userTrades") || "[]")
      existingTrades.unshift(tradeData)
      localStorage.setItem("userTrades", JSON.stringify(existingTrades))

      console.log("💾 Trade saved with OpenAI analysis:", tradeData.id)

      // Redirect to the trade detail page
      router.push(`/trade-journal/${tradeData.id}`)
    } catch (error) {
      console.error("❌ Error analyzing trade:", error)
      alert(
        `Error analyzing trade with OpenAI: ${error instanceof Error ? error.message : "Unknown error"}. Please check your API key configuration.`,
      )
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Navigation />

      <main className="flex-1 p-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload Trade for AI Analysis</h1>
          <p className="text-gray-500 mb-8">
            Upload your TradingView screenshot for comprehensive OpenAI analysis combining technical and psychological
            insights
          </p>

          <div className="mb-8">
            <div className="flex items-center space-x-2">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  step >= 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
                }`}
              >
                1
              </div>
              <div className={`h-1 w-16 ${step >= 2 ? "bg-blue-600" : "bg-gray-200"}`}></div>
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  step >= 2 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
                }`}
              >
                2
              </div>
              <div className={`h-1 w-16 ${step >= 3 ? "bg-blue-600" : "bg-gray-200"}`}></div>
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  step >= 3 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
                }`}
              >
                3
              </div>
            </div>
          </div>

          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Upload Trade Screenshot</CardTitle>
                <CardDescription>
                  Upload a screenshot of your trade chart from TradingView or other platforms
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!uploadedImage ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                    <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-500 mb-4">Drag and drop your screenshot here or click to browse</p>
                    <Input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                    <Button asChild>
                      <label htmlFor="image-upload">Select Image</label>
                    </Button>
                  </div>
                ) : (
                  <div className="relative">
                    <img
                      src={uploadedImage || "/placeholder.svg"}
                      alt="Trade screenshot"
                      className="w-full rounded-lg"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={handleRemoveImage}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={() => setStep(2)} disabled={!uploadedImage} className="flex items-center">
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          )}

          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Emotional State</CardTitle>
                <CardDescription>
                  Record your emotional state when you took this trade for better pattern recognition
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Primary Emotion</Label>
                  <Select
                    value={formData.primaryEmotion}
                    onValueChange={(value) => updateFormData("primaryEmotion", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select emotion" />
                    </SelectTrigger>
                    <SelectContent>
                      {emotionOptions.map((emotion) => (
                        <SelectItem key={emotion} value={emotion}>
                          {emotion.charAt(0).toUpperCase() + emotion.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Intensity (1-10): {formData.intensity[0]}</Label>
                  <Slider
                    value={formData.intensity}
                    onValueChange={(value) => updateFormData("intensity", value)}
                    max={10}
                    step={1}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Secondary Emotions</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.secondaryEmotions.map((emotion) => (
                      <Badge key={emotion} variant="secondary" className="flex items-center gap-1">
                        {emotion}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => handleRemoveEmotion(emotion)} />
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={emotionInput}
                      onChange={(e) => setEmotionInput(e.target.value)}
                      placeholder="Add emotion"
                      className="flex-1"
                    />
                    <Button size="sm" onClick={handleAddEmotion} disabled={!emotionInput}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Mental Clarity (1-10): {formData.mentalClarity[0]}</Label>
                    <Slider
                      value={formData.mentalClarity}
                      onValueChange={(value) => updateFormData("mentalClarity", value)}
                      max={10}
                      step={1}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Stress Level (1-10): {formData.stressLevel[0]}</Label>
                    <Slider
                      value={formData.stressLevel}
                      onValueChange={(value) => updateFormData("stressLevel", value)}
                      max={10}
                      step={1}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Confidence (1-10): {formData.confidence[0]}</Label>
                    <Slider
                      value={formData.confidence}
                      onValueChange={(value) => updateFormData("confidence", value)}
                      max={10}
                      step={1}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={formData.emotionalNotes}
                    onChange={(e) => updateFormData("emotionalNotes", e.target.value)}
                    placeholder="Add any additional notes about your emotional state..."
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button onClick={() => setStep(3)}>Next</Button>
              </CardFooter>
            </Card>
          )}

          {step === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>Trade Details</CardTitle>
                <CardDescription>All fields are required for accurate OpenAI analysis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {validationErrors.length > 0 && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      <div className="space-y-1">
                        {validationErrors.map((error, index) => (
                          <div key={index}>• {error}</div>
                        ))}
                      </div>
                    </AlertDescription>
                  </Alert>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="symbol">Symbol *</Label>
                    <Input
                      id="symbol"
                      value={formData.symbol}
                      onChange={(e) => updateFormData("symbol", e.target.value)}
                      placeholder="e.g. EURUSD, AAPL"
                      className={validationErrors.some((e) => e.includes("Symbol")) ? "border-red-500" : ""}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timeframe">Timeframe *</Label>
                    <Select value={formData.timeframe} onValueChange={(value) => updateFormData("timeframe", value)}>
                      <SelectTrigger id="timeframe">
                        <SelectValue placeholder="Select timeframe" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1m">1 minute</SelectItem>
                        <SelectItem value="5m">5 minutes</SelectItem>
                        <SelectItem value="15m">15 minutes</SelectItem>
                        <SelectItem value="30m">30 minutes</SelectItem>
                        <SelectItem value="1H">1 hour</SelectItem>
                        <SelectItem value="4H">4 hours</SelectItem>
                        <SelectItem value="Daily">Daily</SelectItem>
                        <SelectItem value="Weekly">Weekly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Direction *</Label>
                  <RadioGroup
                    value={formData.direction}
                    onValueChange={(value) => updateFormData("direction", value)}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="long" id="long" />
                      <Label htmlFor="long">Long</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="short" id="short" />
                      <Label htmlFor="short">Short</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="entry">Entry Price *</Label>
                    <Input
                      id="entry"
                      type="number"
                      step="0.00001"
                      value={formData.entryPrice}
                      onChange={(e) => updateFormData("entryPrice", e.target.value)}
                      className={validationErrors.some((e) => e.includes("Entry Price")) ? "border-red-500" : ""}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="exit">Exit Price *</Label>
                    <Input
                      id="exit"
                      type="number"
                      step="0.00001"
                      value={formData.exitPrice}
                      onChange={(e) => updateFormData("exitPrice", e.target.value)}
                      className={validationErrors.some((e) => e.includes("Exit Price")) ? "border-red-500" : ""}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="strategy">Strategy *</Label>
                    <Input
                      id="strategy"
                      value={formData.strategy}
                      onChange={(e) => updateFormData("strategy", e.target.value)}
                      placeholder="e.g. Support Bounce, Breakout"
                      className={validationErrors.some((e) => e.includes("Strategy")) ? "border-red-500" : ""}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="setup">Setup Type *</Label>
                    <Input
                      id="setup"
                      value={formData.setupType}
                      onChange={(e) => updateFormData("setupType", e.target.value)}
                      placeholder="e.g. Reversal, Continuation"
                      className={validationErrors.some((e) => e.includes("Setup Type")) ? "border-red-500" : ""}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="risk-reward">Risk:Reward Ratio *</Label>
                  <Input
                    id="risk-reward"
                    type="number"
                    step="0.1"
                    value={formData.riskReward}
                    onChange={(e) => updateFormData("riskReward", e.target.value)}
                    placeholder="e.g. 1.5"
                    className={validationErrors.some((e) => e.includes("Risk:Reward")) ? "border-red-500" : ""}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="market-context">Include Market Context</Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">
                              Fetches market data like volatility, trend strength, key levels, and indicators to provide
                              context for your trade analysis.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Switch
                      id="market-context"
                      checked={includeMarketContext}
                      onCheckedChange={setIncludeMarketContext}
                    />
                  </div>
                  {includeMarketContext && (
                    <div className="p-4 bg-blue-50 rounded-md mt-2">
                      <p className="text-sm text-blue-800">
                        Market context will include volatility analysis, trend strength, key price levels, technical
                        indicators, and relevant market events at the time of your trade.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button onClick={handleSubmit} disabled={isAnalyzing}>
                  {isAnalyzing ? (
                    <>
                      <Brain className="mr-2 h-4 w-4 animate-pulse" />
                      OpenAI Analyzing Trade...
                    </>
                  ) : (
                    "Submit for OpenAI Analysis"
                  )}
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
