"use client"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Target, Brain, BookOpen, Calendar, Award, BarChart3, PieChart } from "lucide-react"

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
            <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-green-200 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-lg text-green-800">
                  <TrendingUp className="mr-2 h-5 w-5 text-green-600" />
                  Overall Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2 text-green-900">78%</div>
                <Progress value={78} className="mb-2 h-3" />
                <p className="text-sm text-green-700">Great progress! Keep it up.</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-cyan-100 border-blue-200 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-lg text-blue-800">
                  <Calendar className="mr-2 h-5 w-5 text-blue-600" />
                  Current Streak
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2 text-blue-900">12 days</div>
                <p className="text-sm text-blue-700">Longest streak: 18 days</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-violet-100 border-purple-200 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-lg text-purple-800">
                  <Award className="mr-2 h-5 w-5 text-purple-600" />
                  Level
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2 text-purple-900">Level 3</div>
                <Progress value={65} className="mb-2 h-3" />
                <p className="text-sm text-purple-700">650/1000 XP to Level 4</p>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Daily Progress Chart */}
            <Card className="shadow-xl bg-gradient-to-br from-white to-blue-50 border-0">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-xl text-gray-800">
                  <BarChart3 className="mr-3 h-6 w-6 text-blue-600" />
                  Daily Progress
                </CardTitle>
                <CardDescription>Tasks completed this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 relative">
                  {/* Custom 3D Bar Chart */}
                  <div className="flex items-end justify-between h-full px-4 pb-8">
                    {[
                      { day: "Mon", value: 12, height: "60%" },
                      { day: "Tue", value: 19, height: "95%" },
                      { day: "Wed", value: 3, height: "15%" },
                      { day: "Thu", value: 5, height: "25%" },
                      { day: "Fri", value: 2, height: "10%" },
                      { day: "Sat", value: 3, height: "15%" },
                      { day: "Sun", value: 10, height: "50%" },
                    ].map((item, index) => (
                      <div key={item.day} className="flex flex-col items-center group">
                        <div
                          className="w-8 bg-gradient-to-t from-blue-500 to-blue-300 rounded-t-lg shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-xl relative"
                          style={{ height: item.height }}
                        >
                          {/* 3D Effect */}
                          <div
                            className="absolute -right-1 top-1 w-8 bg-gradient-to-b from-blue-400 to-blue-600 rounded-t-lg opacity-60 transform skew-y-12 origin-bottom"
                            style={{ height: item.height }}
                          ></div>
                          <div className="absolute -top-1 -right-1 w-8 h-2 bg-gradient-to-r from-blue-300 to-blue-500 rounded-lg transform skew-x-12"></div>

                          {/* Value tooltip */}
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            {item.value}
                          </div>
                        </div>
                        <span className="text-sm text-gray-600 mt-2 font-medium">{item.day}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Task Distribution Pie Chart */}
            <Card className="shadow-xl bg-gradient-to-br from-white to-purple-50 border-0">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-xl text-gray-800">
                  <PieChart className="mr-3 h-6 w-6 text-purple-600" />
                  Task Distribution
                </CardTitle>
                <CardDescription>Current task breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center">
                  {/* Custom 3D Pie Chart */}
                  <div className="relative w-48 h-48">
                    {/* Pie Chart SVG */}
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      {/* Shadow */}
                      <circle cx="52" cy="52" r="35" fill="rgba(0,0,0,0.1)" />

                      {/* Completed - 50% */}
                      <circle
                        cx="50"
                        cy="50"
                        r="35"
                        fill="transparent"
                        stroke="url(#completedGradient)"
                        strokeWidth="20"
                        strokeDasharray="109.96 219.91"
                        strokeDashoffset="0"
                        className="drop-shadow-lg"
                      />

                      {/* In Progress - 30% */}
                      <circle
                        cx="50"
                        cy="50"
                        r="35"
                        fill="transparent"
                        stroke="url(#progressGradient)"
                        strokeWidth="20"
                        strokeDasharray="65.97 219.91"
                        strokeDashoffset="-109.96"
                        className="drop-shadow-lg"
                      />

                      {/* Pending - 20% */}
                      <circle
                        cx="50"
                        cy="50"
                        r="35"
                        fill="transparent"
                        stroke="url(#pendingGradient)"
                        strokeWidth="20"
                        strokeDasharray="43.98 219.91"
                        strokeDashoffset="-175.93"
                        className="drop-shadow-lg"
                      />

                      {/* Gradients */}
                      <defs>
                        <linearGradient id="completedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#10b981" />
                          <stop offset="100%" stopColor="#059669" />
                        </linearGradient>
                        <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#3b82f6" />
                          <stop offset="100%" stopColor="#1d4ed8" />
                        </linearGradient>
                        <linearGradient id="pendingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#f59e0b" />
                          <stop offset="100%" stopColor="#d97706" />
                        </linearGradient>
                      </defs>
                    </svg>

                    {/* Center text */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-800">100</div>
                        <div className="text-sm text-gray-600">Total Tasks</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Legend */}
                <div className="flex justify-center space-x-6 mt-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-green-600 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-600">Completed (50)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-600">In Progress (30)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-600">Pending (20)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Skills Progress */}
          <Card className="mb-8 shadow-lg bg-gradient-to-br from-white to-gray-50">
            <CardHeader>
              <CardTitle>Skills Development</CardTitle>
              <CardDescription>Your progress in key trading psychology areas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  { skill: "Emotional Regulation", progress: 85, color: "from-green-500 to-emerald-600" },
                  { skill: "Risk Management Psychology", progress: 72, color: "from-blue-500 to-cyan-600" },
                  { skill: "Discipline & Consistency", progress: 68, color: "from-purple-500 to-violet-600" },
                  { skill: "Self-Awareness", progress: 90, color: "from-indigo-500 to-blue-600" },
                  { skill: "Habit Formation", progress: 55, color: "from-orange-500 to-red-600" },
                ].map((item) => (
                  <div key={item.skill}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-800">{item.skill}</span>
                      <span className="text-sm text-gray-600">{item.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                      <div
                        className={`h-3 bg-gradient-to-r ${item.color} rounded-full shadow-lg transition-all duration-1000 ease-out`}
                        style={{ width: `${item.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Activity Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="shadow-lg bg-gradient-to-br from-white to-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-800">
                  <Target className="mr-2 h-5 w-5" />
                  Exercises Completed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>This Week</span>
                    <Badge className="bg-gradient-to-r from-blue-500 to-blue-600">5 exercises</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>This Month</span>
                    <Badge className="bg-gradient-to-r from-blue-500 to-blue-600">18 exercises</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Total</span>
                    <Badge className="bg-gradient-to-r from-blue-500 to-blue-600">47 exercises</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg bg-gradient-to-br from-white to-purple-50">
              <CardHeader>
                <CardTitle className="flex items-center text-purple-800">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Reflections Written
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>This Week</span>
                    <Badge className="bg-gradient-to-r from-purple-500 to-purple-600">3 reflections</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>This Month</span>
                    <Badge className="bg-gradient-to-r from-purple-500 to-purple-600">12 reflections</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Total</span>
                    <Badge className="bg-gradient-to-r from-purple-500 to-purple-600">28 reflections</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Achievements */}
          <Card className="shadow-lg bg-gradient-to-br from-white to-yellow-50">
            <CardHeader>
              <CardTitle className="flex items-center text-yellow-800">
                <Award className="mr-2 h-5 w-5" />
                Achievements
              </CardTitle>
              <CardDescription>Milestones you've reached on your journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center p-4 bg-gradient-to-br from-green-50 to-emerald-100 rounded-lg border border-green-200 shadow-lg transform hover:scale-105 transition-transform">
                  <div className="h-12 w-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mr-4 shadow-lg">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-green-900">First Exercise</h3>
                    <p className="text-sm text-green-700">Completed your first exercise</p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-gradient-to-br from-blue-50 to-cyan-100 rounded-lg border border-blue-200 shadow-lg transform hover:scale-105 transition-transform">
                  <div className="h-12 w-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mr-4 shadow-lg">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900">Week Warrior</h3>
                    <p className="text-sm text-blue-700">7-day activity streak</p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-gradient-to-br from-purple-50 to-violet-100 rounded-lg border border-purple-200 shadow-lg transform hover:scale-105 transition-transform">
                  <div className="h-12 w-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mr-4 shadow-lg">
                    <Brain className="h-6 w-6 text-white" />
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
