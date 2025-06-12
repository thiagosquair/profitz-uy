"use client"

import { I18nextProvider } from "react-i18next"
import i18n from "@/lib/i18n"

export function I18nProvider({ children }: { children: React.ReactNode }) {
  return <i18nextProvider I18n={i18n}>{children}</i18nextProvider>
}
