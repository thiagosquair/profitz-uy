"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, Plus, Star, Trophy, Flame } from "lucide-react"

interface PointsNotification {
  id: string
  type: "points" | "level" | "achievement" | "streak"
  title: string
  description: string
  points?: number
  icon?: any
  duration?: number
}

interface PointsNotificationProps {
  notifications: PointsNotification[]
  onDismiss: (id: string) => void
}

export function PointsNotificationSystem({ notifications, onDismiss }: PointsNotificationProps) {
  const [visibleNotifications, setVisibleNotifications] = useState<PointsNotification[]>([])

  useEffect(() => {
    notifications.forEach((notification) => {
      if (!visibleNotifications.find((n) => n.id === notification.id)) {
        setVisibleNotifications((prev) => [...prev, notification])

        // Auto-dismiss after duration
        if (notification.duration) {
          setTimeout(() => {
            handleDismiss(notification.id)
          }, notification.duration)
        }
      }
    })
  }, [notifications])

  const handleDismiss = (id: string) => {
    setVisibleNotifications((prev) => prev.filter((n) => n.id !== id))
    onDismiss(id)
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "points":
        return <Plus className="h-5 w-5 text-green-600" />
      case "level":
        return <Star className="h-5 w-5 text-yellow-600" />
      case "achievement":
        return <Trophy className="h-5 w-5 text-purple-600" />
      case "streak":
        return <Flame className="h-5 w-5 text-orange-600" />
      default:
        return <Plus className="h-5 w-5 text-blue-600" />
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "points":
        return "border-green-200 bg-green-50"
      case "level":
        return "border-yellow-200 bg-yellow-50"
      case "achievement":
        return "border-purple-200 bg-purple-50"
      case "streak":
        return "border-orange-200 bg-orange-50"
      default:
        return "border-blue-200 bg-blue-50"
    }
  }

  if (visibleNotifications.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {visibleNotifications.map((notification) => (
        <Card
          key={notification.id}
          className={`p-4 border-2 ${getNotificationColor(notification.type)} animate-in slide-in-from-right duration-300`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              {getNotificationIcon(notification.type)}
              <div className="flex-1">
                <h3 className="font-semibold text-sm">{notification.title}</h3>
                <p className="text-xs text-gray-600 mt-1">{notification.description}</p>
                {notification.points && (
                  <div className="flex items-center mt-2">
                    <Plus className="h-3 w-3 text-green-600 mr-1" />
                    <span className="text-sm font-medium text-green-700">{notification.points} points</span>
                  </div>
                )}
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => handleDismiss(notification.id)} className="h-6 w-6 p-0">
              <X className="h-3 w-3" />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  )
}
