// app/page.tsx - Updated with translations
"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, TrendingUp, Target, Star, ArrowRight, BarChart3, BookOpen, Camera } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { useTranslation } from "react-i18next"

export default function HomePage() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />
      
      {/* Hero Section */}
      <section
        className="relative overflow-hidden bg-cover bg-center bg-no-repeat pt-20"
        style={{ backgroundImage: "url(/hero-ai-background.png)" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 to-purple-900/70" />
        <div className="container mx-auto px-6 py-20 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-white/90 backdrop-blur-sm text-blue-700 border-blue-200">
              {t("hero_badge")}
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-lg">
              {t("hero_title")}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed drop-shadow-md">
              {t("hero_description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-4 text-lg shadow-lg"
                >
                  {t("hero_button_journey")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg backdrop-blur-sm"
              >
                {t("hero_button_demo")}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 bg-white" id="features">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 border-purple-200">
              {t("experience_badge")}
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {t("experience_title")}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("experience_description")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 group">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-gray-900">{t("feature_ai_coach_title")}</CardTitle>
                <CardDescription className="text-gray-600">
                  {t("feature_ai_coach_description")}
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="bg-white border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300 group">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Camera className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-gray-900">{t("feature_screenshot_analysis_title")}</CardTitle>
                <CardDescription className="text-gray-600">
                  {t("feature_screenshot_analysis_description")}
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="bg-white border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 group">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-gray-900">{t("feature_market_data_title")}</CardTitle>
                <CardDescription className="text-gray-600">
                  {t("feature_market_data_description")}
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="bg-white border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300 group">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-gray-900">{t("feature_behavioral_title")}</CardTitle>
                <CardDescription className="text-gray-600">
                  {t("feature_behavioral_description")}
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="bg-white border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 group">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-gray-900">{t("feature_interactive_exercises_title")}</CardTitle>
                <CardDescription className="text-gray-600">
                  {t("feature_interactive_exercises_description")}
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="bg-white border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300 group">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-gray-900">{t("feature_progress_tracking_title")}</CardTitle>
                <CardDescription className="text-gray-600">
                  {t("feature_progress_tracking_description")}
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50" id="how-it-works">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t("how_it_works_title")}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("how_it_works_description")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <span className="text-2xl font-bold text-white">{t("step_1_title")}</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Assessment</h3>
              <p className="text-gray-600">
                {t("step_1_description")}
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <span className="text-2xl font-bold text-white">{t("step_2_title")}</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Personalization</h3>
              <p className="text-gray-600">
                {t("step_2_description")}
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <span className="text-2xl font-bold text-white">{t("step_3_title")}</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Practice</h3>
              <p className="text-gray-600">
                {t("step_3_description")}
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <span className="text-2xl font-bold text-white">{t("step_4_title")}</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Mastery</h3>
              <p className="text-gray-600">
                {t("step_4_description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white" id="testimonials">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {t("testimonials_title")}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("testimonials_description")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
              <CardHeader>
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <CardDescription className="text-gray-700 text-lg italic">
                  {t("testimonial_1_description")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-gray-900 font-semibold">{t("testimonial_1_name")}</div>
                <div className="text-gray-600">{t("testimonial_1_role")}</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
              <CardHeader>
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <CardDescription className="text-gray-700 text-lg italic">
                  {t("testimonial_2_description")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-gray-900 font-semibold">{t("testimonial_2_name")}</div>
                <div className="text-gray-600">{t("testimonial_2_role")}</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
              <CardHeader>
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <CardDescription className="text-gray-700 text-lg italic">
                  {t("testimonial_3_description")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-gray-900 font-semibold">{t("testimonial_3_name")}</div>
                <div className="text-gray-600">{t("testimonial_3_role")}</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            {t("cta_title")}
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            {t("cta_description")}
          </p>
          <Link href="/signup">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-4 text-lg shadow-lg"
            >
              {t("cta_button")}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">
            {t("footer_copyright")}
          </p>
        </div>
      </footer>
    </div>
  )
}

