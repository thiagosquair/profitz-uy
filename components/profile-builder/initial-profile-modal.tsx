"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, ArrowRight, CheckCircle, Target } from "lucide-react"
import { useRouter } from "next/navigation"
import { completeInitialProfile } from "@/lib/auth-simulation"

export type TradingExperience = "< 1 year" | "1-3 years" | "3-5 years" | "5+ years"
export type TradingInstrument = "Stocks" | "Options" | "Forex" | "Crypto" | "Futures" | "Other"
export type TradingGoal = "Income Generation" | "Wealth Building" | "Learning" | "Career Change" | "Side Hustle"

interface InitialProfileData {
  experience: TradingExperience | null
  instruments: TradingInstrument[]
  goals: TradingGoal[]
  timeCommitment: string
}

interface InitialProfileModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function InitialProfileModal({ open, onOpenChange }: InitialProfileModalProps) {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [profileData, setProfileData] = useState<InitialProfileData>({
    experience: null,
    instruments: [],
    goals: [],
    timeCommitment: "",
  })

  const handleExperienceSelect = (experience: TradingExperience) => {
    setProfileData((prev) => ({ ...prev, experience }))
    setStep(1)
  }

  const handleInstrumentToggle = (instrument: TradingInstrument) => {
    setProfileData((prev) => {
      const instruments = prev.instruments.includes(instrument)
        ? prev.instruments.filter((i) => i !== instrument)
        : [...prev.instruments, instrument]
      return { ...prev, instruments }
    })
  }

  const handleGoalToggle = (goal: TradingGoal) => {
    setProfileData((prev) => {
      const goals = prev.goals.includes(goal) ? prev.goals.filter((g) => g !== goal) : [...prev.goals, goal]
      return { ...prev, goals }
    })
  }

  const handleComplete = () => {
    // Save profile data
    console.log("Initial profile data:", profileData)

    // Mark as completed
    completeInitialProfile()

    // Close modal and redirect to dashboard
    onOpenChange(false)
    router.push("/dashboard")
  }

  const progress = ((step + 1) / 4) * 100

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 bg-[#1A1A1A] border-gray-800 overflow-hidden">
        {/* Progress bar */}
        <div className="w-full h-1 bg-gray-800">
          <div className="h-full bg-[#FFD700] transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[#FFD700] rounded-lg flex items-center justify-center">
              <Brain className="h-5 w-5 text-[#1A1A1A]" />
            </div>
            <span className="text-lg font-bold text-[#FFD700]">ProFitz</span>
          </div>
          <Badge className="bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30">Welcome Setup</Badge>
        </div>

        <div className="p-6">
          {/* Step 0: Experience */}
          {step === 0 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-2">Welcome to ProFitz!</h2>
                <p className="text-gray-300">Let's start with your trading experience level</p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {(["< 1 year", "1-3 years", "3-5 years", "5+ years"] as TradingExperience[]).map((exp) => (
                  <Button
                    key={exp}
                    variant="outline"
                    className="h-16 text-left justify-start border-gray-700 hover:border-[#FFD700]/50 hover:bg-[#FFD700]/10 transition-all"
                    onClick={() => handleExperienceSelect(exp)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 rounded-full bg-[#FFD700]/50" />
                      <div>
                        <div className="font-medium text-white">{exp}</div>
                        <div className="text-sm text-gray-400">
                          {exp === "< 1 year" && "Just getting started"}
                          {exp === "1-3 years" && "Building experience"}
                          {exp === "3-5 years" && "Developing expertise"}
                          {exp === "5+ years" && "Experienced trader"}
                        </div>
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Step 1: Instruments */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-2">What do you trade?</h2>
                <p className="text-gray-300">Select all that apply (you can change this later)</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {(["Stocks", "Options", "Forex", "Crypto", "Futures", "Other"] as TradingInstrument[]).map(
                  (instrument) => (
                    <Button
                      key={instrument}
                      variant={profileData.instruments.includes(instrument) ? "default" : "outline"}
                      className={`h-16 ${
                        profileData.instruments.includes(instrument)
                          ? "bg-[#FFD700]/20 border-[#FFD700] text-[#FFD700]"
                          : "border-gray-700 hover:border-[#FFD700]/50 hover:bg-[#FFD700]/10"
                      } transition-all`}
                      onClick={() => handleInstrumentToggle(instrument)}
                    >
                      <div className="flex items-center space-x-2">
                        {profileData.instruments.includes(instrument) && <CheckCircle className="h-4 w-4" />}
                        <span className="font-medium">{instrument}</span>
                      </div>
                    </Button>
                  ),
                )}
              </div>

              <div className="flex justify-between">
                <Button variant="ghost" onClick={() => setStep(0)} className="text-gray-400">
                  Back
                </Button>
                <Button
                  onClick={() => setStep(2)}
                  disabled={profileData.instruments.length === 0}
                  className="bg-[#FFD700]/20 text-[#FFD700] hover:bg-[#FFD700]/30 border border-[#FFD700]/30"
                >
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Goals */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-2">What are your trading goals?</h2>
                <p className="text-gray-300">Select your primary objectives</p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {(
                  ["Income Generation", "Wealth Building", "Learning", "Career Change", "Side Hustle"] as TradingGoal[]
                ).map((goal) => (
                  <Button
                    key={goal}
                    variant={profileData.goals.includes(goal) ? "default" : "outline"}
                    className={`h-16 text-left justify-start ${
                      profileData.goals.includes(goal)
                        ? "bg-[#FFD700]/20 border-[#FFD700] text-[#FFD700]"
                        : "border-gray-700 hover:border-[#FFD700]/50 hover:bg-[#FFD700]/10"
                    } transition-all`}
                    onClick={() => handleGoalToggle(goal)}
                  >
                    <div className="flex items-center space-x-3">
                      {profileData.goals.includes(goal) ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-gray-500" />
                      )}
                      <div>
                        <div className="font-medium">{goal}</div>
                        <div className="text-sm text-gray-400">
                          {goal === "Income Generation" && "Generate consistent monthly income"}
                          {goal === "Wealth Building" && "Build long-term wealth"}
                          {goal === "Learning" && "Learn and improve trading skills"}
                          {goal === "Career Change" && "Transition to full-time trading"}
                          {goal === "Side Hustle" && "Supplement existing income"}
                        </div>
                      </div>
                    </div>
                  </Button>
                ))}
              </div>

              <div className="flex justify-between">
                <Button variant="ghost" onClick={() => setStep(1)} className="text-gray-400">
                  Back
                </Button>
                <Button
                  onClick={() => setStep(3)}
                  disabled={profileData.goals.length === 0}
                  className="bg-[#FFD700]/20 text-[#FFD700] hover:bg-[#FFD700]/30 border border-[#FFD700]/30"
                >
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Completion */}
          {step === 3 && (
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 bg-[#FFD700]/20 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="h-8 w-8 text-[#FFD700]" />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-2">You're all set!</h2>
                <p className="text-gray-300">
                  Your initial profile is complete. You can now explore ProFitz and take the psychology assessment when
                  you're ready.
                </p>
              </div>

              <Card className="bg-[#121212] border-gray-800">
                <CardHeader>
                  <CardTitle className="text-[#FFD700] flex items-center">
                    <Target className="h-5 w-5 mr-2" />
                    Next Steps
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-left">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#FFD700] rounded-full" />
                    <span className="text-gray-300">Explore your personalized dashboard</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#FFD700] rounded-full" />
                    <span className="text-gray-300">Take the trading psychology assessment</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#FFD700] rounded-full" />
                    <span className="text-gray-300">Start your first exercise or reflection</span>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-between">
                <Button variant="ghost" onClick={() => setStep(2)} className="text-gray-400">
                  Back
                </Button>
                <Button
                  onClick={handleComplete}
                  className="bg-[#FFD700] text-[#1A1A1A] hover:bg-[#FFD700]/90 font-semibold"
                >
                  Enter ProFitz
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
