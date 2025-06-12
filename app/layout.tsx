import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { ProfileBuilderProvider } from "@/providers/profile-builder-provider"
import { QuoteTimer } from "@/components/quote-timer"
import { I18nProvider } from "@/components/i18nprovider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ProFitz - Master Your Trading Psychology",
  description:
    "Transform your trading mindset with AI-powered psychology coaching, personalized exercises, and proven techniques for consistent profitability.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <I18nProvider>
          <QuoteTimer>
            <ProfileBuilderProvider>
              {children}
              <Toaster />
            </ProfileBuilderProvider>
          </QuoteTimer>
        </I18nProvider>
      </body>
    </html>
  )
}
