import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export interface UserBehaviorPattern {
  userId: string
  loginFrequency: number[]
  contentConsumption: {
    articlesRead: number
    exercisesCompleted: number
    reflectionsWritten: number
    timeSpent: number
  }
  engagementTrends: {
    weeklyPattern: number[]
    monthlyPattern: number[]
    seasonalVariations: Record<string, number>
  }
  motivationIndicators: {
    streakLength: number
    completionRate: number
    qualityScore: number
  }
}

export interface InterventionStrategy {
  tier: 1 | 2 | 3
  type: "nudge" | "content" | "coaching"
  message: string
  recommendations: string[]
  urgency: "low" | "medium" | "high"
}

export class AICoachingSystem {
  async analyzeUserPattern(
    userId: string,
    behaviorData: UserBehaviorPattern,
  ): Promise<{
    riskLevel: "low" | "medium" | "high"
    patterns: string[]
    recommendations: string[]
  }> {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      system: `You are an expert trading psychology coach analyzing user behavior patterns. 
      Analyze the provided data and identify:
      1. Risk level for engagement decline
      2. Key behavioral patterns
      3. Specific recommendations for improvement
      
      Focus on trading psychology principles from "The Secrets of a Profitable Mind".`,
      prompt: `Analyze this user behavior data: ${JSON.stringify(behaviorData, null, 2)}`,
    })

    // Parse AI response and structure it
    return {
      riskLevel: this.calculateRiskLevel(behaviorData),
      patterns: this.extractPatterns(behaviorData),
      recommendations: this.generateRecommendations(behaviorData),
    }
  }

  async generatePersonalizedIntervention(
    userPattern: UserBehaviorPattern,
    riskLevel: string,
  ): Promise<InterventionStrategy> {
    const tier = riskLevel === "low" ? 1 : riskLevel === "medium" ? 2 : 3

    const { text } = await generateText({
      model: openai("gpt-4o"),
      system: `You are a supportive AI trading psychology coach. Generate personalized interventions based on user risk level and patterns. Use empathetic, actionable language focused on trading psychology principles.`,
      prompt: `Generate a tier ${tier} intervention for a user with ${riskLevel} risk level. 
      User data: ${JSON.stringify(userPattern, null, 2)}`,
    })

    return {
      tier: tier as 1 | 2 | 3,
      type: tier === 1 ? "nudge" : tier === 2 ? "content" : "coaching",
      message: text,
      recommendations: this.generateRecommendations(userPattern),
      urgency: riskLevel as "low" | "medium" | "high",
    }
  }

  private calculateRiskLevel(data: UserBehaviorPattern): "low" | "medium" | "high" {
    const completionRate = data.motivationIndicators.completionRate
    const streakLength = data.motivationIndicators.streakLength

    if (completionRate > 0.8 && streakLength > 7) return "low"
    if (completionRate > 0.5 && streakLength > 3) return "medium"
    return "high"
  }

  private extractPatterns(data: UserBehaviorPattern): string[] {
    const patterns = []

    if (data.engagementTrends.weeklyPattern[0] < 0.5) {
      patterns.push("Lower engagement on Mondays - market anxiety pattern")
    }

    if (data.motivationIndicators.qualityScore < 0.6) {
      patterns.push("Declining reflection quality - possible emotional overwhelm")
    }

    return patterns
  }

  private generateRecommendations(data: UserBehaviorPattern): string[] {
    const recommendations = []

    if (data.motivationIndicators.completionRate < 0.7) {
      recommendations.push("Focus on micro-habits to rebuild consistency")
      recommendations.push("Review emotional regulation techniques")
    }

    return recommendations
  }
}
