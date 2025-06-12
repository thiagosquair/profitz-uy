"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Brain, Menu, X, LogIn, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getCurrentUser, simulateSignOut } from "@/lib/auth-simulation"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [user, setUser] = useState<any>(null)
  const pathname = usePathname()

  // Check if we're on the landing page
  const isLandingPage = pathname === "/"

  useEffect(() => {
    // Check if user is logged in
    const currentUser = getCurrentUser()
    setUser(currentUser)

    // Add scroll event listener
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleSignOut = () => {
    simulateSignOut()
    setUser(null)
    window.location.href = "/"
  }

  // Only show on landing page
  if (!isLandingPage && !user) return null

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#1A1A1A]/95 backdrop-blur-sm shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-[#FFD700] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Brain className="h-6 w-6 text-[#1A1A1A]" />
            </div>
            <span className="text-xl font-bold text-[#FFD700]">ProFitz</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {isLandingPage ? (
              <>
                <a href="#features" className="text-gray-300 hover:text-[#FFD700] transition-colors">
                  Features
                </a>
                <a href="#how-it-works" className="text-gray-300 hover:text-[#FFD700] transition-colors">
                  How It Works
                </a>
                <a href="#testimonials" className="text-gray-300 hover:text-[#FFD700] transition-colors">
                  Testimonials
                </a>
                <a href="#pricing" className="text-gray-300 hover:text-[#FFD700] transition-colors">
                  Pricing
                </a>
              </>
            ) : user ? (
              <>
                <Link href="/dashboard" className="text-gray-300 hover:text-[#FFD700] transition-colors">
                  Dashboard
                </Link>
                <Link href="/trade-journal" className="text-gray-300 hover:text-[#FFD700] transition-colors">
                  Trade Journal
                </Link>
                <Link href="/analytics" className="text-gray-300 hover:text-[#FFD700] transition-colors">
                  Analytics
                </Link>
                <Link href="/coach" className="text-gray-300 hover:text-[#FFD700] transition-colors">
                  AI Coach
                </Link>
              </>
            ) : null}
          </nav>

          {/* Auth Buttons or User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="text-gray-300">
                  <span className="text-[#FFD700]">{user.name}</span>
                </div>
                <Button
                  variant="outline"
                  className="border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-[#1A1A1A]"
                  onClick={handleSignOut}
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <>
                <Link href="/signin">
                  <Button variant="ghost" className="text-gray-300 hover:text-[#FFD700]">
                    <LogIn className="mr-2 h-4 w-4" />
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-[#FFD700] text-[#1A1A1A] hover:bg-[#FFD700]/90">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 hover:text-[#FFD700]"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#1A1A1A]/95 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {isLandingPage ? (
                <>
                  <a
                    href="#features"
                    className="text-gray-300 hover:text-[#FFD700] transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Features
                  </a>
                  <a
                    href="#how-it-works"
                    className="text-gray-300 hover:text-[#FFD700] transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    How It Works
                  </a>
                  <a
                    href="#testimonials"
                    className="text-gray-300 hover:text-[#FFD700] transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Testimonials
                  </a>
                  <a
                    href="#pricing"
                    className="text-gray-300 hover:text-[#FFD700] transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Pricing
                  </a>
                </>
              ) : user ? (
                <>
                  <Link
                    href="/dashboard"
                    className="text-gray-300 hover:text-[#FFD700] transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/trade-journal"
                    className="text-gray-300 hover:text-[#FFD700] transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Trade Journal
                  </Link>
                  <Link
                    href="/analytics"
                    className="text-gray-300 hover:text-[#FFD700] transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Analytics
                  </Link>
                  <Link
                    href="/coach"
                    className="text-gray-300 hover:text-[#FFD700] transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    AI Coach
                  </Link>
                </>
              ) : null}

              {/* Auth Buttons for Mobile */}
              <div className="pt-4 border-t border-gray-800">
                {user ? (
                  <div className="flex flex-col space-y-4">
                    <div className="text-gray-300">
                      Signed in as <span className="text-[#FFD700]">{user.name}</span>
                    </div>
                    <Button
                      variant="outline"
                      className="border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-[#1A1A1A]"
                      onClick={handleSignOut}
                    >
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-4">
                    <Link href="/signin" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="ghost" className="w-full text-gray-300 hover:text-[#FFD700]">
                        <LogIn className="mr-2 h-4 w-4" />
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full bg-[#FFD700] text-[#1A1A1A] hover:bg-[#FFD700]/90">
                        <UserPlus className="mr-2 h-4 w-4" />
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
