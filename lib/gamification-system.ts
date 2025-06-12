export interface UserPoints {
  userId: string
  totalPoints: number
  weeklyPoints: number
  monthlyPoints: number
  level: number
  experiencePoints: number
  nextLevelXP: number
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  category: "learning" | "consistency" | "social" | "milestone" | "special"
  points: number
  rarity: "common" | "rare" | "epic" | "legendary"
  requirements: AchievementRequirement[]
  unlockedAt?: Date
  progress?: number
  maxProgress?: number
}

export interface AchievementRequirement {
  type: "streak" | "completion" | "points" | "time" | "social" | "custom"
  target: number
  current: number
  description: string
}

export interface LeaderboardEntry {
  userId: string
  username: string
  avatar?: string
  points: number
  level: number
  rank: number
  badge?: string
  streak: number
}

export interface PointsTransaction {
  id: string
  userId: string
  points: number
  type: "earn" | "spend" | "bonus"
  source: "exercise" | "habit" | "streak" | "achievement" | "social" | "daily_bonus"
  description: string
  timestamp: Date
  metadata?: any
}

export class GamificationEngine {
  private pointsRules = {
    exercise_completion: 50,
    habit_completion: 25,
    streak_bonus: 10, // per day
    reflection_quality: 30,
    assessment_pass: 100,
    chapter_completion: 75,
    daily_login: 15,
    social_interaction: 20,
    achievement_unlock: 0, // varies by achievement
  }

  private levelThresholds = [
    0, 100, 250, 500, 1000, 1750, 2750, 4000, 5500, 7500, 10000, 13000, 16500, 20500, 25000, 30000, 36000, 43000, 51000,
    60000, 70000,
  ]

  calculateLevel(totalXP: number): { level: number; currentXP: number; nextLevelXP: number } {
    let level = 0
    for (let i = 0; i < this.levelThresholds.length; i++) {
      if (totalXP >= this.levelThresholds[i]) {
        level = i
      } else {
        break
      }
    }

    const currentLevelXP = this.levelThresholds[level] || 0
    const nextLevelXP = this.levelThresholds[level + 1] || this.levelThresholds[this.levelThresholds.length - 1]

    return {
      level,
      currentXP: totalXP - currentLevelXP,
      nextLevelXP: nextLevelXP - currentLevelXP,
    }
  }

  awardPoints(
    userId: string,
    source: keyof typeof this.pointsRules,
    multiplier = 1,
    metadata?: any,
  ): PointsTransaction {
    const basePoints = this.pointsRules[source] || 0
    const points = Math.round(basePoints * multiplier)

    return {
      id: `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      points,
      type: "earn",
      source: source as any,
      description: this.getPointsDescription(source, points, metadata),
      timestamp: new Date(),
      metadata,
    }
  }

  private getPointsDescription(source: string, points: number, metadata?: any): string {
    const descriptions = {
      exercise_completion: `Completed exercise: ${metadata?.exerciseName || "Unknown"}`,
      habit_completion: `Completed habit: ${metadata?.habitName || "Daily habit"}`,
      streak_bonus: `Streak bonus: ${metadata?.streakDays || 0} days`,
      reflection_quality: `High-quality reflection submitted`,
      assessment_pass: `Passed assessment: ${metadata?.assessmentName || "Unknown"}`,
      chapter_completion: `Completed chapter: ${metadata?.chapterName || "Unknown"}`,
      daily_login: `Daily login bonus`,
      social_interaction: `Community interaction`,
      achievement_unlock: `Achievement unlocked: ${metadata?.achievementName || "Unknown"}`,
    }

    return descriptions[source as keyof typeof descriptions] || `Earned ${points} points`
  }

  checkAchievements(userId: string, userStats: any): Achievement[] {
    const unlockedAchievements: Achievement[] = []

    // Check each achievement against user stats
    this.getAllAchievements().forEach((achievement) => {
      if (!userStats.unlockedAchievements?.includes(achievement.id)) {
        if (this.isAchievementUnlocked(achievement, userStats)) {
          unlockedAchievements.push({
            ...achievement,
            unlockedAt: new Date(),
          })
        }
      }
    })

    return unlockedAchievements
  }

  private isAchievementUnlocked(achievement: Achievement, userStats: any): boolean {
    return achievement.requirements.every((req) => {
      switch (req.type) {
        case "streak":
          return userStats.longestStreak >= req.target
        case "completion":
          return userStats.completedExercises >= req.target
        case "points":
          return userStats.totalPoints >= req.target
        case "time":
          return userStats.totalStudyTime >= req.target
        default:
          return false
      }
    })
  }

  getAllAchievements(): Achievement[] {
    return [
      // Learning Achievements
      {
        id: "first_exercise",
        title: "First Steps",
        description: "Complete your first exercise",
        icon: "🎯",
        category: "learning",
        points: 100,
        rarity: "common",
        requirements: [{ type: "completion", target: 1, current: 0, description: "Complete 1 exercise" }],
      },
      {
        id: "exercise_master",
        title: "Exercise Master",
        description: "Complete 50 exercises",
        icon: "🏆",
        category: "learning",
        points: 500,
        rarity: "epic",
        requirements: [{ type: "completion", target: 50, current: 0, description: "Complete 50 exercises" }],
      },
      {
        id: "knowledge_seeker",
        title: "Knowledge Seeker",
        description: "Spend 10 hours learning",
        icon: "📚",
        category: "learning",
        points: 300,
        rarity: "rare",
        requirements: [{ type: "time", target: 600, current: 0, description: "Study for 10 hours" }],
      },

      // Consistency Achievements
      {
        id: "week_warrior",
        title: "Week Warrior",
        description: "Maintain a 7-day streak",
        icon: "🔥",
        category: "consistency",
        points: 200,
        rarity: "rare",
        requirements: [{ type: "streak", target: 7, current: 0, description: "Maintain 7-day streak" }],
      },
      {
        id: "month_master",
        title: "Month Master",
        description: "Maintain a 30-day streak",
        icon: "💎",
        category: "consistency",
        points: 1000,
        rarity: "legendary",
        requirements: [{ type: "streak", target: 30, current: 0, description: "Maintain 30-day streak" }],
      },

      // Milestone Achievements
      {
        id: "point_collector",
        title: "Point Collector",
        description: "Earn 1,000 points",
        icon: "💰",
        category: "milestone",
        points: 100,
        rarity: "common",
        requirements: [{ type: "points", target: 1000, current: 0, description: "Earn 1,000 points" }],
      },
      {
        id: "elite_trader",
        title: "Elite Trader",
        description: "Reach level 10",
        icon: "👑",
        category: "milestone",
        points: 1500,
        rarity: "legendary",
        requirements: [{ type: "points", target: 10000, current: 0, description: "Reach level 10" }],
      },

      // Special Achievements
      {
        id: "early_bird",
        title: "Early Bird",
        description: "Complete activities before 8 AM",
        icon: "🌅",
        category: "special",
        points: 150,
        rarity: "rare",
        requirements: [{ type: "custom", target: 5, current: 0, description: "Complete 5 early morning activities" }],
      },
      {
        id: "night_owl",
        title: "Night Owl",
        description: "Complete activities after 10 PM",
        icon: "🦉",
        category: "special",
        points: 150,
        rarity: "rare",
        requirements: [{ type: "custom", target: 5, current: 0, description: "Complete 5 late night activities" }],
      },
    ]
  }

  generateLeaderboard(timeframe: "daily" | "weekly" | "monthly" | "all-time"): LeaderboardEntry[] {
    // Mock data - in real implementation, this would query the database
    const mockUsers = [
      {
        userId: "user1",
        username: "TradingMaster",
        points: 2450,
        level: 8,
        streak: 15,
        badge: "🏆",
      },
      {
        userId: "user2",
        username: "PsychologyPro",
        points: 2200,
        level: 7,
        streak: 12,
        badge: "🧠",
      },
      {
        userId: "user3",
        username: "ConsistentTrader",
        points: 1980,
        level: 7,
        streak: 23,
        badge: "🔥",
      },
      {
        userId: "user4",
        username: "RiskManager",
        points: 1750,
        level: 6,
        streak: 8,
        badge: "🛡️",
      },
      {
        userId: "user5",
        username: "MindfulTrader",
        points: 1650,
        level: 6,
        streak: 18,
        badge: "🧘",
      },
    ]

    return mockUsers
      .sort((a, b) => b.points - a.points)
      .map((user, index) => ({
        ...user,
        rank: index + 1,
      }))
  }
}
