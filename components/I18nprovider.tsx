"use client"

import { I18nextProvider } from "react-I18next"
import i18n from "@/lib/I18n"

export function I18nProvider({ children }: { children: React.ReactNode }) {
  return <I18nextProvider I18n={I18n}>{children}</I18nextProvider>
}
