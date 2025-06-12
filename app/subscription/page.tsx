"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Crown, Zap, Star, Sparkles } from "lucide-react"

interface PlanFeature {
  name: string
  included: boolean
}

interface SubscriptionPlan {
  id: string
  name: string
  description: string
  price: string
  period: string
  features: PlanFeature[]
  popular: boolean
  icon: React.ElementType
  color: string
  buttonText: string
}

export default function SubscriptionPage() {
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null)

  const plans: SubscriptionPlan[] = [
    {
      id: "free",
      name: "Free",
      description: "Basic trading psychology tools to get started",
      price: "$0",
      period: "forever",
      popular: false,
      icon: Star,
      color: "bg-gray-100 text-gray-800",
      buttonText: "Current Plan",
      features: [
        { name: "Basic trading journal", included: true },
        { name: "Limited AI analysis (3/month)", included: true },
        { name: "Community access", included: true },
        { name: "Basic learning materials", included: true },
        { name: "Email support", included: true },
        { name: "Advanced AI coaching", included: false },
        { name: "Pattern recognition", included: false },
        { name: "Personalized learning path", included: false },
        { name: "Priority support", included: false },
        { name: "Advanced analytics", included: false },
      ],
    },
    {
      id: "pro",
      name: "Pro",
      description: "Enhanced tools for serious traders",
      price: "$19.99",
      period: "per month",
      popular: true,
      icon: Zap,
      color: "bg-blue-600 text-white",
      buttonText: "Upgrade to Pro",
      features: [
        { name: "Advanced trading journal", included: true },
        { name: "Unlimited AI analysis", included: true },
        { name: "Community access", included: true },
        { name: "Full learning materials", included: true },
        { name: "Priority email support", included: true },
        { name: "Basic AI coaching", included: true },
        { name: "Basic pattern recognition", included: true },
        { name: "Personalized learning path", included: false },
        { name: "1-on-1 coaching sessions", included: false },
        { name: "Advanced analytics", included: false },
      ],
    },
    {
      id: "premium",
      name: "Premium",
      description: "Professional tools for dedicated traders",
      price: "$39.99",
      period: "per month",
      popular: false,
      icon: Crown,
      color: "bg-purple-600 text-white",
      buttonText: "Upgrade to Premium",
      features: [
        { name: "Advanced trading journal", included: true },
        { name: "Unlimited AI analysis", included: true },
        { name: "Community access", included: true },
        { name: "Full learning materials", included: true },
        { name: "24/7 priority support", included: true },
        { name: "Advanced AI coaching", included: true },
        { name: "Advanced pattern recognition", included: true },
        { name: "Personalized learning path", included: true },
        { name: "Monthly 1-on-1 coaching", included: true },
        { name: "Advanced analytics", included: false },
      ],
    },
    {
      id: "master",
      name: "Master",
      description: "Ultimate trading psychology mastery",
      price: "$99.99",
      period: "per month",
      popular: false,
      icon: Sparkles,
      color: "bg-gradient-to-r from-amber-500 to-orange-600 text-white",
      buttonText: "Upgrade to Master",
      features: [
        { name: "Advanced trading journal", included: true },
        { name: "Unlimited AI analysis", included: true },
        { name: "VIP community access", included: true },
        { name: "Full learning materials + exclusives", included: true },
        { name: "24/7 dedicated support", included: true },
        { name: "Advanced AI coaching", included: true },
        { name: "Advanced pattern recognition", included: true },
        { name: "Custom learning path", included: true },
        { name: "Weekly 1-on-1 coaching", included: true },
        { name: "Advanced analytics dashboard", included: true },
      ],
    },
  ]

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Navigation />

      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Subscription Plans</h1>
            <p className="text-gray-600">
              Choose the plan that best fits your trading journey and psychology development needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`border overflow-hidden transition-all duration-300 ${
                  hoveredPlan === plan.id
                    ? "shadow-lg transform -translate-y-2 border-blue-300"
                    : "shadow-md"
                } ${plan.popular ? "ring-2 ring-blue-500" : ""}`}
                onMouseEnter={() => setHoveredPlan(plan.id)}
                onMouseLeave={() => setHoveredPlan(null)}
              >
                <div className={`${plan.color} p-4`}>
                  <div className="flex justify-between items-center">
                    <plan.icon className="h-6 w-6" />
                    {plan.popular && (
                      <Badge className="bg-white text-blue-600 hover:bg-blue-50">Most Popular</Badge>
                    )}
                  </div>
                  <h3 className="mt-2 text-xl font-bold">{plan.name}</h3>
                  <p className="text-sm opacity-90">{plan.description}</p>
                </div>

                <CardHeader>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="ml-1 text-gray-500">/{plan.period}</span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        {feature.included ? (
                          <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        ) : (
                          <div className="h-4 w-4 border border-gray-300 rounded-full mr-2 flex-shrink-0" />
                        )}
                        <span
                          className={`text-sm ${
                            feature.included ? "text-gray-700" : "text-gray-400"
                          }`}
                        >
                          {feature.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>

                <CardFooter>
                  <Button
                    className={`w-full transition-all duration-300 ${
                      hoveredPlan === plan.id
                        ? plan.id === "free"
                          ? "bg-gray-700 hover:bg-gray-800"
                          : plan.id === "pro"
                          ? "bg-blue-700 hover:bg-blue-800"
                          : plan.id === "premium"
                          ? "bg-purple-700 hover:bg-purple-800"
                          : "bg-gradient-to-r from-amber-600 to-orange-700"
                        : plan.id === "free"
                        ? "bg-gray-600"
                        : plan.id === "pro"
                        ? "bg-blue-600"
                        : plan.id === "premium"
                        ? "bg-purple-600"
                        : "bg-gradient-to-r from-amber-500 to-orange-600"
                    }`}
                  >
                    {plan.buttonText}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-12 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900">Can I change plans later?</h3>
                <p className="text-gray-600 text-sm mt-1">
                  Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Is there a free trial for paid plans?</h3>
                <p className="text-gray-600 text-sm mt-1">
                  All paid plans come with a 7-day free trial. You won't be charged until the trial period ends.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">How do the coaching sessions work?</h3>
                <p className="text-gray-600 text-sm mt-1">
                  Coaching sessions are conducted via video call with our expert trading psychologists. You'll receive a link to schedule your session based on your plan's allocation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
