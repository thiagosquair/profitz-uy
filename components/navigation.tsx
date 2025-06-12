"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Brain,
  BookOpen,
  Target,
  TrendingUp,
  Home,
  Calendar,
  Trophy,
  BarChart3,
  Settings,
  LogOut,
  HelpCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "AI Coach", href: "/coach", icon: Brain },
  { name: "Learning Path", href: "/learning-path", icon: BookOpen },
  { name: "Exercises", href: "/exercises", icon: Target },
  { name: "Reflections", href: "/reflections", icon: Calendar },
  { name: "Trade Journal", href: "/trade-journal", icon: BarChart3 },
  { name: "Progress", href: "/progress", icon: TrendingUp },
  { name: "Achievements", href: "/gamification", icon: Trophy },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <Link href="/dashboard" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
            <Brain className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">ProFitz</h1>
            <p className="text-xs text-gray-500">Trading Psychology Lab</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group",
                isActive
                  ? "bg-blue-50 text-blue-700 border border-blue-200"
                  : "text-gray-600 hover:bg-gray-50 hover:text-blue-600",
              )}
            >
              <item.icon
                className={cn(
                  "h-5 w-5 transition-transform group-hover:scale-110",
                  isActive ? "text-blue-600" : "text-gray-500 group-hover:text-blue-600",
                )}
              />
              <span>{item.name}</span>
              {isActive && <div className="ml-auto w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>}
            </Link>
          )
        })}
      </nav>

      <Separator className="bg-gray-200" />

      {/* User section */}
      <div className="p-4 space-y-2">
        <Link
          href="/settings"
          className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-all duration-200 group"
        >
          <Settings className="h-5 w-5 group-hover:rotate-90 transition-transform" />
          <span>Settings</span>
        </Link>

        <Link
          href="/help"
          className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-all duration-200 group"
        >
          <HelpCircle className="h-5 w-5 group-hover:scale-110 transition-transform" />
          <span>Help</span>
        </Link>

        <Button
          variant="ghost"
          className="w-full justify-start text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all duration-200 group"
        >
          <LogOut className="h-5 w-5 mr-3 group-hover:translate-x-1 transition-transform" />
          Sign Out
        </Button>
      </div>
    </div>
  )
}
