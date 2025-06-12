"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-6">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="/profitz-logo-full.png"
              alt="PROFITZ - Trading Psychology Lab"
              width={280}
              height={90}
              className="w-auto h-16 hover:scale-105 transition-transform"
              priority
            />
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-600">
            <Link href="/about" className="hover:text-blue-600 transition-colors">
              About
            </Link>
            <Link href="/privacy" className="hover:text-blue-600 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-blue-600 transition-colors">
              Terms of Service
            </Link>
            <Link href="/contact" className="hover:text-blue-600 transition-colors">
              Contact
            </Link>
            <Link href="/help" className="hover:text-blue-600 transition-colors">
              Help Center
            </Link>
          </div>

          {/* Copyright */}
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>© 2024 PROFITZ. Made with</span>
            <Heart className="h-4 w-4 text-red-500 fill-current" />
            <span>for traders worldwide.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
