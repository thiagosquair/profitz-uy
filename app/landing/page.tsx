import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, TrendingUp, Target, Star, ArrowRight, BarChart3, BookOpen, Camera } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#1A1A1A] text-[#F5F5F5]">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/10 to-transparent" />
        <div className="container mx-auto px-6 py-20 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30">
              AI-Powered Trading Psychology
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#F5F5F5] to-[#FFD700] bg-clip-text text-transparent">
              Master Your Trading Mind
            </h1>
            <p className="text-xl md:text-2xl text-[#E0E0E0] mb-8 leading-relaxed">
              Transform your trading performance with AI-driven psychology coaching, personalized insights, and proven
              mental discipline techniques.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="bg-[#FFD700] text-[#1A1A1A] hover:bg-[#FFA000] font-semibold px-8 py-4 text-lg"
                >
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-[#E0E0E0] text-[#E0E0E0] hover:bg-[#E0E0E0] hover:text-[#1A1A1A] px-8 py-4 text-lg"
              >
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#121212]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Why Traders Choose Our Platform</h2>
            <p className="text-xl text-[#E0E0E0] max-w-3xl mx-auto">
              Combine cutting-edge AI technology with proven psychological principles to develop unshakeable trading
              discipline and consistent profitability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-[#1A1A1A] border-[#333] hover:border-[#FFD700]/50 transition-all duration-300">
              <CardHeader>
                <Brain className="h-12 w-12 text-[#FFD700] mb-4" />
                <CardTitle className="text-[#F5F5F5]">AI Psychology Coach</CardTitle>
                <CardDescription className="text-[#E0E0E0]">
                  Get personalized coaching sessions powered by advanced AI that understands trading psychology
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-[#1A1A1A] border-[#333] hover:border-[#FFD700]/50 transition-all duration-300">
              <CardHeader>
                <Camera className="h-12 w-12 text-[#FFD700] mb-4" />
                <CardTitle className="text-[#F5F5F5]">Trade Screenshot Analysis</CardTitle>
                <CardDescription className="text-[#E0E0E0]">
                  Upload your trade screenshots for AI-powered analysis with market context and emotional insights
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-[#1A1A1A] border-[#333] hover:border-[#FFD700]/50 transition-all duration-300">
              <CardHeader>
                <BarChart3 className="h-12 w-12 text-[#FFD700] mb-4" />
                <CardTitle className="text-[#F5F5F5]">Market Data Integration</CardTitle>
                <CardDescription className="text-[#E0E0E0]">
                  Real-time market context and historical data to understand how conditions affect your trading
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-[#1A1A1A] border-[#333] hover:border-[#FFD700]/50 transition-all duration-300">
              <CardHeader>
                <Target className="h-12 w-12 text-[#FFD700] mb-4" />
                <CardTitle className="text-[#F5F5F5]">Behavioral Pattern Recognition</CardTitle>
                <CardDescription className="text-[#E0E0E0]">
                  Identify and break negative trading patterns while reinforcing profitable behaviors
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-[#1A1A1A] border-[#333] hover:border-[#FFD700]/50 transition-all duration-300">
              <CardHeader>
                <BookOpen className="h-12 w-12 text-[#FFD700] mb-4" />
                <CardTitle className="text-[#F5F5F5]">Interactive Exercises</CardTitle>
                <CardDescription className="text-[#E0E0E0]">
                  Daily mental discipline exercises designed specifically for traders
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-[#1A1A1A] border-[#333] hover:border-[#FFD700]/50 transition-all duration-300">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-[#FFD700] mb-4" />
                <CardTitle className="text-[#F5F5F5]">Progress Tracking</CardTitle>
                <CardDescription className="text-[#E0E0E0]">
                  Comprehensive analytics to track your psychological development and trading improvement
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Your Path to Trading Mastery</h2>
            <p className="text-xl text-[#E0E0E0] max-w-3xl mx-auto">
              Follow our proven 4-step process to develop unshakeable trading discipline
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#FFD700] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-[#1A1A1A]">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Assessment</h3>
              <p className="text-[#E0E0E0]">
                Complete our comprehensive trading psychology assessment to identify your strengths and areas for
                improvement
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#FFD700] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-[#1A1A1A]">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Personalized Plan</h3>
              <p className="text-[#E0E0E0]">
                Receive a customized development plan with exercises and coaching sessions tailored to your needs
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#FFD700] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-[#1A1A1A]">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Daily Practice</h3>
              <p className="text-[#E0E0E0]">
                Engage with daily exercises, AI coaching sessions, and trade analysis to build mental discipline
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#FFD700] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-[#1A1A1A]">4</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Mastery</h3>
              <p className="text-[#E0E0E0]">
                Achieve consistent profitability through improved emotional control and disciplined decision-making
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-[#121212]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Trusted by Successful Traders</h2>
            <p className="text-xl text-[#E0E0E0]">See how our platform has transformed trading careers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-[#1A1A1A] border-[#333]">
              <CardHeader>
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-[#FFD700] fill-current" />
                  ))}
                </div>
                <CardDescription className="text-[#E0E0E0] text-lg">
                  "The AI coach helped me identify my revenge trading patterns. My consistency improved by 300% in just
                  3 months."
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-[#FFD700] rounded-full flex items-center justify-center mr-4">
                    <span className="font-bold text-[#1A1A1A]">MK</span>
                  </div>
                  <div>
                    <p className="font-semibold">Michael K.</p>
                    <p className="text-sm text-[#E0E0E0]">Day Trader, 5 years experience</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#1A1A1A] border-[#333]">
              <CardHeader>
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-[#FFD700] fill-current" />
                  ))}
                </div>
                <CardDescription className="text-[#E0E0E0] text-lg">
                  "The trade analysis feature is incredible. It shows me exactly how my emotions affected each trade."
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-[#FFD700] rounded-full flex items-center justify-center mr-4">
                    <span className="font-bold text-[#1A1A1A]">SR</span>
                  </div>
                  <div>
                    <p className="font-semibold">Sarah R.</p>
                    <p className="text-sm text-[#E0E0E0]">Swing Trader, 8 years experience</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#1A1A1A] border-[#333]">
              <CardHeader>
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-[#FFD700] fill-current" />
                  ))}
                </div>
                <CardDescription className="text-[#E0E0E0] text-lg">
                  "Finally broke through my profit ceiling. The psychological insights are game-changing."
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-[#FFD700] rounded-full flex items-center justify-center mr-4">
                    <span className="font-bold text-[#1A1A1A]">DL</span>
                  </div>
                  <div>
                    <p className="font-semibold">David L.</p>
                    <p className="text-sm text-[#E0E0E0]">Options Trader, 12 years experience</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Trading?</h2>
            <p className="text-xl text-[#E0E0E0] mb-8">
              Join thousands of traders who have already mastered their psychology and achieved consistent
              profitability.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="bg-[#FFD700] text-[#1A1A1A] hover:bg-[#FFA000] font-semibold px-8 py-4 text-lg"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-[#E0E0E0] text-[#E0E0E0] hover:bg-[#E0E0E0] hover:text-[#1A1A1A] px-8 py-4 text-lg"
              >
                Schedule Demo
              </Button>
            </div>
            <p className="text-sm text-[#E0E0E0] mt-4">No credit card required • 14-day free trial • Cancel anytime</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#121212] border-t border-[#333] py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-[#FFD700]">The Profitable Mind</h3>
              <p className="text-[#E0E0E0] mb-4">
                Master the mental game of trading with AI-powered psychology coaching.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-[#E0E0E0]">
                <li>
                  <Link href="/features" className="hover:text-[#FFD700]">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-[#FFD700]">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/demo" className="hover:text-[#FFD700]">
                    Demo
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-[#E0E0E0]">
                <li>
                  <Link href="/blog" className="hover:text-[#FFD700]">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/guides" className="hover:text-[#FFD700]">
                    Trading Guides
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="hover:text-[#FFD700]">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-[#E0E0E0]">
                <li>
                  <Link href="/about" className="hover:text-[#FFD700]">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-[#FFD700]">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-[#FFD700]">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#333] mt-8 pt-8 text-center text-[#E0E0E0]">
            <p>&copy; 2024 The Secrets of a Profitable Mind. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
