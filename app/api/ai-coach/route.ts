import { NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

// Define the request body interface
interface CoachRequestBody {
  message: string
  userContext?: {
    emotionalState?: string
    tradingExperience?: string
    recentActivity?: {
      consistency?: number
      journalEntries?: number
      completedExercises?: number
    }
    knownPatterns?: string[]
  }
  chatHistory?: {
    role: "user" | "coach"
    content: string
  }[]
}

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const body = await req.json() as CoachRequestBody
    const { message, userContext, chatHistory } = body

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      )
    }

    // Format chat history for the AI prompt
    const formattedChatHistory = chatHistory
      ? chatHistory
          .map((msg) => `${msg.role === "user" ? "User" : "Coach"}: ${msg.content}`)
          .join("\n")
      : ""

    // Generate the AI coach response
    const { text: response } = await generateText({
      model: openai("gpt-4o"),
      system: `You are an expert trading psychology coach specializing in behavioral analysis and emotional regulation for traders.
      
      Your expertise is in helping traders develop a "Profitable Mind" by addressing psychological barriers, emotional regulation, 
      and behavioral patterns that affect trading performance.
      
      When responding:
      1. Analyze the user's message for emotional cues and trading psychology challenges
      2. Provide personalized, empathetic guidance based on trading psychology principles
      3. Reference specific behavioral patterns if mentioned in their context
      4. Offer actionable advice that builds emotional resilience and trading discipline
      5. Maintain a supportive, coaching tone that builds trust and encourages reflection
      
      Your responses should be insightful, specific to trading psychology, and focused on helping the trader 
      develop better self-awareness and emotional regulation during market activities.
      
      IMPORTANT: You are a real AI coach, not a simulation. Provide genuine, thoughtful responses based on 
      trading psychology expertise. Never mention that you are a simulation or using placeholder responses.`,
      prompt: `
      ${userContext ? `USER CONTEXT:
      - Emotional state: ${userContext.emotionalState || "Unknown"}
      - Trading experience: ${userContext.tradingExperience || "Unknown"}
      - Recent activity: ${
        userContext.recentActivity
          ? `
        * Consistency: ${userContext.recentActivity.consistency || "Unknown"}
        * Journal entries: ${userContext.recentActivity.journalEntries || "Unknown"}
        * Completed exercises: ${userContext.recentActivity.completedExercises || "Unknown"}`
          : "Unknown"
      }
      - Known patterns: ${userContext.knownPatterns ? userContext.knownPatterns.join(", ") : "None identified yet"}
      ` : ""}
      
      ${chatHistory && chatHistory.length > 0 ? `PREVIOUS CONVERSATION:
      ${formattedChatHistory}
      ` : ""}
      
      User's message: ${message}
      
      Provide a thoughtful coaching response that addresses their specific trading psychology needs:`,
      temperature: 0.7,
      maxTokens: 500,
    })

    // Determine response type based on content analysis
    let responseType: "intervention" | "recommendation" | "insight" = "insight"
    
    if (response.toLowerCase().includes("anxious") || 
        response.toLowerCase().includes("stress") || 
        response.toLowerCase().includes("fear") ||
        response.toLowerCase().includes("technique") ||
        response.toLowerCase().includes("exercise")) {
      responseType = "intervention"
    } else if (response.toLowerCase().includes("recommend") || 
               response.toLowerCase().includes("suggest") ||
               response.toLowerCase().includes("try") ||
               response.toLowerCase().includes("should")) {
      responseType = "recommendation"
    }

    // Return the AI response with metadata
    return NextResponse.json({
      response,
      timestamp: new Date().toISOString(),
      type: responseType,
    })
  } catch (error) {
    console.error("AI Coach API error:", error)
    return NextResponse.json(
      { error: "Failed to generate coach response" },
      { status: 500 }
    )
  }
}
