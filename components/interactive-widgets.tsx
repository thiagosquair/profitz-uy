"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Clock, Activity, Star, ArrowUp, ArrowDown } from "lucide-react"

interface AnimatedCounterProps {
  value: number
  duration?: number
  suffix?: string
  prefix?: string
}

export function AnimatedCounter({ value, duration = 2000, suffix = "", prefix = "" }: AnimatedCounterProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)

      setCount(Math.floor(progress * value))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [value, duration])

  return (
    <span>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

interface InteractiveStatCardProps {
  title: string
  value: number
  change: number
  icon: any
  color: string
  suffix?: string
  onClick?: () => void
}

export function InteractiveStatCard({
  title,
  value,
  change,
  icon: Icon,
  color,
  suffix = "",
  onClick,
}: InteractiveStatCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  const handleClick = () => {
    setIsClicked(true)
    setTimeout(() => setIsClicked(false), 200)
    onClick?.()
  }

  return (
    <Card
      className={`
        bg-[#1A1A1A] border-gray-800 hover:border-[#FFD700]/30 
        transition-all duration-300 cursor-pointer overflow-hidden
        ${isHovered ? "shadow-lg shadow-[#FFD700]/10 scale-105" : ""}
        ${isClicked ? "scale-95" : ""}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-gray-400 flex items-center justify-between">
          <span>{title}</span>
          <Icon
            className={`h-4 w-4 transition-all duration-300 ${
              isHovered ? `text-[${color}] rotate-12 scale-110` : "text-gray-500"
            }`}
          />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className={`text-2xl font-bold transition-colors duration-300 ${isHovered ? `text-[${color}]` : "text-white"}`}
        >
          <AnimatedCounter value={value} suffix={suffix} />
        </div>
        <div className="flex items-center mt-2">
          {change > 0 ? (
            <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
          ) : (
            <ArrowDown className="h-3 w-3 text-red-500 mr-1" />
          )}
          <span className={`text-xs ${change > 0 ? "text-green-500" : "text-red-500"}`}>
            {Math.abs(change)}% this week
          </span>
        </div>

        {/* Animated background effect */}
        <div
          className={`
            absolute inset-0 bg-gradient-to-br from-[${color}]/0 to-[${color}]/0
            transition-all duration-500 -z-10
            ${isHovered ? `from-[${color}]/5 to-[${color}]/10` : ""}
          `}
        />
      </CardContent>
    </Card>
  )
}

interface AnimatedProgressRingProps {
  progress: number
  size?: number
  strokeWidth?: number
  color?: string
  label?: string
}

export function AnimatedProgressRing({
  progress,
  size = 120,
  strokeWidth = 8,
  color = "#FFD700",
  label = "",
}: AnimatedProgressRingProps) {
  const [animatedProgress, setAnimatedProgress] = useState(0)
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDasharray = `${circumference} ${circumference}`
  const strokeDashoffset = circumference - (animatedProgress / 100) * circumference

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(progress)
    }, 100)
    return () => clearTimeout(timer)
  }, [progress])

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg className="transform -rotate-90 transition-all duration-1000" width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="#333" strokeWidth={strokeWidth} fill="transparent" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center flex-col">
        <span className="text-2xl font-bold text-white">
          <AnimatedCounter value={animatedProgress} suffix="%" />
        </span>
        {label && <span className="text-xs text-gray-400 mt-1">{label}</span>}
      </div>
    </div>
  )
}

interface InteractiveActivityItemProps {
  icon: any
  title: string
  time: string
  points?: number
  type: "exercise" | "reflection" | "coaching" | "achievement"
  onClick?: () => void
}

export function InteractiveActivityItem({
  icon: Icon,
  title,
  time,
  points,
  type,
  onClick,
}: InteractiveActivityItemProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const getTypeColor = () => {
    switch (type) {
      case "exercise":
        return "#FFD700"
      case "reflection":
        return "#7B68EE"
      case "coaching":
        return "#4169E1"
      case "achievement":
        return "#4ECDC4"
      default:
        return "#FFD700"
    }
  }

  const getTypeDetails = () => {
    switch (type) {
      case "exercise":
        return { bg: "bg-[#FFD700]/10", border: "border-[#FFD700]/20", detail: "Mental discipline practice" }
      case "reflection":
        return { bg: "bg-[#7B68EE]/10", border: "border-[#7B68EE]/20", detail: "Mindset analysis session" }
      case "coaching":
        return { bg: "bg-[#4169E1]/10", border: "border-[#4169E1]/20", detail: "AI-powered guidance" }
      case "achievement":
        return { bg: "bg-[#4ECDC4]/10", border: "border-[#4ECDC4]/20", detail: "Milestone reached" }
      default:
        return { bg: "bg-[#FFD700]/10", border: "border-[#FFD700]/20", detail: "Activity completed" }
    }
  }

  const typeDetails = getTypeDetails()

  return (
    <div
      className={`
        group p-4 rounded-lg border transition-all duration-300 cursor-pointer
        ${typeDetails.bg} ${typeDetails.border}
        ${isHovered ? "scale-102 shadow-lg" : ""}
        ${isExpanded ? "scale-105" : ""}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        setIsExpanded(!isExpanded)
        onClick?.()
      }}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <div
            className={`
              p-2 rounded-lg transition-all duration-300
              ${isHovered ? "scale-110 rotate-12" : ""}
            `}
            style={{ backgroundColor: `${getTypeColor()}20` }}
          >
            <Icon className="h-5 w-5" style={{ color: getTypeColor() }} />
          </div>
          <div className="flex-1">
            <p className="font-medium text-white group-hover:text-[#FFD700] transition-colors">{title}</p>
            <p className="text-sm text-gray-400 flex items-center mt-1">
              <Clock className="h-3 w-3 mr-1" />
              {time}
            </p>
            {isExpanded && (
              <p className="text-xs text-gray-500 mt-2 animate-in slide-in-from-top duration-300">
                {typeDetails.detail}
              </p>
            )}
          </div>
        </div>

        {points && (
          <div className="flex items-center space-x-2">
            <Badge
              className={`
                transition-all duration-300
                ${isHovered ? "scale-110" : ""}
              `}
              style={{
                backgroundColor: `${getTypeColor()}20`,
                color: getTypeColor(),
                border: `1px solid ${getTypeColor()}30`,
              }}
            >
              <Star className="h-3 w-3 mr-1" />+{points}
            </Badge>
          </div>
        )}
      </div>

      {/* Animated progress bar at bottom */}
      <div className="mt-3 h-1 bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`
            h-full rounded-full transition-all duration-1000 ease-out
            ${isHovered ? "w-full" : "w-0"}
          `}
          style={{ backgroundColor: getTypeColor() }}
        />
      </div>
    </div>
  )
}

interface LiveMetricDisplayProps {
  title: string
  value: number
  target: number
  unit: string
  trend: "up" | "down" | "stable"
  isLive?: boolean
}

export function LiveMetricDisplay({ title, value, target, unit, trend, isLive = false }: LiveMetricDisplayProps) {
  const [currentValue, setCurrentValue] = useState(value)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (isLive) {
      const interval = setInterval(() => {
        const variation = (Math.random() - 0.5) * 0.1 * value
        const newValue = Math.max(0, value + variation)
        setCurrentValue(newValue)
        setIsAnimating(true)
        setTimeout(() => setIsAnimating(false), 300)
      }, 3000)

      return () => clearInterval(interval)
    }
  }, [value, isLive])

  const progressPercentage = (currentValue / target) * 100

  return (
    <Card className="bg-[#1A1A1A] border-gray-800 overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-gray-400 flex items-center justify-between">
          <span>{title}</span>
          {isLive && (
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs text-green-500">LIVE</span>
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className={`text-2xl font-bold text-white transition-all duration-300 ${isAnimating ? "scale-110 text-[#FFD700]" : ""}`}
        >
          <AnimatedCounter value={currentValue} suffix={unit} />
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Progress</span>
            <span className="text-gray-300">{Math.round(progressPercentage)}%</span>
          </div>
          <div className="relative">
            <Progress value={progressPercentage} className="h-2" />
            <div
              className="absolute top-0 left-0 h-2 bg-[#FFD700] rounded-full transition-all duration-1000"
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>
              Current: {Math.round(currentValue)}
              {unit}
            </span>
            <span>
              Target: {target}
              {unit}
            </span>
          </div>
        </div>

        {/* Trend indicator */}
        <div className="mt-3 flex items-center space-x-2">
          {trend === "up" && <TrendingUp className="h-4 w-4 text-green-500" />}
          {trend === "down" && <ArrowDown className="h-4 w-4 text-red-500" />}
          {trend === "stable" && <Activity className="h-4 w-4 text-gray-500" />}
          <span
            className={`text-xs ${
              trend === "up" ? "text-green-500" : trend === "down" ? "text-red-500" : "text-gray-500"
            }`}
          >
            {trend === "up" ? "Trending up" : trend === "down" ? "Trending down" : "Stable"}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
