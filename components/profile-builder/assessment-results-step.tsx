"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Brain,
  TrendingUp,
  Target,
  Shield,
  Heart,
  Lightbulb,
  BookOpen,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
} from "lucide-react"
import type { PsychologyProfile } from "./profile-builder-modal"

interface AssessmentResultsStepProps {
  profile: PsychologyProfile
  onContinue: () => void
}

const categoryIcons = {
  riskTolerance: Shield,
  emotionalControl: Heart,
  decisionMaking: Target,
  stressManagement: Brain,
  confidence: TrendingUp,
  learningStyle: BookOpen,
}

const categoryLabels = {
  riskTolerance: "Risk Management",
  emotionalControl: "Emotional Control",
  decisionMaking: "Decision Making",
  stressManagement: "Stress Management",
  confidence: "Trading Confidence",
  learningStyle: "Learning & Adaptation",
}

const getScoreColor = (score: number) => {
  if (score >= 80) return "text-green-400"
  if (score >= 60) return "text-yellow-400"
  return "text-red-400"
}

const getScoreLabel = (score: number) => {
  if (score >= 80) return "Excellent"
  if (score >= 60) return "Good"
  if (score >= 40) return "Fair"
  return "Needs Work"
}

export function AssessmentResultsStep({ profile, onContinue }: AssessmentResultsStepProps) {
  const categories = Object.entries(categoryIcons).map(([key, Icon]) => ({
    key,
    label: categoryLabels[key as keyof typeof categoryLabels],
    score: profile[key as keyof PsychologyProfile] as number,
    Icon,
  }))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-[#FFD700]/20 rounded-full flex items-center justify-center mx-auto">
          <Brain className="h-10 w-10 text-[#FFD700]" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Your Trading Psychology Profile</h2>
          <Badge variant="secondary" className="bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30">
            {profile.profileType}
          </Badge>
        </div>
      </div>

      {/* Overall Score */}
      <Card className="bg-gray-900 border-gray-700 p-6">
        <div className="text-center space-y-4">
          <h3 className="text-lg font-semibold text-white">Overall Psychology Score</h3>
          <div className="relative">
            <div className="text-4xl font-bold text-[#FFD700]">{profile.overallScore}</div>
            <div className="text-sm text-gray-400">out of 100</div>
          </div>
          <Progress value={profile.overallScore} className="h-3" />
          <p className="text-gray-300 text-sm">
            {profile.overallScore >= 80
              ? "Excellent psychological foundation for trading success!"
              : profile.overallScore >= 60
                ? "Good psychological foundation with room for improvement."
                : "Significant opportunities to strengthen your trading psychology."}
          </p>
        </div>
      </Card>

      {/* Category Breakdown */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Detailed Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map(({ key, label, score, Icon }) => (
            <Card key={key} className="bg-gray-900 border-gray-700 p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#FFD700]/20 rounded-lg flex items-center justify-center">
                  <Icon className="h-5 w-5 text-[#FFD700]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-white">{label}</span>
                    <span className={`text-sm font-bold ${getScoreColor(score)}`}>{score}</span>
                  </div>
                  <Progress value={score} className="h-2" />
                  <div className="text-xs text-gray-400 mt-1">{getScoreLabel(score)}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Strengths */}
      {profile.strengths.length > 0 && (
        <Card className="bg-green-900/20 border-green-700/50 p-6">
          <div className="flex items-start space-x-3">
            <CheckCircle className="h-6 w-6 text-green-400 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Your Strengths</h3>
              <ul className="space-y-2">
                {profile.strengths.map((strength, index) => (
                  <li key={index} className="text-green-300 flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      )}

      {/* Areas for Improvement */}
      {profile.areasForImprovement.length > 0 && (
        <Card className="bg-yellow-900/20 border-yellow-700/50 p-6">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-6 w-6 text-yellow-400 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Growth Opportunities</h3>
              <ul className="space-y-2">
                {profile.areasForImprovement.map((area, index) => (
                  <li key={index} className="text-yellow-300 flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
              <p className="text-yellow-200 text-sm mt-3">
                Don't worry! ProFitz will provide personalized exercises and insights to help you improve in these
                areas.
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Personalized Insights */}
      <Card className="bg-[#FFD700]/10 border-[#FFD700]/30 p-6">
        <div className="flex items-start space-x-3">
          <Lightbulb className="h-6 w-6 text-[#FFD700] mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">What This Means for You</h3>
            <p className="text-gray-300 leading-relaxed">
              Based on your <strong className="text-[#FFD700]">{profile.profileType}</strong> profile, ProFitz will
              customize your experience with targeted exercises, personalized insights, and specific recommendations to
              help you develop stronger trading psychology and achieve consistent profitability.
            </p>
          </div>
        </div>
      </Card>

      {/* Continue Button */}
      <div className="pt-4">
        <Button
          onClick={onContinue}
          className="w-full bg-[#FFD700] text-[#1A1A1A] hover:bg-[#FFD700]/90 font-semibold py-6 transition-all duration-300 hover:scale-105"
        >
          <span>Continue to Dashboard</span>
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
