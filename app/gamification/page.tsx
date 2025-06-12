"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Star, Flame, Crown, Target, Award, Zap, Gift, Medal, Sparkles } from "lucide-react"

interface UserProfile {
  level: number
  totalPoints: number
  currentXP: number
  nextLevelXP: number
  weeklyPoints: number
  monthlyPoints: number
  rank: number
  streak: number
  longestStreak: number
}

export default function GamificationPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState<"daily" | "weekly" | "monthly" | "all-time">("weekly")

  const userProfile: UserProfile = {
    level: 8,
    totalPoints: 2450,
    currentXP: 450,
    nextLevelXP: 750,
    weeklyPoints: 320,
    monthlyPoints: 1200,
    rank: 1,
    streak: 15,
    longestStreak: 23,
  }

  const recentAchievements = [
    {
      id: "week_warrior",
      title: "Week Warrior",
      description: "Maintained a 7-day streak",
      icon: "🔥",
      rarity: "rare",
      points: 200,
      unlockedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
    {
      id: "exercise_master",
      title: "Exercise Expert",
      description: "Completed 25 exercises",
      icon: "🎯",
      rarity: "epic",
      points: 300,
      unlockedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    },
    {
      id: "point_collector",
      title: "Point Collector",
      description: "Earned 1,000 points",
      icon: "💰",
      rarity: "common",
      points: 100,
      unlockedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    },
  ]

  const leaderboard = [
    { rank: 1, username: "You", points: 2450, level: 8, streak: 15, badge: "🏆" },
    { rank: 2, username: "PsychologyPro", points: 2200, level: 7, streak: 12, badge: "🧠" },
    { rank: 3, username: "ConsistentTrader", points: 1980, level: 7, streak: 23, badge: "🔥" },
    { rank: 4, username: "RiskManager", points: 1750, level: 6, streak: 8, badge: "🛡️" },
    { rank: 5, username: "MindfulTrader", points: 1650, level: 6, streak: 18, badge: "🧘" },
    { rank: 6, username: "StrategySeeker", points: 1520, level: 5, streak: 5, badge: "📈" },
    { rank: 7, username: "DisciplinedTrader", points: 1400, level: 5, streak: 11, badge: "⚖️" },
    { rank: 8, username: "PatientInvestor", points: 1350, level: 5, streak: 7, badge: "🕰️" },
  ]

  const availableAchievements = [
    {
      id: "month_master",
      title: "Month Master",
      description: "Maintain a 30-day streak",
      icon: "💎",
      rarity: "legendary",
      points: 1000,
      progress: 15,
      maxProgress: 30,
    },
    {
      id: "elite_trader",
      title: "Elite Trader",
      description: "Reach level 10",
      icon: "👑",
      rarity: "legendary",
      points: 1500,
      progress: 8,
      maxProgress: 10,
    },
    {
      id: "social_butterfly",
      title: "Social Butterfly",
      description: "Help 10 community members",
      icon: "🦋",
      rarity: "epic",
      points: 400,
      progress: 3,
      maxProgress: 10,
    },
  ]

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-gray-100 text-gray-800 border-gray-300"
      case "rare":
        return "bg-blue-100 text-blue-800 border-blue-300"
      case "epic":
        return "bg-purple-100 text-purple-800 border-purple-300"
      case "legendary":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 3:
        return <Award className="h-5 w-5 text-orange-500" />
      default:
        return <span className="text-sm font-bold text-gray-600">#{rank}</span>
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Navigation />

      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Gamification Hub</h1>
            <p className="text-gray-600">Track your progress, earn achievements, and compete with fellow traders</p>
          </div>

          {/* User Level & Points Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Star className="mr-2 h-5 w-5" />
                  Level {userProfile.level}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress to Level {userProfile.level + 1}</span>
                    <span>
                      {userProfile.currentXP}/{userProfile.nextLevelXP} XP
                    </span>
                  </div>
                  <Progress value={(userProfile.currentXP / userProfile.nextLevelXP) * 100} className="bg-white/20" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Total Points</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{userProfile.totalPoints.toLocaleString()}</div>
                <p className="text-xs text-gray-500">+{userProfile.weeklyPoints} this week</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Current Streak</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600 flex items-center">
                  <Flame className="mr-1 h-6 w-6" />
                  {userProfile.streak}
                </div>
                <p className="text-xs text-gray-500">Best: {userProfile.longestStreak} days</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Leaderboard Rank</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600 flex items-center">
                  {getRankIcon(userProfile.rank)}
                  <span className="ml-2">#{userProfile.rank}</span>
                </div>
                <p className="text-xs text-gray-500">This week</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="achievements" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
              <TabsTrigger value="rewards">Rewards</TabsTrigger>
              <TabsTrigger value="challenges">Challenges</TabsTrigger>
            </TabsList>

            <TabsContent value="achievements" className="space-y-6">
              {/* Recent Achievements */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Sparkles className="mr-2 h-5 w-5 text-yellow-500" />
                    Recent Achievements
                  </CardTitle>
                  <CardDescription>Your latest accomplishments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {recentAchievements.map((achievement) => (
                      <div
                        key={achievement.id}
                        className="p-4 border rounded-lg bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-2xl">{achievement.icon}</span>
                          <Badge className={getRarityColor(achievement.rarity)}>{achievement.rarity}</Badge>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-1">{achievement.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-yellow-700">+{achievement.points} points</span>
                          <span className="text-xs text-gray-500">{achievement.unlockedAt.toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Available Achievements */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="mr-2 h-5 w-5" />
                    Available Achievements
                  </CardTitle>
                  <CardDescription>Work towards these goals to earn more points</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {availableAchievements.map((achievement) => (
                      <div key={achievement.id} className="p-4 border rounded-lg hover:bg-gray-50">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center">
                            <span className="text-2xl mr-3">{achievement.icon}</span>
                            <div>
                              <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
                              <p className="text-sm text-gray-600">{achievement.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={getRarityColor(achievement.rarity)}>{achievement.rarity}</Badge>
                            <span className="text-sm font-medium text-green-600">+{achievement.points} points</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>
                              {achievement.progress}/{achievement.maxProgress}
                            </span>
                          </div>
                          <Progress value={(achievement.progress / achievement.maxProgress) * 100} />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="leaderboard" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center">
                        <Trophy className="mr-2 h-5 w-5 text-yellow-500" />
                        Leaderboard
                      </CardTitle>
                      <CardDescription>See how you rank against other traders</CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      {(["daily", "weekly", "monthly", "all-time"] as const).map((timeframe) => (
                        <Button
                          key={timeframe}
                          variant={selectedTimeframe === timeframe ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedTimeframe(timeframe)}
                        >
                          {timeframe.charAt(0).toUpperCase() + timeframe.slice(1).replace("-", " ")}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {leaderboard.map((entry, index) => (
                      <div
                        key={entry.username}
                        className={`flex items-center justify-between p-4 rounded-lg border ${
                          entry.username === "You"
                            ? "bg-blue-50 border-blue-200"
                            : index < 3
                              ? "bg-yellow-50 border-yellow-200"
                              : "bg-white"
                        }`}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center justify-center w-8 h-8">{getRankIcon(entry.rank)}</div>
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{entry.badge}</span>
                            <div>
                              <h3 className={`font-semibold ${entry.username === "You" ? "text-blue-900" : ""}`}>
                                {entry.username}
                              </h3>
                              <p className="text-sm text-gray-600">Level {entry.level}</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-6">
                          <div className="text-right">
                            <div className="font-semibold">{entry.points.toLocaleString()}</div>
                            <div className="text-xs text-gray-500">points</div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold flex items-center">
                              <Flame className="h-4 w-4 text-orange-500 mr-1" />
                              {entry.streak}
                            </div>
                            <div className="text-xs text-gray-500">streak</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="rewards" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Gift className="mr-2 h-5 w-5 text-purple-500" />
                    Rewards Store
                  </CardTitle>
                  <CardDescription>Spend your points on exclusive rewards and benefits</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="text-center mb-4">
                        <div className="text-4xl mb-2">🎨</div>
                        <h3 className="font-semibold">Custom Avatar</h3>
                        <p className="text-sm text-gray-600">Personalize your profile</p>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-purple-600 mb-2">500 points</div>
                        <Button size="sm" className="w-full">
                          Unlock
                        </Button>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="text-center mb-4">
                        <div className="text-4xl mb-2">📚</div>
                        <h3 className="font-semibold">Bonus Chapter</h3>
                        <p className="text-sm text-gray-600">Exclusive advanced content</p>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-purple-600 mb-2">1,000 points</div>
                        <Button size="sm" className="w-full">
                          Unlock
                        </Button>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="text-center mb-4">
                        <div className="text-4xl mb-2">🏆</div>
                        <h3 className="font-semibold">Elite Badge</h3>
                        <p className="text-sm text-gray-600">Show off your expertise</p>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-purple-600 mb-2">2,000 points</div>
                        <Button size="sm" className="w-full">
                          Unlock
                        </Button>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="text-center mb-4">
                        <div className="text-4xl mb-2">💬</div>
                        <h3 className="font-semibold">1-on-1 Coaching</h3>
                        <p className="text-sm text-gray-600">Personal session with expert</p>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-purple-600 mb-2">5,000 points</div>
                        <Button size="sm" className="w-full">
                          Unlock
                        </Button>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="text-center mb-4">
                        <div className="text-4xl mb-2">🎯</div>
                        <h3 className="font-semibold">Custom Exercises</h3>
                        <p className="text-sm text-gray-600">Tailored to your needs</p>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-purple-600 mb-2">3,000 points</div>
                        <Button size="sm" className="w-full">
                          Unlock
                        </Button>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="text-center mb-4">
                        <div className="text-4xl mb-2">⚡</div>
                        <h3 className="font-semibold">Double XP Weekend</h3>
                        <p className="text-sm text-gray-600">Boost your progress</p>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-purple-600 mb-2">1,500 points</div>
                        <Button size="sm" className="w-full">
                          Unlock
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="challenges" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="mr-2 h-5 w-5 text-orange-500" />
                    Weekly Challenges
                  </CardTitle>
                  <CardDescription>Complete special challenges for bonus points and exclusive rewards</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-orange-900">Perfect Week Challenge</h3>
                          <p className="text-sm text-orange-800">Complete all daily habits for 7 consecutive days</p>
                        </div>
                        <Badge className="bg-orange-100 text-orange-800">Active</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>5/7 days</span>
                        </div>
                        <Progress value={71} className="bg-orange-200" />
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-sm font-medium text-orange-700">Reward: 500 bonus points</span>
                        <span className="text-xs text-orange-600">2 days remaining</span>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-blue-900">Knowledge Sprint</h3>
                          <p className="text-sm text-blue-800">Complete 10 exercises in one week</p>
                        </div>
                        <Badge className="bg-blue-100 text-blue-800">Active</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>7/10 exercises</span>
                        </div>
                        <Progress value={70} className="bg-blue-200" />
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-sm font-medium text-blue-700">Reward: Exclusive badge</span>
                        <span className="text-xs text-blue-600">3 days remaining</span>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg bg-gray-50 border-gray-200 opacity-75">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-700">Community Helper</h3>
                          <p className="text-sm text-gray-600">Help 5 community members with their questions</p>
                        </div>
                        <Badge variant="outline">Coming Soon</Badge>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-sm font-medium text-gray-600">Reward: 300 points + Mentor badge</span>
                        <span className="text-xs text-gray-500">Starts next week</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
