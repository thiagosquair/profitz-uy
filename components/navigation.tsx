'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslation } from '@/app/i18n/client'
import { LanguageSwitcher } from './language-switcher'
import { 
  BarChart3, 
  Brain, 
  Target, 
  BookOpen, 
  TrendingUp, 
  User, 
  Settings,
  Home
} from 'lucide-react'

export function Navigation({ lng }: { lng: string }) {
  const { t } = useTranslation(lng, 'common')
  const pathname = usePathname()

  const navigationItems = [
    { href: `/${lng}/dashboard`, label: t('navigation.dashboard'), icon: Home },
    { href: `/${lng}/analytics`, label: t('navigation.analytics'), icon: BarChart3 },
    { href: `/${lng}/coach`, label: t('navigation.ai_coach'), icon: Brain },
    { href: `/${lng}/exercises`, label: t('navigation.exercises'), icon: Target },
    { href: `/${lng}/trade-journal`, label: t('navigation.trade_journal'), icon: BookOpen },
    { href: `/${lng}/progress`, label: t('navigation.progress'), icon: TrendingUp },
  ]

  return (
    <nav className="w-64 bg-white shadow-lg h-screen flex flex-col">
      <div className="p-6 border-b">
        <Link href={`/${lng}/dashboard`} className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">P</span>
          </div>
          <span className="text-xl font-bold text-gray-800">Profitz</span>
        </Link>
      </div>

      <div className="flex-1 py-6">
        <ul className="space-y-2 px-4">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-purple-100 text-purple-700 border-r-2 border-purple-600'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="p-4 border-t">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-gray-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">{t('navigation.profile')}</span>
          </div>
          <Settings className="h-4 w-4 text-gray-400" />
        </div>
        <LanguageSwitcher lng={lng} />
      </div>
    </nav>
  )
}
