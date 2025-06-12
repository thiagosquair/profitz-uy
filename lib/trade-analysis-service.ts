import { MarketDataService, type MarketContext } from "./market-data-service"

export interface TradeAnalysis {
  id: string
  userId: string
  imageUrl: string
  timestamp: Date
  emotionalState: EmotionalState
  tradeDetails: TradeDetails
  aiAnalysis: AIAnalysis
  marketContext?: MarketContext
  tags: string[]
}

export interface EmotionalState {
  primaryEmotion: string
  intensity: number // 1-10
  secondaryEmotions: string[]
  mentalClarity: number // 1-10
  stressLevel: number // 1-10
  confidence: number // 1-10
  notes: string
}

export interface TradeDetails {
  symbol?: string
  entryPrice?: number
  exitPrice?: number
  direction: "long" | "short" | "unknown"
  timeframe?: string
  result?: "win" | "loss" | "breakeven" | "unknown"
  riskRewardRatio?: number
  strategy?: string
  setupType?: string
}

export interface AIAnalysis {
  summary: string
  technicalObservations: string[]
  psychologicalInsights: string[]
  improvementSuggestions: string[]
  patternRecognition: string[]
  confidenceScore: number // 0-1
  riskManagementAssessment: string
  marketContextInsights?: string[]
  analysisMethod: "openai" | "simulated" // Track which method was used
  debugInfo?: string // Add debug information
}

export interface TradePattern {
  pattern: string
  description: string
  frequency: number
  emotionalCorrelation: {
    emotion: string
    correlation: number // -1 to 1
  }[]
  outcomes: {
    result: string
    percentage: number
  }[]
  recommendations: string[]
}

export class TradeAnalysisService {
  private marketDataService: MarketDataService

  constructor() {
    this.marketDataService = new MarketDataService()
  }

  async analyzeTradeImage(
    imageUrl: string,
    emotionalState: EmotionalState,
    tradeDetails: Partial<TradeDetails>,
    includeMarketContext = true,
  ): Promise<AIAnalysis> {
    console.log("🤖 Starting OpenAI trade analysis...")
    console.log("📊 Trade details:", tradeDetails)
    console.log("🧠 Emotional state:", emotionalState)

    // Check for API key
    const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY
    if (!apiKey) {
      throw new Error("OpenAI API key not found. Please add NEXT_PUBLIC_OPENAI_API_KEY to your environment variables.")
    }

    console.log("🔑 OpenAI API key found:", apiKey.substring(0, 10) + "...")

    // Get market context if requested and symbol/timeframe are provided
    let marketContext: MarketContext | undefined
    if (includeMarketContext && tradeDetails.symbol && tradeDetails.timeframe) {
      try {
        marketContext = await this.marketDataService.getMarketContext(
          tradeDetails.symbol,
          tradeDetails.timeframe,
          new Date(),
        )
        console.log("📈 Market context retrieved:", marketContext)
      } catch (error) {
        console.error("❌ Error fetching market context:", error)
      }
    }

    // Perform OpenAI analysis - no fallback
    return await this.performOpenAIAnalysis(imageUrl, emotionalState, tradeDetails, marketContext)
  }

  private async performOpenAIAnalysis(
    imageUrl: string,
    emotionalState: EmotionalState,
    tradeDetails: Partial<TradeDetails>,
    marketContext?: MarketContext,
  ): Promise<AIAnalysis> {
    console.log("🔍 Performing OpenAI Vision API analysis...")

    try {
      // Use fetch directly to call OpenAI API
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content: `You are an expert trading psychologist and technical analyst with 20+ years of experience. 
              
              Your task is to analyze trading chart screenshots and provide comprehensive insights that combine:
              1. Technical analysis of the chart patterns, indicators, and price action
              2. Psychological analysis based on the trader's emotional state
              3. Risk management assessment
              4. Actionable improvement suggestions
              
              Always provide specific, actionable insights that will help improve trading performance.
              Focus on both the technical setup and the psychological factors that influenced the trade.`,
            },
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: `Please analyze this trading chart screenshot and provide a comprehensive analysis.

TRADE CONTEXT:
- Symbol: ${tradeDetails.symbol || "Not specified"}
- Direction: ${tradeDetails.direction || "Not specified"}
- Entry Price: ${tradeDetails.entryPrice || "Not specified"}
- Exit Price: ${tradeDetails.exitPrice || "Not specified"}
- Timeframe: ${tradeDetails.timeframe || "Not specified"}
- Strategy: ${tradeDetails.strategy || "Not specified"}
- Setup Type: ${tradeDetails.setupType || "Not specified"}
- Risk:Reward Ratio: ${tradeDetails.riskRewardRatio || "Not specified"}
- Result: ${tradeDetails.result || "Not specified"}

EMOTIONAL STATE:
- Primary Emotion: ${emotionalState.primaryEmotion} (Intensity: ${emotionalState.intensity}/10)
- Secondary Emotions: ${emotionalState.secondaryEmotions.join(", ")}
- Mental Clarity: ${emotionalState.mentalClarity}/10
- Stress Level: ${emotionalState.stressLevel}/10
- Confidence: ${emotionalState.confidence}/10
- Notes: ${emotionalState.notes}

${
  marketContext
    ? `MARKET CONTEXT:
- Volatility: ${marketContext.volatility.value}% (${marketContext.volatility.isHigh ? "High" : "Normal"})
- Trend: ${marketContext.trend.direction} (Strength: ${marketContext.trend.strength}%)
- Key Levels: ${marketContext.keyLevels.map((l) => `${l.type} at ${l.price}`).join(", ")}
- RSI: ${marketContext.indicators.find((i) => i.name === "RSI(14)")?.value || "N/A"}
- MACD: ${marketContext.indicators.find((i) => i.name === "MACD")?.value || "N/A"}`
    : ""
}

Please provide your analysis in the following structured format:

TECHNICAL ANALYSIS:
- What do you see in the chart? (price action, patterns, indicators, support/resistance levels)
- How was the entry and exit timing?
- What technical factors supported or contradicted this trade?
- Rate the technical setup quality (1-10)

PSYCHOLOGICAL ANALYSIS:
- How did the emotional state (${emotionalState.primaryEmotion}, ${emotionalState.intensity}/10 intensity) likely impact decision-making?
- What psychological patterns do you observe?
- How did stress (${emotionalState.stressLevel}/10) and confidence (${emotionalState.confidence}/10) affect execution?

IMPROVEMENT SUGGESTIONS:
- Specific actionable recommendations for better entries/exits
- Emotional regulation techniques for this trader's profile
- Risk management improvements
- Process optimization suggestions

PATTERN RECOGNITION:
- What behavioral patterns do you identify?
- How does this trade fit into common trading psychology patterns?
- What recurring themes should the trader watch for?

Provide detailed, specific insights that will genuinely help this trader improve their performance.`,
                },
                {
                  type: "image_url",
                  image_url: {
                    url: imageUrl,
                  },
                },
              ],
            },
          ],
          max_tokens: 2000,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(`OpenAI API error: ${response.status} - ${errorData.error?.message || "Unknown error"}`)
      }

      const data = await response.json()
      const aiText = data.choices[0]?.message?.content

      if (!aiText) {
        throw new Error("No response from OpenAI API")
      }

      console.log("✅ OpenAI analysis completed successfully")
      console.log("📝 Raw AI response length:", aiText.length)

      // Parse the AI response into structured format
      const analysis = this.parseAIResponse(aiText, marketContext)
      analysis.analysisMethod = "openai"
      analysis.debugInfo = "OpenAI analysis completed successfully"

      console.log("🎯 Structured OpenAI analysis completed")
      return analysis
    } catch (error) {
      console.error("💥 OpenAI API Error:", error)
      throw new Error(`OpenAI analysis failed: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  }

  private parseAIResponse(aiText: string, marketContext?: MarketContext): AIAnalysis {
    // Extract different sections from the AI response
    const sections = {
      technical: this.extractSection(aiText, "TECHNICAL ANALYSIS:", "PSYCHOLOGICAL ANALYSIS:"),
      psychological: this.extractSection(aiText, "PSYCHOLOGICAL ANALYSIS:", "IMPROVEMENT SUGGESTIONS:"),
      improvements: this.extractSection(aiText, "IMPROVEMENT SUGGESTIONS:", "PATTERN RECOGNITION:"),
      patterns: this.extractSection(aiText, "PATTERN RECOGNITION:", ""),
    }

    // Convert sections into structured arrays
    const technicalObservations = this.extractBulletPoints(sections.technical)
    const psychologicalInsights = this.extractBulletPoints(sections.psychological)
    const improvementSuggestions = this.extractBulletPoints(sections.improvements)
    const patternRecognition = this.extractBulletPoints(sections.patterns)

    // Generate market context insights if available
    const marketContextInsights = marketContext
      ? [
          `Trade occurred during ${marketContext.volatility.isHigh ? "high" : "normal"} market volatility (${marketContext.volatility.value}%)`,
          `Market trend: ${marketContext.trend.direction} with ${marketContext.trend.strength}% strength`,
          `Key levels: ${marketContext.keyLevels.map((l) => `${l.type} at ${l.price}`).join(", ")}`,
          ...marketContext.indicators.map((i) => `${i.name}: ${i.value} (${i.interpretation})`),
        ]
      : undefined

    // Extract summary (first paragraph or create one)
    const summary =
      aiText
        .split("\n")
        .find((line) => line.trim().length > 50)
        ?.trim() || "AI analysis completed based on chart patterns and emotional state data."

    return {
      summary,
      technicalObservations:
        technicalObservations.length > 0
          ? technicalObservations
          : ["Chart analysis completed", "Price action patterns identified", "Entry and exit points evaluated"],
      psychologicalInsights:
        psychologicalInsights.length > 0
          ? psychologicalInsights
          : [
              "Emotional state impact assessed",
              "Decision-making patterns analyzed",
              "Stress and confidence factors evaluated",
            ],
      improvementSuggestions:
        improvementSuggestions.length > 0
          ? improvementSuggestions
          : [
              "Continue documenting emotional states",
              "Review entry and exit criteria",
              "Practice risk management techniques",
            ],
      patternRecognition:
        patternRecognition.length > 0
          ? patternRecognition
          : ["Trading behavior patterns identified", "Emotional trading correlations noted"],
      confidenceScore: 0.85,
      riskManagementAssessment: this.extractRiskAssessment(aiText),
      marketContextInsights,
      analysisMethod: "openai",
    }
  }

  private extractSection(text: string, startMarker: string, endMarker: string): string {
    const startIndex = text.indexOf(startMarker)
    if (startIndex === -1) return ""

    const contentStart = startIndex + startMarker.length
    const endIndex = endMarker ? text.indexOf(endMarker, contentStart) : text.length

    return text.substring(contentStart, endIndex === -1 ? text.length : endIndex).trim()
  }

  private extractBulletPoints(text: string): string[] {
    if (!text) return []

    // Split by common bullet point patterns and clean up
    const points = text
      .split(/[-•*]\s+|^\d+\.\s+/gm)
      .map((point) => point.trim())
      .filter((point) => point.length > 10 && !point.includes(":"))
      .slice(0, 6) // Limit to 6 points max

    return points.length > 0 ? points : [text.substring(0, 200)]
  }

  private extractRiskAssessment(text: string): string {
    // Look for risk-related content in the AI response
    const riskKeywords = ["risk", "position", "stop", "management", "size"]
    const sentences = text.split(/[.!?]+/)

    const riskSentence = sentences.find((sentence) =>
      riskKeywords.some((keyword) => sentence.toLowerCase().includes(keyword)),
    )

    return riskSentence?.trim() || "Risk management assessment based on trade parameters and emotional state."
  }

  async identifyPatterns(userId: string, timeframe: "week" | "month" | "quarter" | "year"): Promise<TradePattern[]> {
    // In a real implementation, this would analyze the user's trade history
    // For this demo, we'll return simulated patterns

    return [
      {
        pattern: "Anxiety-Driven Early Exits",
        description:
          "You tend to exit trades prematurely when your anxiety level is 7 or higher, even when technical indicators remain favorable.",
        frequency: 12,
        emotionalCorrelation: [
          { emotion: "anxiety", correlation: 0.85 },
          { emotion: "confidence", correlation: -0.72 },
        ],
        outcomes: [
          { result: "reduced profit", percentage: 65 },
          { result: "missed opportunity", percentage: 30 },
          { result: "appropriate exit", percentage: 5 },
        ],
        recommendations: [
          "Implement pre-defined exit rules and automate when possible",
          "Practice mindfulness techniques when anxiety rises during trades",
          "Consider reducing position size when anxiety is high to manage emotional response",
        ],
      },
      {
        pattern: "Overconfidence in Trending Markets",
        description:
          "When confidence is rated 8+, you tend to ignore warning signs in strongly trending markets, often leading to holding positions too long.",
        frequency: 8,
        emotionalCorrelation: [
          { emotion: "confidence", correlation: 0.9 },
          { emotion: "excitement", correlation: 0.75 },
        ],
        outcomes: [
          { result: "reversal losses", percentage: 60 },
          { result: "maximum profit", percentage: 25 },
          { result: "breakeven", percentage: 15 },
        ],
        recommendations: [
          "Implement trailing stops that tighten as profits increase",
          "Create a checklist of warning signs to review when feeling highly confident",
          "Practice taking partial profits at predetermined levels",
        ],
      },
      {
        pattern: "Optimal Performance Zone",
        description:
          "Your most profitable trades trades occur when confidence is 6-8 and stress is below 5, regardless of market conditions.",
        frequency: 15,
        emotionalCorrelation: [
          { emotion: "confidence", correlation: 0.65 },
          { emotion: "stress", correlation: -0.8 },
          { emotion: "mental clarity", correlation: 0.75 },
        ],
        outcomes: [
          { result: "profitable", percentage: 78 },
          { result: "small loss", percentage: 15 },
          { result: "breakeven", percentage: 7 },
        ],
        recommendations: [
          "Document pre-trade routines that help achieve this emotional state",
          "Consider trading smaller size when outside this optimal zone",
          "Develop techniques to intentionally enter this mental state before trading",
        ],
      },
      {
        pattern: "High Volatility Anxiety",
        description:
          "During periods of high market volatility (ATR > 1%), your anxiety increases by 40% on average, leading to hesitation and missed opportunities.",
        frequency: 10,
        emotionalCorrelation: [
          { emotion: "anxiety", correlation: 0.82 },
          { emotion: "confidence", correlation: -0.65 },
        ],
        outcomes: [
          { result: "missed opportunity", percentage: 55 },
          { result: "late entry", percentage: 30 },
          { result: "successful trade", percentage: 15 },
        ],
        recommendations: [
          "Develop a specific high-volatility trading plan with clear rules",
          "Practice volatility-specific visualization exercises before market opens",
          "Consider reducing position size during high volatility to manage emotional response",
        ],
      },
    ]
  }

  async getTradeHistory(
    userId: string,
    filters?: {
      timeframe?: string
      result?: string
      emotion?: string
      strategy?: string
    },
  ): Promise<TradeAnalysis[]> {
    // Load from localStorage first, then add sample data
    const storedTrades = JSON.parse(localStorage.getItem("userTrades") || "[]")

    // Sample trades for demo
    const sampleTrades: TradeAnalysis[] = [
      {
        id: "trade_sample_1",
        userId,
        imageUrl: "/placeholder.svg?height=400&width=600",
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        emotionalState: {
          primaryEmotion: "anxiety",
          intensity: 7,
          secondaryEmotions: ["uncertainty", "hope"],
          mentalClarity: 6,
          stressLevel: 7,
          confidence: 5,
          notes: "Felt unsure about market direction but saw a potential reversal pattern",
        },
        tradeDetails: {
          symbol: "EURUSD",
          entryPrice: 1.0865,
          exitPrice: 1.0895,
          direction: "long",
          timeframe: "1H",
          result: "win",
          riskRewardRatio: 1.5,
          strategy: "Support Bounce",
          setupType: "Reversal",
        },
        marketContext: {
          symbol: "EURUSD",
          timeframe: "1H",
          priceData: [],
          volatility: {
            value: 0.65,
            isHigh: false,
            percentile: 45,
          },
          trend: {
            direction: "sideways",
            strength: 25,
            duration: 12,
          },
          keyLevels: [
            {
              type: "support",
              price: 1.085,
              strength: 75,
              distance: -0.14,
            },
            {
              type: "resistance",
              price: 1.092,
              strength: 60,
              distance: 0.51,
            },
          ],
          movingAverages: [
            {
              period: 20,
              value: 1.084,
              relation: "above",
            },
            {
              period: 50,
              value: 1.081,
              relation: "above",
            },
          ],
          indicators: [
            {
              name: "RSI(14)",
              value: 58.5,
              interpretation: "neutral",
            },
            {
              name: "MACD",
              value: "0.00125 (+0.00042)",
              interpretation: "bullish momentum increasing",
            },
          ],
        },
        aiAnalysis: {
          summary: "Good entry with premature exit due to anxiety",
          technicalObservations: [
            "Entry at key support level",
            "Exit before reaching full target",
            "Good alignment with higher timeframe trend",
          ],
          psychologicalInsights: [
            "Anxiety led to early exit",
            "Uncertainty affected position sizing",
            "Decision-making under stress was adequate",
          ],
          improvementSuggestions: [
            "Set predetermined exits",
            "Consider scaling out instead of full exit",
            "Practice emotional regulation techniques",
          ],
          patternRecognition: ["Similar to previous anxiety-driven trades", "Part of a developing pattern"],
          marketContextInsights: [
            "Trade was taken during normal market volatility (0.65%)",
            "Entry coincided with strong support level (75% strength)",
            "Price was above both 20 and 50 period moving averages, confirming uptrend",
            "RSI was neutral, not providing strong directional bias",
          ],
          confidenceScore: 0.85,
          riskManagementAssessment: "Appropriate risk percentage but could optimize stop placement",
          analysisMethod: "simulated",
        },
        tags: ["reversal", "support", "anxiety", "early-exit"],
      },
    ]

    return [...storedTrades, ...sampleTrades]
  }
}
