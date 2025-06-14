// components/header.tsx - Updated with Language Switcher and useTranslation
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, LogIn, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/language-switcher"
import { getCurrentUser, simulateSignOut } from "@/lib/auth-simulation"
import { useTranslation } from "react-i18next" // Import useTranslation

export function Header() {
  const { t } = useTranslation() // Initialize useTranslation
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

  // Only show on landing page if user is not logged in
  if (!isLandingPage && !user) return null

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-sm shadow-md border-b border-gray-200"
          : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="w-auto h-12 md:h-14 flex items-center">
              <Image
                src="/profitz-logo-horizontal.png"
                alt="PROFITZ Logo"
                width={400}
                height={60}
                className="w-auto h-full group-hover:scale-105 transition-transform"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {isLandingPage ? (
              <>
                <a
                  href="#features"
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  {t("header.features")}
                </a>
                <a
                  href="#how-it-works"
                  className="text-gray-700 hover:text-purple-600 transition-colors"
                >
                  {t("header.howItWorks")}
                </a>
                <a
                  href="#testimonials"
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  {t("header.testimonials")}
                </a>
                <a
                  href="#pricing"
                  className="text-gray-700 hover:text-purple-600 transition-colors"
                >
                  {t("header.pricing")}
                </a>
              </>
            ) : user ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  {t("header.dashboard")}
                </Link>
                <Link
                  href="/trade-journal"
                  className="text-gray-700 hover:text-purple-600 transition-colors"
                >
                  {t("header.tradeJournal")}
                </Link>
                <Link
                  href="/analytics"
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  {t("header.analytics")}
                </Link>
                <Link
                  href="/coach"
                  className="text-gray-700 hover:text-purple-600 transition-colors"
                >
                  {t("header.aiCoach")}
                </Link>
              </>
            ) : null}
          </nav>

          {/* Right side: Language Switcher + Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Switcher */}
            <LanguageSwitcher />
            
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="text-gray-700">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">
                    {user.name}
                  </span>
                </div>
                <Button
                  variant="outline"
                  className="border-blue-300 text-blue-600 hover:bg-blue-50"
                  onClick={handleSignOut}
                >
                  {t("header.signOut")}
                </Button>
              </div>
            ) : (
              <>
                <Link href="/signin">
                  <Button
                    variant="ghost"
                    className="text-gray-700 hover:text-blue-600"
                  >
                    <LogIn className="mr-2 h-4 w-4" />
                    {t("header.signIn")}
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600">
                    <UserPlus className="mr-2 h-4 w-4" />
                    {t("header.signUp")}
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 hover:text-blue-600"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-sm border-t border-gray-200">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {isLandingPage ? (
                <>
                  <a
                    href="#features"
                    className="text-gray-700 hover:text-blue-600 transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t("header.features")}
                  </a>
                  <a
                    href="#how-it-works"
                    className="text-gray-700 hover:text-purple-600 transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t("header.howItWorks")}
                  </a>
                  <a
                    href="#testimonials"
                    className="text-gray-700 hover:text-blue-600 transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t("header.testimonials")}
                  </a>
                  <a
                    href="#pricing"
                    className="text-gray-700 hover:text-purple-600 transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t("header.pricing")}
                  </a>
                </>
              ) : user ? (
                <>
                  <Link
                    href="/dashboard"
                    className="text-gray-700 hover:text-blue-600 transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t("header.dashboard")}
                  </Link>
                  <Link
                    href="/trade-journal"
                    className="text-gray-700 hover:text-purple-600 transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t("header.tradeJournal")}
                  </Link>
                  <Link
                    href="/analytics"
                    className="text-gray-700 hover:text-blue-600 transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t("header.analytics")}
                  </Link>
                  <Link
                    href="/coach"
                    className="text-gray-700 hover:text-purple-600 transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t("header.aiCoach")}
                  </Link>
                </>
              ) : null}

              {/* Language Switcher for Mobile */}
              <div className="py-2 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 font-medium">{t("header.language")}</span>
                  <LanguageSwitcher />
                </div>
              </div>

              {/* Auth Buttons for Mobile */}
              <div className="pt-4 border-t border-gray-200">
                {user ? (
                  <div className="flex flex-col space-y-4">
                    <div className="text-gray-700">
                      {t("header.signedInAs")}{" "}
                      <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">
                        {user.name}
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      className="border-blue-300 text-blue-600 hover:bg-blue-50"
                      onClick={handleSignOut}
                    >
                      {t("header.signOut")}
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-4">
                    <Link href="/signin" onClick={() => setIsMenuOpen(false)}>
                      <Button
                        variant="ghost"
                        className="w-full text-gray-700 hover:text-blue-600"
                      >
                        <LogIn className="mr-2 h-4 w-4" />
                        {t("header.signIn")}
                      </Button>
                    </Link>
                    <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600">
                        <UserPlus className="mr-2 h-4 w-4" />
                        {t("header.signUp")}
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


