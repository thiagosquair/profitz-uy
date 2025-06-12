"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import Image from "next/image"
import { WelcomeStep } from "./welcome-step"
import { ExperienceStep } from "./experience-step"
import { InstrumentsStep } from "./instruments-step"
import { PsychologyAssessmentStep } from "./psychology-assessment-step"
import { AssessmentResultsStep } from "./assessment-results-step"
import { CompletionStep } from "./completion-step"
import { useRouter } from "next/navigation"

export type TradingExperience = "< 1 year" | "1-3 years" | "3-5 years" | "5+ years"
export type TradingInstrument = "Stocks" | "Options" | "Forex" | "Crypto" | "Futures" | "Other"

export interface PsychologyAnswer {
  questionId: string
  answer: number // 1-5 scale
}

export interface PsychologyProfile {
  riskTolerance: number
  emotionalControl: number
  decisionMaking: number
  stressManagement: number
  confidence: number
  learningStyle: number
  overallScore: number
  profileType: string
  strengths: string[]
  areasForImprovement: string[]
}

export interface ProfileData {
  experience: TradingExperience | null
  instruments: TradingInstrument[]
  psychologyAnswers: PsychologyAnswer[]
  psychologyProfile: PsychologyProfile | null
}

interface ProfileBuilderModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProfileBuilderModal({ open, onOpenChange }: ProfileBuilderModalProps) {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [profileData, setProfileData] = useState<ProfileData>({
    experience: null,
    instruments: [],
    psychologyAnswers: [],
    psychologyProfile: null,
  })
  const [progress, setProgress] = useState(0)

  // Update progress bar based on current step
  useEffect(() => {
    const totalSteps = 6 // Welcome, Experience, Instruments, Psychology, Results, Completion
    const newProgress = Math.min(((step + 1) / totalSteps) * 100, 100)
    setProgress(newProgress)
  }, [step])

  const handleNext = () => {
    setStep((prev) => prev + 1)
  }

  const handleExperienceSelect = (experience: TradingExperience) => {
    setProfileData((prev) => ({ ...prev, experience }))
    handleNext()
  }

  const handleInstrumentToggle = (instrument: TradingInstrument) => {
    setProfileData((prev) => {
      const instruments = prev.instruments.includes(instrument)
        ? prev.instruments.filter((i) => i !== instrument)
        : [...prev.instruments, instrument]
      return { ...prev, instruments }
    })
  }

  const handlePsychologyAnswer = (questionId: string, answer: number) => {
    setProfileData((prev) => {
      const existingAnswerIndex = prev.psychologyAnswers.findIndex((a) => a.questionId === questionId)
      const newAnswers = [...prev.psychologyAnswers]

      if (existingAnswerIndex >= 0) {
        newAnswers[existingAnswerIndex] = { questionId, answer }
      } else {
        newAnswers.push({ questionId, answer })
      }

      return { ...prev, psychologyAnswers: newAnswers }
    })
  }

  const calculatePsychologyProfile = (answers: PsychologyAnswer[]): PsychologyProfile => {
    // Group answers by category
    const categories = {
      riskTolerance: ["risk1", "risk2", "risk3"],
      emotionalControl: ["emotion1", "emotion2", "emotion3"],
      decisionMaking: ["decision1", "decision2", "decision3"],
      stressManagement: ["stress1", "stress2", "stress3"],
      confidence: ["confidence1", "confidence2", "confidence3"],
      learningStyle: ["learning1", "learning2", "learning3"],
    }

    const scores: Record<string, number> = {}

    Object.entries(categories).forEach(([category, questionIds]) => {
      const categoryAnswers = answers.filter((a) => questionIds.includes(a.questionId))
      const avgScore = categoryAnswers.reduce((sum, a) => sum + a.answer, 0) / categoryAnswers.length
      scores[category] = Math.round(avgScore * 20) // Convert to 0-100 scale
    })

    const overallScore = Math.round(
      Object.values(scores).reduce((sum, score) => sum + score, 0) / Object.keys(scores).length,
    )

    // Determine profile type
    let profileType = "Balanced Trader"
    let strengths: string[] = []
    const areasForImprovement: string[] = []

    if (scores.riskTolerance >= 80 && scores.emotionalControl >= 80) {
      profileType = "Disciplined Risk-Taker"
      strengths = ["High risk tolerance", "Excellent emotional control", "Confident decision making"]
    } else if (scores.emotionalControl >= 80 && scores.stressManagement >= 80) {
      profileType = "Zen Trader"
      strengths = ["Exceptional emotional control", "Great stress management", "Calm under pressure"]
    } else if (scores.confidence >= 80 && scores.decisionMaking >= 80) {
      profileType = "Confident Strategist"
      strengths = ["High confidence", "Strong decision making", "Strategic thinking"]
    } else if (scores.learningStyle >= 80) {
      profileType = "Adaptive Learner"
      strengths = ["Excellent learning ability", "Adaptable to new strategies", "Growth mindset"]
    }

    // Identify areas for improvement
    Object.entries(scores).forEach(([category, score]) => {
      if (score < 60) {
        const categoryNames: Record<string, string> = {
          riskTolerance: "Risk Management",
          emotionalControl: "Emotional Control",
          decisionMaking: "Decision Making",
          stressManagement: "Stress Management",
          confidence: "Trading Confidence",
          learningStyle: "Learning & Adaptation",
        }
        areasForImprovement.push(categoryNames[category])
      }
    })

    return {
      riskTolerance: scores.riskTolerance,
      emotionalControl: scores.emotionalControl,
      decisionMaking: scores.decisionMaking,
      stressManagement: scores.stressManagement,
      confidence: scores.confidence,
      learningStyle: scores.learningStyle,
      overallScore,
      profileType,
      strengths,
      areasForImprovement,
    }
  }

  const handleAssessmentComplete = () => {
    const profile = calculatePsychologyProfile(profileData.psychologyAnswers)
    setProfileData((prev) => ({ ...prev, psychologyProfile: profile }))
    handleNext()
  }

  const handleComplete = () => {
    // Here you would typically save the profile data to your backend
    console.log("Complete profile data:", profileData)

    // Close the modal and redirect to dashboard
    onOpenChange(false)
    router.push("/dashboard")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] p-0 bg-[#1A1A1A] border-gray-800 overflow-hidden">
        {/* Progress bar */}
        <div className="w-full h-1 bg-gray-800">
          <div className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
        </div>

        {/* Logo and step indicator */}
        <div className="flex items-center justify-between px-6 pt-6">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10">
              <Image 
                src="/profitz-logo-large.png" 
                alt="ProFitz Logo" 
                width={40} 
                height={40} 
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-lg font-bold text-white">ProFitz</span>
          </div>
          <div className="flex items-center space-x-1">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === step ? "bg-blue-500 w-6" : i < step ? "bg-blue-500/50" : "bg-gray-700"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step content */}
        <div className="p-6">
          {step === 0 && <WelcomeStep onContinue={handleNext} />}
          {step === 1 && <ExperienceStep onSelect={handleExperienceSelect} />}
          {step === 2 && (
            <InstrumentsStep
              selectedInstruments={profileData.instruments}
              onToggle={handleInstrumentToggle}
              onContinue={handleNext}
            />
          )}
          {step === 3 && (
            <PsychologyAssessmentStep
              answers={profileData.psychologyAnswers}
              onAnswer={handlePsychologyAnswer}
              onComplete={handleAssessmentComplete}
            />
          )}
          {step === 4 && profileData.psychologyProfile && (
            <AssessmentResultsStep profile={profileData.psychologyProfile} onContinue={handleNext} />
          )}
          {step === 5 && <CompletionStep onComplete={handleComplete} />}
        </div>
      </DialogContent>
    </Dialog>
  )
}
