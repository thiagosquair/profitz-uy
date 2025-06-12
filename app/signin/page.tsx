"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, AlertCircle, LogIn } from "lucide-react"
import { GoogleAuthButton } from "@/components/auth/google-auth-button"
import { useToast } from "@/hooks/use-toast"
import { simulateSignIn } from "@/lib/auth-simulation"
import Image from "next/image"

export default function SignInPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      const result = await simulateSignIn(formData.email, formData.password)

      if (result.success) {
        toast({
          title: "Welcome back!",
          description: "Successfully signed in. Redirecting to your dashboard...",
        })

        // Redirect to dashboard after successful signin
        setTimeout(() => {
          router.push("/dashboard")
        }, 1500)
      } else {
        setErrors({ email: result.error || "Invalid credentials" })
        toast({
          title: "Sign in failed",
          description: result.error || "Invalid email or password. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Sign in failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleGoogleSuccess = () => {
    toast({
      title: "Google sign in successful!",
      description: "Welcome back to ProFitz. Redirecting to your dashboard...",
    })
    setTimeout(() => {
      router.push("/dashboard")
    }, 1500)
  }

  const handleDemoLogin = () => {
    setFormData({
      email: "demo@profitz.com",
      password: "demo123",
      rememberMe: false,
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[20%] left-[10%] w-[20rem] h-[20rem] rounded-full bg-purple-100 blur-[6rem] animate-pulse"></div>
        <div
          className="absolute bottom-[20%] right-[10%] w-[25rem] h-[25rem] rounded-full bg-blue-100 blur-[8rem] animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center justify-center mb-6 group">
            <div className="w-auto h-16 flex items-center">
              <Image
                src="/profitz-logo-full.png"
                alt="PROFITZ - Trading Psychology Lab"
                width={300}
                height={80}
                className="w-auto h-full group-hover:scale-105 transition-transform"
                priority
              />
            </div>
          </Link>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">Continue your trading psychology journey</p>
        </div>

        <Card className="bg-white border-gray-200 shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center text-gray-900">Sign in to your account</CardTitle>
            <CardDescription className="text-center text-gray-600">
              Enter your credentials to access your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Demo Login Button */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4">
              <p className="text-sm text-purple-700 mb-2 font-medium">🚀 Quick Demo Access</p>
              <p className="text-xs text-gray-600 mb-3">Try ProFitz instantly with our demo account</p>
              <Button
                onClick={handleDemoLogin}
                variant="outline"
                size="sm"
                className="w-full border-purple-300 text-purple-600 hover:bg-purple-50"
              >
                Use Demo Credentials
              </Button>
            </div>

            {/* Google Sign In */}
            <GoogleAuthButton mode="signin" onSuccess={handleGoogleSuccess} />

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or continue with email</span>
              </div>
            </div>

            {/* Sign In Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`bg-white border-gray-300 text-gray-900 focus:border-purple-500 focus:ring-purple-500 transition-colors ${
                    errors.email ? "border-red-500" : ""
                  }`}
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-gray-700">
                    Password
                  </Label>
                  <Link href="/forgot-password" className="text-sm text-purple-600 hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className={`bg-white border-gray-300 text-gray-900 focus:border-purple-500 focus:ring-purple-500 transition-colors pr-10 ${
                      errors.password ? "border-red-500" : ""
                    }`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-purple-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Remember Me */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="rememberMe"
                  checked={formData.rememberMe}
                  onCheckedChange={(checked) => handleInputChange("rememberMe", checked as boolean)}
                  className="border-gray-400 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                />
                <label htmlFor="rememberMe" className="text-sm text-gray-700 cursor-pointer">
                  Remember me for 30 days
                </label>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 font-semibold py-6 transition-all duration-300 hover:scale-105 group relative overflow-hidden"
                disabled={isLoading}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center justify-center space-x-2">
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Signing you in...</span>
                    </>
                  ) : (
                    <>
                      <LogIn className="h-5 w-5" />
                      <span>Sign In</span>
                    </>
                  )}
                </div>
              </Button>
            </form>

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link href="/signup" className="text-purple-600 hover:underline font-medium">
                  Sign up for free
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
