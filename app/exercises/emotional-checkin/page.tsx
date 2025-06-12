"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Heart, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"

interface EmotionalState {
  anxiety: number
  confidence: number
  focus: number
  motivation: number
  stress: number
}

export default function EmotionalCheckinPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [emotionalState, setEmotionalState] = useState<EmotionalState>({
    anxiety: 5,
    confidence: 5,
    focus: 5,
    motivation: 5,
    stress: 5,
  })
  const [reflection, setReflection] = useState("")
  const [intentions, setIntentions] = useState("")
  const [isComplete, setIsComplete] = useState(false)

  const totalSteps = 4

  const handleSliderChange = (emotion: keyof EmotionalState, value: number[]) => {
    setEmotionalState((prev) => ({
      ...prev,
      [emotion]: value[0],
    }))
  }

  const getEmotionColor = (value: number) => {
    if (value <= 3) return "text-red-600"
    if (value <= 6) return "text-yellow-600"
    return "text-green-600"
  }

  const getEmotionLabel = (emotion: string, value: number) => {
    const labels = {
      anxiety: value <= 3 ? "Low" : value <= 6 ? "Moderate" : "High",
      confidence: value <= 3 ? "Low" : value <= 6 ? "Moderate" : "High",
      focus: value <= 3 ? "Scattered" : value <= 6 ? "Moderate" : "Sharp",
      motivation: value <= 3 ? "Low" : value <= 6 ? "Moderate" : "High",
      stress: value <= 3 ? "Relaxed" : value <= 6 ? "Moderate" : "High",
    }
    return labels[emotion as keyof typeof labels]
  }

  const completeExercise = () => {
    // Save to localStorage (in real app, would save to database)
    const checkinData = {
      timestamp: new Date().toISOString(),
      emotionalState,
      reflection,
      intentions,
      overallScore: Math.round(
        (emotionalState.confidence +
          emotionalState.focus +
          emotionalState.motivation +
          (10 - emotionalState.anxiety) +
          (10 - emotionalState.stress)) /
          5,
      ),
    }

    const existingCheckins = JSON.parse(localStorage.getItem("emotional-checkins") || "[]")
    existingCheckins.push(checkinData)
    localStorage.setItem("emotional-checkins", JSON.stringify(existingCheckins))

    setIsComplete(true)
  }

  if (isComplete) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Navigation />
        <main className="flex-1 p-8">
          <div className="max-w-2xl mx-auto">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl text-green-900">Check-In Complete!</CardTitle>
                <CardDescription>
                  Great job taking time for self-awareness. Your emotional data has been recorded.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-2">Today's Emotional Score</h3>
                  <div className="text-3xl font-bold text-green-600">
                    {Math.round(
                      (emotionalState.confidence +
                        emotionalState.focus +
                        emotionalState.motivation +
                        (10 - emotionalState.anxiety) +
                        (10 - emotionalState.stress)) /
                        5,
                    )}
                    /10
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button onClick={() => router.push("/exercises")} className="flex-1">
                    More Exercises
                  </Button>
                  <Button onClick={() => router.push("/coach")} variant="outline" className="flex-1">
                    AI Coach
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Navigation />

      <main className="flex-1 p-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <Button variant="ghost" onClick={() => router.push("/exercises")} className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Exercises
            </Button>

            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Emotional State Check-In</h1>
                <p className="text-gray-600">Assess your current emotional state before trading</p>
              </div>
              <Badge variant="outline">
                Step {currentStep} of {totalSteps}
              </Badge>
            </div>

            <Progress value={(currentStep / totalSteps) * 100} className="mb-6" />
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="mr-2 h-5 w-5 text-red-500" />
                {currentStep === 1 && "Rate Your Current Emotions"}
                {currentStep === 2 && "Reflect on Your State"}
                {currentStep === 3 && "Set Your Intentions"}
                {currentStep === 4 && "Review & Complete"}
              </CardTitle>
              <CardDescription>
                {currentStep === 1 && "Use the sliders to rate how you're feeling right now (1 = Low, 10 = High)"}
                {currentStep === 2 && "Take a moment to reflect on what might be influencing your emotional state"}
                {currentStep === 3 && "Set clear intentions for your trading session"}
                {currentStep === 4 && "Review your responses before completing the check-in"}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {currentStep === 1 && (
                <div className="space-y-6">
                  {Object.entries(emotionalState).map(([emotion, value]) => (
                    <div key={emotion} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-sm font-medium capitalize">{emotion}</label>
                        <div className={`text-sm font-semibold ${getEmotionColor(value)}`}>
                          {value}/10 - {getEmotionLabel(emotion, value)}
                        </div>
                      </div>
                      <Slider
                        value={[value]}
                        onValueChange={(newValue) => handleSliderChange(emotion as keyof EmotionalState, newValue)}
                        max={10}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                    </div>
                  ))}
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-4">
                  <label className="text-sm font-medium">
                    What factors might be influencing your emotional state today?
                  </label>
                  <Textarea
                    placeholder="Consider market conditions, personal events, sleep quality, recent trades, news, etc..."
                    value={reflection}
                    onChange={(e) => setReflection(e.target.value)}
                    rows={6}
                  />
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-4">
                  <label className="text-sm font-medium">What are your intentions for today's trading session?</label>
                  <Textarea
                    placeholder="Set specific, actionable intentions like 'I will stick to my risk management rules' or 'I will take breaks every hour'..."
                    value={intentions}
                    onChange={(e) => setIntentions(e.target.value)}
                    rows={6}
                  />
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-3">Emotional State Summary</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(emotionalState).map(([emotion, value]) => (
                        <div key={emotion} className="flex justify-between">
                          <span className="capitalize">{emotion}:</span>
                          <span className={`font-semibold ${getEmotionColor(value)}`}>{value}/10</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {reflection && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">Reflection</h3>
                      <p className="text-sm">{reflection}</p>
                    </div>
                  )}

                  {intentions && (
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">Intentions</h3>
                      <p className="text-sm">{intentions}</p>
                    </div>
                  )}
                </div>
              )}

              <div className="flex justify-between pt-4">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                >
                  Previous
                </Button>

                {currentStep < totalSteps ? (
                  <Button
                    onClick={() => setCurrentStep(currentStep + 1)}
                    disabled={currentStep === 2 && !reflection.trim()}
                  >
                    Next
                  </Button>
                ) : (
                  <Button onClick={completeExercise} disabled={!reflection.trim() || !intentions.trim()}>
                    Complete Check-In
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
