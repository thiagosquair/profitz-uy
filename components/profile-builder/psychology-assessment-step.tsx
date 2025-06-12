"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowRight } from "lucide-react"
import type { PsychologyAnswer } from "./profile-builder-modal"

interface Question {
  id: string
  category: string
  question: string
  options: string[]
}

const questions: Question[] = [
  // Risk Tolerance
  {
    id: "risk1",
    category: "Risk Management",
    question: "When a trade moves against you, what's your typical reaction?",
    options: [
      "I panic and close immediately",
      "I feel anxious but stick to my plan",
      "I stay calm and reassess",
      "I look for opportunities to add to the position",
      "I'm completely comfortable with temporary losses",
    ],
  },
  {
    id: "risk2",
    category: "Risk Management",
    question: "How much of your account would you risk on a single trade?",
    options: ["Less than 1%", "1-2%", "2-5%", "5-10%", "More than 10%"],
  },
  {
    id: "risk3",
    category: "Risk Management",
    question: "How do you feel about taking trades with uncertain outcomes?",
    options: ["Very uncomfortable", "Somewhat uncomfortable", "Neutral", "Somewhat comfortable", "Very comfortable"],
  },
  // Emotional Control
  {
    id: "emotion1",
    category: "Emotional Control",
    question: "After a series of losing trades, how do you typically respond?",
    options: [
      "I get very frustrated and make impulsive trades",
      "I feel upset but try to control it",
      "I take a break to clear my head",
      "I analyze what went wrong calmly",
      "I remain completely unaffected",
    ],
  },
  {
    id: "emotion2",
    category: "Emotional Control",
    question: "When you're in a winning trade, what's your mindset?",
    options: [
      "I'm anxious about losing the profit",
      "I'm excited but worried",
      "I'm pleased but focused",
      "I'm confident and relaxed",
      "I'm completely detached from the outcome",
    ],
  },
  {
    id: "emotion3",
    category: "Emotional Control",
    question: "How well do you separate your emotions from trading decisions?",
    options: [
      "I struggle to separate them",
      "I sometimes let emotions influence me",
      "I'm usually objective",
      "I'm mostly emotionally detached",
      "I'm completely objective",
    ],
  },
  // Decision Making
  {
    id: "decision1",
    category: "Decision Making",
    question: "How do you typically make trading decisions?",
    options: [
      "Based on gut feeling",
      "Mix of analysis and intuition",
      "Mostly technical analysis",
      "Systematic rule-based approach",
      "Purely algorithmic/mechanical",
    ],
  },
  {
    id: "decision2",
    category: "Decision Making",
    question: "When market conditions change rapidly, how do you adapt?",
    options: [
      "I freeze and don't know what to do",
      "I struggle to adapt quickly",
      "I adjust my approach gradually",
      "I adapt my strategy efficiently",
      "I thrive in changing conditions",
    ],
  },
  {
    id: "decision3",
    category: "Decision Making",
    question: "How confident are you in your trading decisions?",
    options: [
      "I constantly second-guess myself",
      "I sometimes doubt my decisions",
      "I'm moderately confident",
      "I'm usually confident",
      "I'm completely confident",
    ],
  },
  // Stress Management
  {
    id: "stress1",
    category: "Stress Management",
    question: "How do you handle high-pressure trading situations?",
    options: [
      "I get overwhelmed and make mistakes",
      "I feel stressed but manage",
      "I stay focused under pressure",
      "I perform better under pressure",
      "Pressure doesn't affect me",
    ],
  },
  {
    id: "stress2",
    category: "Stress Management",
    question: "How does trading stress affect your daily life?",
    options: [
      "It significantly impacts my life",
      "It sometimes affects me",
      "I manage to separate them",
      "It rarely affects my personal life",
      "It never affects my personal life",
    ],
  },
  {
    id: "stress3",
    category: "Stress Management",
    question: "What's your approach to managing trading-related stress?",
    options: [
      "I don't have a specific approach",
      "I try basic relaxation techniques",
      "I have some stress management strategies",
      "I have effective stress management routines",
      "I have mastered stress management",
    ],
  },
  // Confidence
  {
    id: "confidence1",
    category: "Trading Confidence",
    question: "How do you feel about your trading abilities?",
    options: [
      "I lack confidence in my abilities",
      "I'm somewhat unsure",
      "I'm moderately confident",
      "I'm quite confident",
      "I'm very confident",
    ],
  },
  {
    id: "confidence2",
    category: "Trading Confidence",
    question: "How do you handle criticism of your trading approach?",
    options: [
      "I take it very personally",
      "I feel defensive",
      "I consider it objectively",
      "I welcome constructive feedback",
      "I'm completely open to all feedback",
    ],
  },
  {
    id: "confidence3",
    category: "Trading Confidence",
    question: "When entering a new market or strategy, how do you feel?",
    options: [
      "Very anxious and uncertain",
      "Somewhat nervous",
      "Cautiously optimistic",
      "Confident and prepared",
      "Excited and fully confident",
    ],
  },
  // Learning Style
  {
    id: "learning1",
    category: "Learning & Adaptation",
    question: "How do you prefer to learn new trading concepts?",
    options: [
      "I struggle to learn new things",
      "I prefer simple, basic explanations",
      "I like structured learning materials",
      "I enjoy complex, detailed analysis",
      "I learn best through experimentation",
    ],
  },
  {
    id: "learning2",
    category: "Learning & Adaptation",
    question: "How quickly do you adapt to new market conditions?",
    options: [
      "I'm very slow to adapt",
      "I adapt gradually",
      "I adapt at a moderate pace",
      "I adapt relatively quickly",
      "I adapt very quickly",
    ],
  },
  {
    id: "learning3",
    category: "Learning & Adaptation",
    question: "How do you approach learning from your trading mistakes?",
    options: [
      "I tend to ignore or forget them",
      "I acknowledge them but don't analyze much",
      "I review them occasionally",
      "I systematically analyze all mistakes",
      "I have a comprehensive learning system",
    ],
  },
]

interface PsychologyAssessmentStepProps {
  answers: PsychologyAnswer[]
  onAnswer: (questionId: string, answer: number) => void
  onComplete: () => void
}

export function PsychologyAssessmentStep({ answers, onAnswer, onComplete }: PsychologyAssessmentStepProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  const currentAnswer = answers.find((a) => a.questionId === currentQuestion.id)?.answer

  const handleAnswerSelect = (answerValue: number) => {
    onAnswer(currentQuestion.id, answerValue)

    // Auto-advance to next question after a short delay
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
      }
    }, 300)
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      onComplete()
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const isLastQuestion = currentQuestionIndex === questions.length - 1
  const allQuestionsAnswered = answers.length === questions.length

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-800">Trading Psychology Assessment</h2>
        <p className="text-gray-600">Help us understand your trading mindset to provide personalized insights</p>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-500">
          <span>
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2 bg-gray-200">
          <div className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" />
        </Progress>
      </div>

      {/* Question */}
      <Card className="bg-white border-gray-200 p-6 shadow-sm">
        <div className="space-y-4">
          <div className="text-sm text-blue-600 font-medium">{currentQuestion.category}</div>
          <h3 className="text-lg font-semibold text-gray-800 leading-relaxed">{currentQuestion.question}</h3>

          {/* Answer Options */}
          <div className="space-y-3 pt-2">
            {currentQuestion.options.map((option, index) => {
              const answerValue = index + 1
              const isSelected = currentAnswer === answerValue

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(answerValue)}
                  className={`w-full text-left p-4 rounded-lg border transition-all duration-200 hover:scale-[1.02] ${
                    isSelected
                      ? "bg-blue-100 border-blue-500 text-blue-800"
                      : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                        isSelected ? "border-blue-500 bg-blue-500" : "border-gray-400"
                      }`}
                    >
                      {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>
                    <span className="flex-1">{option}</span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className="border-gray-300 text-gray-700 hover:bg-gray-100"
        >
          Previous
        </Button>

        <Button
          onClick={handleNext}
          disabled={!currentAnswer}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90 disabled:opacity-50"
        >
          {isLastQuestion ? (
            allQuestionsAnswered ? (
              "View Results"
            ) : (
              "Complete Assessment"
            )
          ) : (
            <>
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
