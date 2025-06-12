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
    <div className="w-64 bg-[#0A0F1E] border-r border-[#333] flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-[#333]">
        <Link href="/dashboard" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 bg-gradient-to-br from-[#FFD700] to-[#FFA000] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
            <Brain className="h-6 w-6 text-[#0A0F1E]" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#FFD700] group-hover:text-[#FFA000] transition-colors">ProFitz</h1>
            <p className="text-xs text-[#E0E0E0]">Trading Psychology</p>
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
                  ? "bg-[#FFD700]/20 text-[#FFD700] border border-[#FFD700]/30"
                  : "text-[#E0E0E0] hover:bg-[#1A1F2E] hover:text-[#FFD700]",
              )}
            >
              <item.icon
                className={cn(
                  "h-5 w-5 transition-transform group-hover:scale-110",
                  isActive ? "text-[#FFD700]" : "text-[#E0E0E0] group-hover:text-[#FFD700]",
                )}
              />
              <span>{item.name}</span>
              {isActive && <div className="ml-auto w-2 h-2 bg-[#FFD700] rounded-full animate-pulse"></div>}
            </Link>
          )
        })}
      </nav>

      <Separator className="bg-[#333]" />

      {/* User section */}
      <div className="p-4 space-y-2">
        <Link
          href="/settings"
          className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-[#E0E0E0] hover:bg-[#1A1F2E] hover:text-[#FFD700] transition-all duration-200 group"
        >
          <Settings className="h-5 w-5 group-hover:rotate-90 transition-transform" />
          <span>Settings</span>
        </Link>

        <Link
          href="/help"
          className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-[#E0E0E0] hover:bg-[#1A1F2E] hover:text-[#FFD700] transition-all duration-200 group"
        >
          <HelpCircle className="h-5 w-5 group-hover:scale-110 transition-transform" />
          <span>Help</span>
        </Link>

        <Button
          variant="ghost"
          className="w-full justify-start text-[#E0E0E0] hover:bg-[#FF6B6B]/20 hover:text-[#FF6B6B] transition-all duration-200 group"
        >
          <LogOut className="h-5 w-5 mr-3 group-hover:translate-x-1 transition-transform" />
          Sign Out
        </Button>
      </div>
    </div>
  )
}
