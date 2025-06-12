"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, Target, Brain, ArrowRight, ArrowLeft, Lightbulb, AlertCircle } from "lucide-react"

interface ExerciseStep {
  id: string
  type: "instruction" | "question" | "reflection" | "simulation"
  title: string
  content: string
  options?: string[]
  correctAnswer?: string
  userAnswer?: string
  feedback?: string
}

export default function ExercisePage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showFeedback, setShowFeedback] = useState(false)

  // Sample exercise: Risk Assessment
  const exercise = {
    id: "risk-assessment-1",
    title: "Personal Risk Tolerance Assessment",
    description: "Evaluate your psychological comfort with different risk scenarios",
    type: "assessment",
    difficulty: "intermediate",
    estimatedTime: 15,
    learningObjectives: [
      "Understand your risk tolerance profile",
      "Identify emotional triggers in risk scenarios",
      "Develop personalized risk management strategies",
    ],
    steps: [
      {
        id: "intro",
        type: "instruction",
        title: "Welcome to Risk Assessment",
        content:
          "This exercise will help you understand your psychological relationship with risk. Answer honestly - there are no right or wrong answers, only insights about your trading psychology.",
      },
      {
        id: "scenario-1",
        type: "question",
        title: "Market Volatility Scenario",
        content:
          "You've invested $10,000 in a stock. The market suddenly drops 15% in one day, and your investment is now worth $8,500. What is your immediate emotional response?",
        options: [
          "Panic - I want to sell immediately to prevent further losses",
          "Concern - I'm worried but will wait to see what happens tomorrow",
          "Calm - This is normal market volatility, I'll stick to my plan",
          "Opportunity - I'm considering buying more at this lower price",
        ],
      },
      {
        id: "reflection-1",
        type: "reflection",
        title: "Emotional Response Analysis",
        content:
          "Reflect on your answer above. What does this tell you about your risk tolerance? How might this emotional response affect your trading decisions?",
      },
      {
        id: "scenario-2",
        type: "question",
        title: "Winning Streak Scenario",
        content:
          "You've had 5 successful trades in a row, each generating 8-12% profit. You're feeling confident. What's your next move?",
        options: [
          "Increase position sizes to maximize the winning streak",
          "Continue with the same position sizes and strategy",
          "Take a break to avoid overconfidence",
          "Reduce position sizes to protect accumulated gains",
        ],
      },
      {
        id: "simulation",
        type: "simulation",
        title: "Risk Management Decision",
        content:
          "You're considering a trade with 70% probability of 15% gain and 30% probability of 25% loss. Your account balance is $50,000. What position size would you choose?",
        options: [
          "$1,000 (2% of account)",
          "$2,500 (5% of account)",
          "$5,000 (10% of account)",
          "$10,000 (20% of account)",
        ],
        correctAnswer: "$2,500 (5% of account)",
        feedback:
          "A 5% position size balances opportunity with prudent risk management. This allows for meaningful gains while protecting your account from significant drawdowns.",
      },
    ] as ExerciseStep[],
  }

  const currentStepData = exercise.steps[currentStep]
  const progress = ((currentStep + 1) / exercise.steps.length) * 100

  const handleAnswer = (answer: string) => {
    setAnswers({ ...answers, [currentStepData.id]: answer })
    if (currentStepData.type === "question" && currentStepData.correctAnswer) {
      setShowFeedback(true)
    }
  }

  const nextStep = () => {
    if (currentStep < exercise.steps.length - 1) {
      setCurrentStep(currentStep + 1)
      setShowFeedback(false)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      setShowFeedback(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStepData.type) {
      case "instruction":
        return (
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed">{currentStepData.content}</p>
            <Button onClick={nextStep} className="w-full">
              Begin Assessment <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )

      case "question":
        return (
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed mb-4">{currentStepData.content}</p>
            <RadioGroup value={answers[currentStepData.id] || ""} onValueChange={handleAnswer}>
              {currentStepData.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            {showFeedback && currentStepData.feedback && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start">
                  <Lightbulb className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-1">Insight</h4>
                    <p className="text-blue-800 text-sm">{currentStepData.feedback}</p>
                  </div>
                </div>
              </div>
            )}

            {answers[currentStepData.id] && (
              <div className="flex space-x-2">
                <Button variant="outline" onClick={prevStep} disabled={currentStep === 0}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                </Button>
                <Button onClick={nextStep} className="flex-1">
                  {currentStep === exercise.steps.length - 1 ? "Complete" : "Next"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        )

      case "reflection":
        return (
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed">{currentStepData.content}</p>
            <Textarea
              placeholder="Write your reflection here..."
              value={answers[currentStepData.id] || ""}
              onChange={(e) => handleAnswer(e.target.value)}
              rows={6}
            />
            {answers[currentStepData.id] && (
              <div className="flex space-x-2">
                <Button variant="outline" onClick={prevStep}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                </Button>
                <Button onClick={nextStep} className="flex-1">
                  Continue <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        )

      case "simulation":
        return (
          <div className="space-y-4">
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-yellow-900 mb-1">Trading Simulation</h4>
                  <p className="text-yellow-800 text-sm">Make your decision based on the scenario below.</p>
                </div>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed">{currentStepData.content}</p>

            <RadioGroup value={answers[currentStepData.id] || ""} onValueChange={handleAnswer}>
              {currentStepData.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value={option} id={`sim-option-${index}`} />
                  <Label htmlFor={`sim-option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            {answers[currentStepData.id] && currentStepData.feedback && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-green-900 mb-1">Analysis</h4>
                    <p className="text-green-800 text-sm">{currentStepData.feedback}</p>
                  </div>
                </div>
              </div>
            )}

            {answers[currentStepData.id] && (
              <Button onClick={nextStep} className="w-full">
                {currentStep === exercise.steps.length - 1 ? "Complete Exercise" : "Continue"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Navigation />

      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Exercise Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{exercise.title}</h1>
                <p className="text-gray-600 mt-1">{exercise.description}</p>
              </div>
              <div className="flex items-center space-x-4">
                <Badge className="bg-blue-100 text-blue-800">{exercise.difficulty}</Badge>
                <div className="flex items-center text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  {exercise.estimatedTime} min
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Progress</span>
                <span>
                  {currentStep + 1} of {exercise.steps.length}
                </span>
              </div>
              <Progress value={progress} />
            </div>

            {/* Learning Objectives */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Target className="mr-2 h-5 w-5" />
                  Learning Objectives
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {exercise.learningObjectives.map((objective, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      {objective}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Exercise Content */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="mr-2 h-5 w-5" />
                {currentStepData.title}
              </CardTitle>
            </CardHeader>
            <CardContent>{renderStepContent()}</CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
