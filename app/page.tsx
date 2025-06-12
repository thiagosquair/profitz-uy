import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Brain,
  TrendingUp,
  Target,
  Star,
  ArrowRight,
  BarChart3,
  BookOpen,
  Camera,
  Sparkles,
  Zap,
  Users,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#1A1A1A] text-[#F5F5F5] overflow-hidden">
      {/* Header */}
      <header className="border-b border-gray-800 bg-[#1A1A1A]/95 backdrop-blur supports-[backdrop-filter]:bg-[#1A1A1A]/60 relative z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-[#FFD700]" />
            <span className="text-xl font-bold">ProFitz</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#features" className="text-gray-300 hover:text-[#FFD700] transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-gray-300 hover:text-[#FFD700] transition-colors">
              How It Works
            </Link>
            <Link href="#testimonials" className="text-gray-300 hover:text-[#FFD700] transition-colors">
              Testimonials
            </Link>
            <Link href="/signin">
              <Button
                variant="outline"
                className="border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-[#1A1A1A]"
              >
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-[#FFD700] text-[#1A1A1A] hover:bg-[#FFD700]/90">Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section with animated gradient */}
      <section className="relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-[10%] left-[5%] w-[30rem] h-[30rem] rounded-full bg-[#FFD700]/5 blur-[8rem] animate-pulse"></div>
          <div
            className="absolute top-[40%] right-[10%] w-[25rem] h-[25rem] rounded-full bg-[#FFD700]/5 blur-[8rem] animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-[10%] left-[20%] w-[20rem] h-[20rem] rounded-full bg-[#FFD700]/5 blur-[8rem] animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="container mx-auto px-6 py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center mb-6">
              <Badge className="bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30 px-4 py-1 text-sm">
                <Sparkles className="h-4 w-4 mr-2" />
                Transform Your Trading Psychology
              </Badge>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#F5F5F5] via-[#FFD700] to-[#F5F5F5] bg-clip-text text-transparent">
              Welcome to Your Trading Evolution
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Your fully immersive, AI-powered trading ecosystem where every tool, insight, and psychological
              support system is seamlessly integrated—designed to help you stay centered, focused, and consistently
              successful.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="bg-[#FFD700] text-[#1A1A1A] hover:bg-[#FFD700]/90 font-semibold px-8 py-6 text-lg rounded-xl transition-all duration-300 hover:scale-105"
                >
                  Begin Your Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-6 text-lg rounded-xl transition-all duration-300 hover:scale-105"
              >
                <Zap className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute bottom-[-5%] left-[10%] transform rotate-12 opacity-30 animate-float">
          <div className="w-24 h-24 bg-gradient-to-br from-[#FFD700]/30 to-[#FFD700]/30 rounded-xl"></div>
        </div>
        <div className="absolute top-[20%] right-[5%] transform -rotate-12 opacity-30 animate-float-delayed">
          <div className="w-16 h-16 bg-gradient-to-br from-[#FFD700]/30 to-[#FFD700]/30 rounded-xl"></div>
        </div>
      </section>

      {/* Features Section with cards that "glow" on hover */}
      <section id="features" className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30 px-4 py-1">
              The ProFitz Experience
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Your Immersive Trading Environment</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              ProFitz creates a space where transformation happens naturally, guiding you through a journey of
              self-discovery and trading mastery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group">
              <Card className="bg-[#1A1A1A] border-gray-800 hover:border-[#FFD700]/50 transition-all duration-500 h-full overflow-hidden relative hover:shadow-[0_0_30px_rgba(255,215,0,0.15)] rounded-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/0 to-[#FFD700]/0 group-hover:from-[#FFD700]/5 group-hover:to-[#FFD700]/10 transition-all duration-500"></div>
                <CardContent className="p-8 relative z-10">
                  <div className="mb-6 p-3 bg-[#FFD700]/10 rounded-xl inline-flex">
                    <Brain className="h-8 w-8 text-[#FFD700]" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-[#F5F5F5] group-hover:text-[#FFD700] transition-colors duration-300">
                    AI Psychology Coach
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    Your personal guide on this journey, understanding your unique trading psychology and providing
                    tailored guidance when you need it most.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="group">
              <Card className="bg-[#1A1A1A] border-gray-800 hover:border-[#FFD700]/50 transition-all duration-500 h-full overflow-hidden relative hover:shadow-[0_0_30px_rgba(255,215,0,0.15)] rounded-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/0 to-[#FFD700]/0 group-hover:from-[#FFD700]/5 group-hover:to-[#FFD700]/10 transition-all duration-500"></div>
                <CardContent className="p-8 relative z-10">
                  <div className="mb-6 p-3 bg-[#FFD700]/10 rounded-xl inline-flex">
                    <Camera className="h-8 w-8 text-[#FFD700]" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-[#F5F5F5] group-hover:text-[#FFD700] transition-colors duration-300">
                    Trade Analysis Insights
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    Transform your past trades into powerful lessons through AI-powered analysis that reveals patterns
                    in both market conditions and your emotional responses.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="group">
              <Card className="bg-[#1A1A1A] border-gray-800 hover:border-[#FFD700]/50 transition-all duration-500 h-full overflow-hidden relative hover:shadow-[0_0_30px_rgba(255,215,0,0.15)] rounded-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/0 to-[#FFD700]/0 group-hover:from-[#FFD700]/5 group-hover:to-[#FFD700]/10 transition-all duration-500"></div>
                <CardContent className="p-8 relative z-10">
                  <div className="mb-6 p-3 bg-[#FFD700]/10 rounded-xl inline-flex">
                    <BarChart3 className="h-8 w-8 text-[#FFD700]" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-[#F5F5F5] group-hover:text-[#FFD700] transition-colors duration-300">
                    Market Context Integration
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    See how market conditions influence your decisions with real-time data integration that provides the
                    full picture of your trading environment.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="group">
              <Card className="bg-[#1A1A1A] border-gray-800 hover:border-[#FFD700]/50 transition-all duration-500 h-full overflow-hidden relative hover:shadow-[0_0_30px_rgba(255,215,0,0.15)] rounded-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/0 to-[#FFD700]/0 group-hover:from-[#FFD700]/5 group-hover:to-[#FFD700]/10 transition-all duration-500"></div>
                <CardContent className="p-8 relative z-10">
                  <div className="mb-6 p-3 bg-[#FFD700]/10 rounded-xl inline-flex">
                    <Target className="h-8 w-8 text-[#FFD700]" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-[#F5F5F5] group-hover:text-[#FFD700] transition-colors duration-300">
                    Behavioral Pattern Recognition
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    Discover the hidden patterns in your trading behavior and transform limiting habits into empowering
                    routines that support consistent success.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="group">
              <Card className="bg-[#1A1A1A] border-gray-800 hover:border-[#FFD700]/50 transition-all duration-500 h-full overflow-hidden relative hover:shadow-[0_0_30px_rgba(255,215,0,0.15)] rounded-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/0 to-[#FFD700]/0 group-hover:from-[#FFD700]/5 group-hover:to-[#FFD700]/10 transition-all duration-500"></div>
                <CardContent className="p-8 relative z-10">
                  <div className="mb-6 p-3 bg-[#FFD700]/10 rounded-xl inline-flex">
                    <BookOpen className="h-8 w-8 text-[#FFD700]" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-[#F5F5F5] group-hover:text-[#FFD700] transition-colors duration-300">
                    Immersive Learning Experience
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    Engage with interactive exercises and personalized content that adapts to your learning style and
                    trading challenges.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="group">
              <Card className="bg-[#1A1A1A] border-gray-800 hover:border-[#FFD700]/50 transition-all duration-500 h-full overflow-hidden relative hover:shadow-[0_0_30px_rgba(255,215,0,0.15)] rounded-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/0 to-[#FFD700]/0 group-hover:from-[#FFD700]/5 group-hover:to-[#FFD700]/10 transition-all duration-500"></div>
                <CardContent className="p-8 relative z-10">
                  <div className="mb-6 p-3 bg-[#FFD700]/10 rounded-xl inline-flex">
                    <TrendingUp className="h-8 w-8 text-[#FFD700]" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-[#F5F5F5] group-hover:text-[#FFD700] transition-colors duration-300">
                    Transformative Progress Tracking
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    Visualize your growth journey with engaging analytics that celebrate your wins and highlight your
                    evolution as a trader.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Section with flowing path */}
      <section id="how-it-works" className="py-20 relative overflow-hidden bg-[#121212]">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30 px-4 py-1">
              Your Transformation Path
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">The Journey to Trading Mastery</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Every great trader has a story of transformation. Yours begins here.
            </p>
          </div>

          <div className="relative">
            {/* Path line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#FFD700] via-[#FFD700]/70 to-[#FFD700]/50 hidden md:block"></div>

            <div className="space-y-24 relative">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 mb-8 md:mb-0 md:text-right">
                  <h3 className="text-2xl font-bold mb-4 text-[#FFD700]">Discover Your Trading Self</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Begin with a comprehensive assessment that reveals your unique trading psychology profile,
                    strengths, and areas for growth.
                  </p>
                </div>
                <div className="md:w-12 relative flex justify-center">
                  <div className="w-12 h-12 bg-[#FFD700] rounded-full flex items-center justify-center z-10">
                    <span className="text-xl font-bold text-[#1A1A1A]">1</span>
                  </div>
                </div>
                <div className="md:w-1/2 md:pl-12 md:opacity-0"></div>
              </div>

              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 md:opacity-0 mb-8 md:mb-0"></div>
                <div className="md:w-12 relative flex justify-center">
                  <div className="w-12 h-12 bg-[#FFD700] rounded-full flex items-center justify-center z-10">
                    <span className="text-xl font-bold text-[#1A1A1A]">2</span>
                  </div>
                </div>
                <div className="md:w-1/2 md:pl-12">
                  <h3 className="text-2xl font-bold mb-4 text-[#FFD700]">Personalized Growth Path</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Receive a customized development journey with AI-selected exercises, coaching sessions, and
                    resources tailored specifically to your needs.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 mb-8 md:mb-0 md:text-right">
                  <h3 className="text-2xl font-bold mb-4 text-[#FFD700]">Immersive Practice</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Engage with daily exercises, AI coaching sessions, and trade analysis in an environment designed to
                    make learning feel natural and enjoyable.
                  </p>
                </div>
                <div className="md:w-12 relative flex justify-center">
                  <div className="w-12 h-12 bg-[#FFD700] rounded-full flex items-center justify-center z-10">
                    <span className="text-xl font-bold text-[#1A1A1A]">3</span>
                  </div>
                </div>
                <div className="md:w-1/2 md:pl-12 md:opacity-0"></div>
              </div>

              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 md:opacity-0 mb-8 md:mb-0"></div>
                <div className="md:w-12 relative flex justify-center">
                  <div className="w-12 h-12 bg-[#FFD700] rounded-full flex items-center justify-center z-10">
                    <span className="text-xl font-bold text-[#1A1A1A]">4</span>
                  </div>
                </div>
                <div className="md:w-1/2 md:pl-12">
                  <h3 className="text-2xl font-bold mb-4 text-[#FFD700]">Trading Mastery</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Experience the transformation as improved emotional control, disciplined decision-making, and
                    consistent profitability become your new normal.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="testimonials" className="py-20 bg-[#1A1A1A] relative">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] opacity-5 mix-blend-overlay"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30 px-4 py-1">
              <Users className="h-4 w-4 mr-2" />
              Trading Community
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">You're Not Alone on This Journey</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Connect with fellow traders who understand your challenges and celebrate your victories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-[#1A1A1A] border-gray-800 rounded-xl overflow-hidden">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-[#FFD700] fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 text-lg mb-6 italic">
                  "ProFitz created a space where I actually enjoy working on my trading psychology. The immersive
                  experience makes me look forward to my daily practice."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-[#FFD700] rounded-full flex items-center justify-center mr-4">
                    <span className="font-bold text-[#1A1A1A]">MK</span>
                  </div>
                  <div>
                    <p className="font-semibold">Michael K.</p>
                    <p className="text-sm text-gray-400">Day Trader, 5 years experience</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#1A1A1A] border-gray-800 rounded-xl overflow-hidden">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-[#FFD700] fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 text-lg mb-6 italic">
                  "The environment ProFitz creates is transformative. I feel like I'm stepping into a different world
                  where I can truly focus on becoming the trader I want to be."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-[#FFD700] rounded-full flex items-center justify-center mr-4">
                    <span className="font-bold text-[#1A1A1A]">SR</span>
                  </div>
                  <div>
                    <p className="font-semibold">Sarah R.</p>
                    <p className="text-sm text-gray-400">Swing Trader, 8 years experience</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#1A1A1A] border-gray-800 rounded-xl overflow-hidden">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-[#FFD700] fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 text-lg mb-6 italic">
                  "I've tried other trading psychology programs, but ProFitz is the first one that feels like a journey
                  rather than a chore. The immersive approach makes all the difference."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-[#FFD700] rounded-full flex items-center justify-center mr-4">
                    <span className="font-bold text-[#1A1A1A]">DL</span>
                  </div>
                  <div>
                    <p className="font-semibold">David L.</p>
                    <p className="text-sm text-gray-400">Options Trader, 12 years experience</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section with particles */}
      <section className="py-24 relative overflow-hidden bg-[#121212]">
        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#FFD700] rounded-full animate-float opacity-60"></div>
          <div className="absolute top-3/4 left-1/3 w-3 h-3 bg-[#FFD700] rounded-full animate-float-delayed opacity-40"></div>
          <div className="absolute top-1/2 left-2/3 w-2 h-2 bg-[#FFD700] rounded-full animate-float opacity-50"></div>
          <div className="absolute top-1/3 left-3/4 w-1 h-1 bg-[#FFD700] rounded-full animate-float-delayed opacity-70"></div>
          <div className="absolute top-2/3 left-1/5 w-2 h-2 bg-[#FFD700] rounded-full animate-float opacity-30"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30 px-4 py-1">
              <Sparkles className="h-4 w-4 mr-2" />
              Begin Your Transformation
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Trading?</h2>
            <p className="text-xl text-gray-400 mb-8">
              Step into the ProFitz environment and experience the difference an immersive approach to trading
              psychology can make.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="bg-[#FFD700] text-[#1A1A1A] hover:bg-[#FFD700]/90 font-semibold px-8 py-6 text-lg rounded-xl transition-all duration-300 hover:scale-105 group"
                >
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-6 text-lg rounded-xl transition-all duration-300 hover:scale-105"
              >
                Schedule Demo
              </Button>
            </div>
            <div className="mt-8 flex items-center justify-center space-x-4">
              <CheckCircle className="h-5 w-5 text-[#FFD700]" />
              <p className="text-gray-400">No credit card required • 14-day free trial • Cancel anytime</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#121212] border-t border-gray-800 py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-[#FFD700] rounded-lg flex items-center justify-center">
                  <Brain className="h-6 w-6 text-[#1A1A1A]" />
                </div>
                <h3 className="text-xl font-bold text-[#FFD700]">ProFitz</h3>
              </div>
              <p className="text-gray-400 mb-4">Your immersive environment for trading psychology transformation.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-[#FFD700]">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/features" className="hover:text-[#FFD700] transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-[#FFD700] transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/demo" className="hover:text-[#FFD700] transition-colors">
                    Demo
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-[#FFD700]">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/blog" className="hover:text-[#FFD700] transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/guides" className="hover:text-[#FFD700] transition-colors">
                    Trading Guides
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="hover:text-[#FFD700] transition-colors">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-[#FFD700]">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-[#FFD700] transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-[#FFD700] transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-[#FFD700] transition-colors">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ProFitz. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
