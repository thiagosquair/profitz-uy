"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, BookOpen, CheckCircle, FileText } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ModulePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [currentSection, setCurrentSection] = useState(0)
  const [completedSections, setCompletedSections] = useState<number[]>([])

  // Mock module data - in real app, this would come from API/database
  const moduleData = {
    ch1: {
      title: "The Psychology of Trading Success",
      description: "Understanding the mental framework required for consistent trading performance",
      estimatedTime: 45,
      difficulty: "Beginner",
      sections: [
        {
          title: "Introduction to Trading Psychology",
          content: `Trading psychology is the emotional and mental state that helps dictate success or failure in trading securities. It represents various aspects of an individual's character and behaviors that influence their trading actions.

Key aspects include:
• Discipline and patience
• Courage and conviction  
• Risk management mindset
• Emotional regulation
• Continuous learning attitude

The most successful traders understand that psychology often matters more than technical analysis or fundamental research. Your mindset determines how you interpret market information, manage risk, and execute your trading plan.`,
          type: "reading",
        },
        {
          title: "Common Psychological Barriers",
          content: `Most traders face similar psychological challenges that can dermine their performance:

**Fear and Greed Cycle**
Fear of missing out (FOMO) leads to impulsive entries, while fear of loss causes premature exits. Greed makes traders hold winning positions too long or risk too much capital.

**Confirmation Bias**
Seeking information that confirms existing beliefs while ignoring contradictory evidence. This leads to poor decision-making and missed opportunities.

**Overconfidence**
After a series of wins, traders may become overconfident and take excessive risks, leading to significant losses.

**Loss Aversion**
The tendency to feel losses more acutely than equivalent gains, causing traders to hold losing positions too long and cut winners too short.`,
          type: "reading",
        },
        {
          title: "Building Mental Resilience",
          content: `Developing psychological resilience is crucial for long-term trading success:

**1. Develop a Trading Plan**
Having a clear, written plan removes emotion from decision-making. Your plan should include entry/exit criteria, risk management rules, and position sizing guidelines.

**2. Practice Mindfulness**
Regular mindfulness practice helps you stay present and aware of your emotional state while trading. This awareness allows you to catch emotional reactions before they impact your decisions.

**3. Keep a Trading Journal**
Document not just your trades, but your emotional state and thought processes. This helps identify patterns and triggers that affect your performance.

**4. Accept Losses as Part of the Process**
Understand that losses are inevitable and part of the learning process. Focus on following your process rather than individual trade outcomes.`,
          type: "reading",
        },
        {
          title: "Knowledge Check",
          content: "Test your understanding of the key concepts covered in this module.",
          type: "quiz",
        },
      ],
    },
  }

  const module = moduleData[params.id as keyof typeof moduleData]

  if (!module) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Navigation />
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Module Not Found</h1>
            <Button onClick={() => router.push("/learning-path")}>Back to Learning Path</Button>
          </div>
        </main>
      </div>
    )
  }

  const markSectionComplete = (sectionIndex: number) => {
    if (!completedSections.includes(sectionIndex)) {
      setCompletedSections([...completedSections, sectionIndex])
    }
  }

  const progressPercentage = (completedSections.length / module.sections.length) * 100

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Navigation />

      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Button variant="ghost" onClick={() => router.push("/learning-path")} className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Learning Path
            </Button>

            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{module.title}</h1>
                <p className="text-gray-600 mb-4">{module.description}</p>
                <div className="flex items-center gap-4">
                  <Badge variant="outline">{module.difficulty}</Badge>
                  <span className="text-sm text-gray-500">{module.estimatedTime} minutes</span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span>Progress</span>
                <span>
                  {completedSections.length}/{module.sections.length} sections
                </span>
              </div>
              <Progress value={progressPercentage} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Section Navigation */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Sections</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {module.sections.map((section, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSection(index)}
                      className={`w-full text-left p-3 rounded-lg border transition-colors ${
                        currentSection === index
                          ? "bg-blue-50 border-blue-200"
                          : "bg-white border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          {section.type === "reading" ? (
                            <BookOpen className="h-4 w-4 mr-2 text-blue-600" />
                          ) : (
                            <FileText className="h-4 w-4 mr-2 text-green-600" />
                          )}
                          <span className="text-sm font-medium">{section.title}</span>
                        </div>
                        {completedSections.includes(index) && <CheckCircle className="h-4 w-4 text-green-600" />}
                      </div>
                    </button>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    {module.sections[currentSection].type === "reading" ? (
                      <BookOpen className="mr-2 h-5 w-5 text-blue-600" />
                    ) : (
                      <FileText className="mr-2 h-5 w-5 text-green-600" />
                    )}
                    {module.sections[currentSection].title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {module.sections[currentSection].type === "reading" ? (
                    <div className="prose max-w-none">
                      <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                        {module.sections[currentSection].content}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="bg-green-50 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold text-green-900 mb-2">Quiz Coming Soon</h3>
                        <p className="text-green-700 mb-4">
                          Interactive quiz functionality will be available in the next update.
                        </p>
                        <Button variant="outline">Continue Learning</Button>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between mt-8 pt-6 border-t">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
                      disabled={currentSection === 0}
                    >
                      Previous Section
                    </Button>

                    <div className="flex gap-2">
                      {!completedSections.includes(currentSection) && (
                        <Button variant="outline" onClick={() => markSectionComplete(currentSection)}>
                          Mark Complete
                        </Button>
                      )}

                      {currentSection < module.sections.length - 1 ? (
                        <Button onClick={() => setCurrentSection(currentSection + 1)}>Next Section</Button>
                      ) : (
                        <Button
                          onClick={() => router.push("/learning-path")}
                          disabled={completedSections.length < module.sections.length}
                        >
                          Complete Module
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
