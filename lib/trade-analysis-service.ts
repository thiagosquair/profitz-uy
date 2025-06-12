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
  private hasOpenAIKey: boolean
  private apiKey: string | null

  constructor() {
    this.marketDataService = new MarketDataService()

    // Check for API key in both server and client environments
    this.apiKey = null

    // Try to get the API key from different sources
    if (typeof window === "undefined") {
      // Server-side
      this.apiKey = process.env.OPENAI_API_KEY || null
    } else {
      // Client-side - check if it's available as a public env var
      this.apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY || null
    }

    this.hasOpenAIKey = !!this.apiKey

    console.log("🔑 TradeAnalysisService initialized:")
    console.log("- Environment:", typeof window === "undefined" ? "server" : "client")
    console.log("- API Key available:", this.hasOpenAIKey)
    console.log("- API Key length:", this.apiKey ? this.apiKey.length : 0)
  }

  async analyzeTradeImage(
    imageUrl: string,
    emotionalState: EmotionalState,
    tradeDetails: Partial<TradeDetails>,
    includeMarketContext = true,
  ): Promise<AIAnalysis> {
    console.log("🤖 Starting trade analysis...")
    console.log("📊 Trade details:", tradeDetails)
    console.log("🧠 Emotional state:", emotionalState)
    console.log("🔑 OpenAI API available:", this.hasOpenAIKey)
    console.log("🖼️ Image URL:", imageUrl.substring(0, 50) + "...")

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

    // Try OpenAI analysis first, fall back to simulated analysis
    if (this.hasOpenAIKey && this.apiKey) {
      try {
        console.log("🚀 Attempting OpenAI analysis...")
        return await this.performOpenAIAnalysis(imageUrl, emotionalState, tradeDetails, marketContext)
      } catch (error) {
        console.error("❌ OpenAI analysis failed:", error)
        console.error("Error details:", error instanceof Error ? error.message : String(error))

        // Return simulated analysis with error info
        const simulatedAnalysis = await this.performSimulatedAnalysis(emotionalState, tradeDetails, marketContext)
        simulatedAnalysis.debugInfo = `OpenAI analysis failed: ${error instanceof Error ? error.message : String(error)}`
        return simulatedAnalysis
      }
    } else {
      console.log("⚠️ OpenAI API key not found, using simulated analysis")
      const simulatedAnalysis = await this.performSimulatedAnalysis(emotionalState, tradeDetails, marketContext)
      simulatedAnalysis.debugInfo = "OpenAI API key not configured"
      return simulatedAnalysis
    }
  }

  private async performOpenAIAnalysis(
    imageUrl: string,
    emotionalState: EmotionalState,
    tradeDetails: Partial<TradeDetails>,
    marketContext?: MarketContext,
  ): Promise<AIAnalysis> {
    console.log("🔍 Performing OpenAI Vision API analysis...")
    console.log("🔑 Using API key:", this.apiKey?.substring(0, 10) + "...")

    try {
      // Dynamic import to avoid issues when API key is not available
      const { generateText } = await import("ai")
      const { openai } = await import("@ai-sdk/openai")

      console.log("📦 AI SDK modules loaded successfully")

      // Create OpenAI client with explicit API key
      const openaiClient = openai({
        apiKey: this.apiKey!,
      })

      console.log("🤖 OpenAI client created, making API call...")

      const { text } = await generateText({
        model: openaiClient("gpt-4o"),
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
                type: "image",
                image: imageUrl,
              },
            ],
          },
        ],
      })

      console.log("✅ OpenAI analysis completed successfully")
      console.log("📝 Raw AI response length:", text.length)
      console.log("📝 Response preview:", text.substring(0, 200) + "...")

      // Parse the AI response into structured format
      const analysis = this.parseAIResponse(text, marketContext)
      analysis.analysisMethod = "openai"
      analysis.debugInfo = "OpenAI analysis completed successfully"

      console.log("🎯 Structured OpenAI analysis completed")
      return analysis
    } catch (error) {
      console.error("💥 OpenAI API Error:", error)

      // Log more detailed error information
      if (error instanceof Error) {
        console.error("Error name:", error.name)
        console.error("Error message:", error.message)
        console.error("Error stack:", error.stack)
      }

      throw error
    }
  }

  private async performSimulatedAnalysis(
    emotionalState: EmotionalState,
    tradeDetails: Partial<TradeDetails>,
    marketContext?: MarketContext,
  ): Promise<AIAnalysis> {
    console.log("🎭 Performing simulated AI analysis...")

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Generate contextual analysis based on actual data
    const technicalObservations = this.generateTechnicalObservations(tradeDetails)
    const psychologicalInsights = this.generatePsychologicalInsights(emotionalState)
    const improvementSuggestions = this.generateImprovementSuggestions(emotionalState, tradeDetails)
    const patternRecognition = this.generatePatternRecognition(emotionalState, tradeDetails)

    // Generate market context insights if available
    const marketContextInsights = marketContext
      ? [
          `Trade occurred during ${marketContext.volatility.isHigh ? "high" : "normal"} market volatility (${marketContext.volatility.value}%)`,
          `Market trend: ${marketContext.trend.direction} (Strength: ${marketContext.trend.strength}%)`,
          `Key levels: ${marketContext.keyLevels.map((l) => `${l.type} at ${l.price}`).join(", ")}`,
          ...marketContext.indicators.map((i) => `${i.name}: ${i.value} (${i.interpretation})`),
        ]
      : undefined

    const analysis: AIAnalysis = {
      summary: this.generateSummary(emotionalState, tradeDetails),
      technicalObservations,
      psychologicalInsights,
      improvementSuggestions,
      patternRecognition,
      confidenceScore: this.calculateConfidenceScore(emotionalState, tradeDetails),
      riskManagementAssessment: this.generateRiskAssessment(emotionalState, tradeDetails),
      marketContextInsights,
      analysisMethod: "simulated",
      debugInfo: "Using simulated analysis - OpenAI not available",
    }

    console.log("✅ Simulated analysis completed")
    return analysis
  }

  private generateTechnicalObservations(tradeDetails: Partial<TradeDetails>): string[] {
    const observations = []

    if (tradeDetails.symbol) {
      observations.push(`Analysis of ${tradeDetails.symbol} ${tradeDetails.direction || "trade"} position`)
    }

    if (tradeDetails.entryPrice && tradeDetails.exitPrice) {
      const priceDiff = tradeDetails.exitPrice - tradeDetails.entryPrice
      const direction = tradeDetails.direction === "long" ? "bullish" : "bearish"
      observations.push(
        `Entry at ${tradeDetails.entryPrice}, exit at ${tradeDetails.exitPrice} (${priceDiff > 0 ? "profit" : "loss"} of ${Math.abs(priceDiff).toFixed(5)})`,
      )
      observations.push(`Trade aligned with ${direction} bias based on entry/exit levels`)
    }

    if (tradeDetails.strategy) {
      observations.push(`${tradeDetails.strategy} strategy execution shows structured approach`)
    }

    if (tradeDetails.setupType) {
      observations.push(`${tradeDetails.setupType} setup type indicates pattern-based trading`)
    }

    if (tradeDetails.riskRewardRatio) {
      observations.push(
        `Risk-reward ratio of ${tradeDetails.riskRewardRatio}:1 ${tradeDetails.riskRewardRatio >= 2 ? "shows good" : "could improve"} risk management`,
      )
    }

    if (tradeDetails.timeframe) {
      observations.push(
        `${tradeDetails.timeframe} timeframe analysis suggests ${this.getTimeframeInsight(tradeDetails.timeframe)}`,
      )
    }

    return observations.length > 0
      ? observations
      : ["Chart analysis shows price action patterns", "Entry and exit levels identified", "Technical setup evaluated"]
  }

  private generatePsychologicalInsights(emotionalState: EmotionalState): string[] {
    const insights = []

    // Primary emotion analysis
    insights.push(
      `Primary emotion of ${emotionalState.primaryEmotion} at ${emotionalState.intensity}/10 intensity ${this.getEmotionImpact(emotionalState.primaryEmotion, emotionalState.intensity)}`,
    )

    // Mental clarity impact
    if (emotionalState.mentalClarity <= 5) {
      insights.push(`Low mental clarity (${emotionalState.mentalClarity}/10) likely impaired decision-making quality`)
    } else if (emotionalState.mentalClarity >= 8) {
      insights.push(`High mental clarity (${emotionalState.mentalClarity}/10) supported clear thinking and analysis`)
    } else {
      insights.push(
        `Moderate mental clarity (${emotionalState.mentalClarity}/10) provided adequate decision-making capacity`,
      )
    }

    // Stress level analysis
    if (emotionalState.stressLevel >= 7) {
      insights.push(
        `High stress level (${emotionalState.stressLevel}/10) may have triggered fight-or-flight responses affecting trade execution`,
      )
    } else if (emotionalState.stressLevel <= 3) {
      insights.push(
        `Low stress level (${emotionalState.stressLevel}/10) created optimal conditions for rational decision-making`,
      )
    } else {
      insights.push(
        `Moderate stress level (${emotionalState.stressLevel}/10) maintained alertness without overwhelming anxiety`,
      )
    }

    // Confidence analysis
    if (emotionalState.confidence <= 4) {
      insights.push(`Low confidence (${emotionalState.confidence}/10) may have led to hesitation or premature exits`)
    } else if (emotionalState.confidence >= 8) {
      insights.push(
        `High confidence (${emotionalState.confidence}/10) could indicate overconfidence or ignoring warning signs`,
      )
    } else {
      insights.push(`Balanced confidence (${emotionalState.confidence}/10) suggests appropriate self-assessment`)
    }

    // Secondary emotions
    if (emotionalState.secondaryEmotions.length > 0) {
      insights.push(
        `Secondary emotions (${emotionalState.secondaryEmotions.join(", ")}) added complexity to decision-making process`,
      )
    }

    return insights
  }

  private generateImprovementSuggestions(
    emotionalState: EmotionalState,
    tradeDetails: Partial<TradeDetails>,
  ): string[] {
    const suggestions = []

    // Emotional regulation suggestions
    if (emotionalState.intensity >= 7) {
      suggestions.push("Practice breathing techniques or meditation before trading when emotional intensity is high")
    }

    if (emotionalState.stressLevel >= 7) {
      suggestions.push("Implement stress management protocols: reduce position size when stress exceeds 6/10")
    }

    if (emotionalState.mentalClarity <= 5) {
      suggestions.push("Avoid trading when mental clarity is below 6/10; wait for better mental state")
    }

    if (emotionalState.confidence <= 4) {
      suggestions.push("Build confidence through backtesting and paper trading before risking capital")
    } else if (emotionalState.confidence >= 8) {
      suggestions.push("Create overconfidence checks: review analysis twice when confidence exceeds 7/10")
    }

    // Technical suggestions
    if (!tradeDetails.riskRewardRatio || tradeDetails.riskRewardRatio < 1.5) {
      suggestions.push("Target minimum 1.5:1 risk-reward ratio for better long-term profitability")
    }

    if (!tradeDetails.strategy) {
      suggestions.push("Define and document your trading strategy for each trade to improve consistency")
    }

    // Process improvements
    suggestions.push("Continue documenting emotional states to identify patterns and triggers")
    suggestions.push("Set predetermined exit rules to reduce emotional decision-making during trades")

    return suggestions
  }

  private generatePatternRecognition(emotionalState: EmotionalState, tradeDetails: Partial<TradeDetails>): string[] {
    const patterns = []

    // Emotional patterns
    if (emotionalState.primaryEmotion === "anxiety" && emotionalState.intensity >= 6) {
      patterns.push("High-anxiety trading pattern detected - monitor for premature exits or missed opportunities")
    }

    if (emotionalState.confidence >= 8 && emotionalState.stressLevel <= 3) {
      patterns.push("Optimal performance zone identified - document conditions that led to this state")
    }

    if (emotionalState.stressLevel >= 7 && emotionalState.mentalClarity <= 5) {
      patterns.push("Stress-impaired decision making pattern - consider trading break when both metrics are poor")
    }

    // Trading patterns
    if (tradeDetails.direction && tradeDetails.strategy) {
      patterns.push(
        `${tradeDetails.direction} ${tradeDetails.strategy} pattern - track success rate of this combination`,
      )
    }

    if (tradeDetails.riskRewardRatio && tradeDetails.riskRewardRatio >= 2) {
      patterns.push("Conservative risk management pattern - maintain this approach for long-term success")
    }

    // Behavioral patterns
    patterns.push(`${emotionalState.primaryEmotion}-driven trading behavior requires monitoring for consistency`)

    return patterns
  }

  private generateSummary(emotionalState: EmotionalState, tradeDetails: Partial<TradeDetails>): string {
    const symbol = tradeDetails.symbol || "trade"
    const direction = tradeDetails.direction || "position"
    const emotion = emotionalState.primaryEmotion
    const intensity = emotionalState.intensity

    return `Analysis of ${symbol} ${direction} taken with ${emotion} (${intensity}/10 intensity). ${this.getSummaryInsight(emotion, intensity, emotionalState.confidence)}`
  }

  private calculateConfidenceScore(emotionalState: EmotionalState, tradeDetails: Partial<TradeDetails>): number {
    let score = 0.5 // Base score

    // Adjust based on emotional state
    if (emotionalState.mentalClarity >= 7) score += 0.1
    if (emotionalState.stressLevel <= 5) score += 0.1
    if (emotionalState.confidence >= 6 && emotionalState.confidence <= 8) score += 0.1

    // Adjust based on trade details
    if (tradeDetails.riskRewardRatio && tradeDetails.riskRewardRatio >= 1.5) score += 0.1
    if (tradeDetails.strategy) score += 0.05
    if (tradeDetails.entryPrice && tradeDetails.exitPrice) score += 0.05

    return Math.min(0.95, Math.max(0.3, score))
  }

  private generateRiskAssessment(emotionalState: EmotionalState, tradeDetails: Partial<TradeDetails>): string {
    const riskFactors = []

    if (emotionalState.stressLevel >= 7) {
      riskFactors.push("high stress levels")
    }
    if (emotionalState.confidence <= 4) {
      riskFactors.push("low confidence")
    }
    if (emotionalState.mentalClarity <= 5) {
      riskFactors.push("impaired mental clarity")
    }

    const riskLevel = riskFactors.length >= 2 ? "elevated" : riskFactors.length === 1 ? "moderate" : "acceptable"

    return `Risk assessment: ${riskLevel} risk level based on emotional state. ${
      tradeDetails.riskRewardRatio
        ? `Risk-reward ratio of ${tradeDetails.riskRewardRatio}:1 ${tradeDetails.riskRewardRatio >= 1.5 ? "supports" : "undermines"} risk management.`
        : "Consider defining risk-reward parameters for better assessment."
    }`
  }

  // Helper methods
  private getEmotionImpact(emotion: string, intensity: number): string {
    if (intensity >= 8) return "likely significantly impacted decision-making"
    if (intensity >= 6) return "moderately influenced trade execution"
    if (intensity >= 4) return "had some impact on trading decisions"
    return "had minimal impact on trade execution"
  }

  private getTimeframeInsight(timeframe: string): string {
    const insights: Record<string, string> = {
      "1m": "scalping approach with high-frequency decision making",
      "5m": "short-term momentum trading focus",
      "15m": "intraday swing trading methodology",
      "1H": "balanced intraday to short-term swing approach",
      "4H": "swing trading with multi-day holding periods",
      Daily: "position trading with longer-term perspective",
    }
    return insights[timeframe] || "systematic timeframe-based approach"
  }

  private getSummaryInsight(emotion: string, intensity: number, confidence: number): string {
    if (emotion === "anxiety" && intensity >= 7) {
      return "High anxiety may have led to suboptimal decision-making and early exits."
    }
    if (emotion === "confidence" && intensity >= 8) {
      return "High confidence supported decisive action but requires monitoring for overconfidence."
    }
    if (confidence <= 4) {
      return "Low confidence suggests need for additional preparation and risk management."
    }
    return "Emotional state analysis provides insights for future trading improvements."
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
          "Your most profitable trades occur when confidence is 6-8 and stress is below 5, regardless of market conditions.",
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
