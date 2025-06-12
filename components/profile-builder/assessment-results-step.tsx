"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, XCircle, TrendingUp, Brain, Target, Zap, Smile, BookOpen } from "lucide-react"
import type { PsychologyProfile } from "./profile-builder-modal"

interface AssessmentResultsStepProps {
  profile: PsychologyProfile
  onContinue: () => void
}

export function AssessmentResultsStep({ profile, onContinue }: AssessmentResultsStepProps) {
  const scoreCategories = [
    { name: "Risk Tolerance", score: profile.riskTolerance, icon: Target },
    { name: "Emotional Control", score: profile.emotionalControl, icon: Brain },
    { name: "Decision Making", score: profile.decisionMaking, icon: TrendingUp },
    { name: "Stress Management", score: profile.stressManagement, icon: Zap },
    { name: "Confidence", score: profile.confidence, icon: Smile },
    { name: "Learning Style", score: profile.learningStyle, icon: BookOpen },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-800">Your Trading Psychology Profile</h2>
        <p className="text-gray-600">Based on your answers, here's an overview of your trading mindset.</p>
      </div>

      <Card className="bg-white border-gray-200 shadow-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-bold text-blue-600">{profile.profileType}</CardTitle>
          <p className="text-sm text-gray-500">Overall Score: {profile.overallScore}%</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {scoreCategories.map((category) => {
              const Icon = category.icon
              const progressColor = category.score >= 70 ? "bg-green-500" : category.score >= 40 ? "bg-yellow-500" : "bg-red-500"
              return (
                <div key={category.name} className="flex items-center space-x-3">
                  <Icon className="h-5 w-5 text-blue-500" />
                  <div className="flex-1">
                    <div className="flex justify-between text-sm font-medium text-gray-700">
                      <span>{category.name}</span>
                      <span>{category.score}%</span>
                    </div>
                    <Progress value={category.score} className="h-2 bg-gray-200">
                      <div className={`h-full ${progressColor} rounded-full`} />
                    </Progress>
                  </div>
                </div>
              )
            })}
          </div>

          {profile.strengths.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-800">Strengths</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                {profile.strengths.map((strength, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    {strength}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {profile.areasForImprovement.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-800">Areas for Improvement</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                {profile.areasForImprovement.map((area, index) => (
                  <li key={index} className="flex items-center">
                    <XCircle className="h-4 w-4 text-red-500 mr-2 flex-shrink-0" />
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="pt-4 flex justify-center">
        <Button
          onClick={onContinue}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90 font-semibold py-6 px-8 transition-all duration-300 hover:scale-105"
        >
          Continue to Dashboard
        </Button>
      </div>
    </div>
  )
}
