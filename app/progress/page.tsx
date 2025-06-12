import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Target, Brain, BookOpen, Calendar, Award } from "lucide-react"

export default function ProgressPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Navigation />

      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Progress</h1>
            <p className="text-gray-600">Track your journey to mastering trading psychology</p>
          </div>

          {/* Overall Progress */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <TrendingUp className="mr-2 h-5 w-5 text-green-600" />
                  Overall Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2">78%</div>
                <Progress value={78} className="mb-2" />
                <p className="text-sm text-gray-600">Great progress! Keep it up.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Calendar className="mr-2 h-5 w-5 text-blue-600" />
                  Current Streak
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2">12 days</div>
                <p className="text-sm text-gray-600">Longest streak: 18 days</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Award className="mr-2 h-5 w-5 text-purple-600" />
                  Level
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2">Level 3</div>
                <Progress value={65} className="mb-2" />
                <p className="text-sm text-gray-600">650/1000 XP to Level 4</p>
              </CardContent>
            </Card>
          </div>

          {/* Skills Progress */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Skills Development</CardTitle>
              <CardDescription>Your progress in key trading psychology areas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Emotional Regulation</span>
                    <span className="text-sm text-gray-600">85%</span>
                  </div>
                  <Progress value={85} />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Risk Management Psychology</span>
                    <span className="text-sm text-gray-600">72%</span>
                  </div>
                  <Progress value={72} />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Discipline & Consistency</span>
                    <span className="text-sm text-gray-600">68%</span>
                  </div>
                  <Progress value={68} />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Self-Awareness</span>
                    <span className="text-sm text-gray-600">90%</span>
                  </div>
                  <Progress value={90} />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Habit Formation</span>
                    <span className="text-sm text-gray-600">55%</span>
                  </div>
                  <Progress value={55} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activity Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="mr-2 h-5 w-5" />
                  Exercises Completed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>This Week</span>
                    <Badge>5 exercises</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>This Month</span>
                    <Badge>18 exercises</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Total</span>
                    <Badge>47 exercises</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Reflections Written
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>This Week</span>
                    <Badge>3 reflections</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>This Month</span>
                    <Badge>12 reflections</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Total</span>
                    <Badge>28 reflections</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="mr-2 h-5 w-5" />
                Achievements
              </CardTitle>
              <CardDescription>Milestones you've reached on your journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <Target className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-green-900">First Exercise</h3>
                    <p className="text-sm text-green-700">Completed your first exercise</p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900">Week Warrior</h3>
                    <p className="text-sm text-blue-700">7-day activity streak</p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                    <Brain className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-purple-900">Mind Master</h3>
                    <p className="text-sm text-purple-700">50 AI coach sessions</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
