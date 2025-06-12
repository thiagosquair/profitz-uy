"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, ArrowLeft, Mail, CheckCircle, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ForgotPasswordPage() {
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)
  const [error, setError] = useState("")

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email.trim()) {
      setError("Email is required")
      return
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setIsEmailSent(true)
      toast({
        title: "Reset email sent!",
        description: "Check your inbox for password reset instructions.",
      })
    } catch (error) {
      toast({
        title: "Failed to send reset email",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (value: string) => {
    setEmail(value)
    if (error) {
      setError("")
    }
  }

  if (isEmailSent) {
    return (
      <div className="min-h-screen bg-[#1A1A1A] flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[20%] left-[10%] w-[20rem] h-[20rem] rounded-full bg-[#FFD700]/5 blur-[6rem] animate-pulse"></div>
          <div
            className="absolute bottom-[20%] right-[10%] w-[25rem] h-[25rem] rounded-full bg-[#FFD700]/5 blur-[8rem] animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="w-full max-w-md relative z-10">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center space-x-2 mb-6 group">
              <div className="w-12 h-12 bg-[#FFD700] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Brain className="h-7 w-7 text-[#1A1A1A]" />
              </div>
              <span className="text-2xl font-bold text-[#FFD700]">ProFitz</span>
            </Link>
          </div>

          <Card className="bg-[#1A1A1A] border-gray-800 shadow-2xl">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-[#FFD700]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-8 w-8 text-[#FFD700]" />
              </div>
              <h1 className="text-2xl font-bold text-[#F5F5F5] mb-4">Check your email</h1>
              <p className="text-gray-400 mb-6">
                We've sent password reset instructions to <span className="text-[#FFD700]">{email}</span>
              </p>
              <div className="space-y-4">
                <Button
                  onClick={() => setIsEmailSent(false)}
                  variant="outline"
                  className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  Try different email
                </Button>
                <Link href="/signin">
                  <Button className="w-full bg-[#FFD700] text-[#1A1A1A] hover:bg-[#FFD700]/90">Back to sign in</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#1A1A1A] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[20%] left-[10%] w-[20rem] h-[20rem] rounded-full bg-[#FFD700]/5 blur-[6rem] animate-pulse"></div>
        <div
          className="absolute bottom-[20%] right-[10%] w-[25rem] h-[25rem] rounded-full bg-[#FFD700]/5 blur-[8rem] animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6 group">
            <div className="w-12 h-12 bg-[#FFD700] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Brain className="h-7 w-7 text-[#1A1A1A]" />
            </div>
            <span className="text-2xl font-bold text-[#FFD700]">ProFitz</span>
          </Link>
          <h1 className="text-3xl font-bold text-[#F5F5F5] mb-2">Reset your password</h1>
          <p className="text-gray-400">Enter your email and we'll send you reset instructions</p>
        </div>

        <Card className="bg-[#1A1A1A] border-gray-800 shadow-2xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center text-[#F5F5F5]">Forgot your password?</CardTitle>
            <CardDescription className="text-center text-gray-400">No worries, we'll help you reset it</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">
                  Email address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => handleInputChange(e.target.value)}
                  className={`bg-gray-900 border-gray-700 text-[#F5F5F5] focus:border-[#FFD700] transition-colors ${
                    error ? "border-red-500" : ""
                  }`}
                  placeholder="Enter your email address"
                />
                {error && (
                  <p className="text-red-400 text-sm flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {error}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-[#FFD700] text-[#1A1A1A] hover:bg-[#FFD700]/90 font-semibold py-6 transition-all duration-300 hover:scale-105 group relative overflow-hidden"
                disabled={isLoading}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700] to-[#FFA000] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center justify-center space-x-2">
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-[#1A1A1A] border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending reset email...</span>
                    </>
                  ) : (
                    <>
                      <Mail className="h-5 w-5" />
                      <span>Send reset instructions</span>
                    </>
                  )}
                </div>
              </Button>
            </form>

            <div className="text-center">
              <Link href="/signin" className="inline-flex items-center text-[#FFD700] hover:underline font-medium">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
