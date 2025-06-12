"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Star, TrendingUp, Zap } from "lucide-react"

interface LevelProgressProps {
  currentLevel: number
  currentXP: number
  nextLevelXP: number
  totalPoints: number
  weeklyPoints: number
  showDetailed?: boolean
}

export function LevelProgress({
  currentLevel,
  currentXP,
  nextLevelXP,
  totalPoints,
  weeklyPoints,
  showDetailed = false,
}: LevelProgressProps) {
  const progressPercentage = (currentXP / nextLevelXP) * 100
  const xpNeeded = nextLevelXP - currentXP

  const getLevelBenefits = (level: number) => {
    const benefits = [
      "Basic features unlocked",
      "Custom avatar options",
      "Advanced exercises",
      "Peer mentoring access",
      "Exclusive content",
      "Priority support",
      "Beta feature access",
      "Expert coaching sessions",
      "Community leadership",
      "Elite trader status",
    ]
    return benefits[Math.min(level, benefits.length - 1)]
  }

  if (!showDetailed) {
    return (
      <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
        <div className="flex items-center space-x-2">
          <Star className="h-5 w-5 text-yellow-500" />
          <span className="font-semibold">Level {currentLevel}</span>
        </div>
        <div className="flex-1">
          <Progress value={progressPercentage} className="h-2" />
        </div>
        <div className="text-sm text-gray-600">
          {currentXP}/{nextLevelXP} XP
        </div>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Star className="mr-2 h-5 w-5 text-yellow-500" />
            Level {currentLevel}
          </div>
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300">
            {getLevelBenefits(currentLevel)}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span>Progress to Level {currentLevel + 1}</span>
            <span>
              {currentXP.toLocaleString()}/{nextLevelXP.toLocaleString()} XP
            </span>
          </div>
          <Progress value={progressPercentage} className="h-3" />
          <p className="text-xs text-gray-500 mt-1">{xpNeeded.toLocaleString()} XP needed for next level</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-center mb-1">
              <TrendingUp className="h-4 w-4 text-blue-600 mr-1" />
              <span className="text-sm font-medium text-blue-900">Total Points</span>
            </div>
            <div className="text-lg font-bold text-blue-700">{totalPoints.toLocaleString()}</div>
          </div>

          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="flex items-center justify-center mb-1">
              <Zap className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-sm font-medium text-green-900">This Week</span>
            </div>
            <div className="text-lg font-bold text-green-700">+{weeklyPoints}</div>
          </div>
        </div>

        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-semibold text-yellow-900 mb-1">Next Level Benefits</h4>
          <p className="text-sm text-yellow-800">{getLevelBenefits(currentLevel + 1)}</p>
        </div>
      </CardContent>
    </Card>
  )
}
