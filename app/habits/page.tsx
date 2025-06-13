"use client"

import { useState, useEffect } from "react"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

// Define interfaces for type safety
interface StreakData {
  date: string
  streak: number
}

interface Habit {
  id: number
  name: string
  frequency: number
  isCompleted: boolean
  completedDays: number[]
  currentStreak: number
  longestStreak: number
  streakData: StreakData[]
}

interface HabitCardProps {
  habit: Habit
  onToggleCompletion: (habitId: number) => void
}

const HabitCard = ({ habit, onToggleCompletion }: HabitCardProps) => {
  const [percentage, setPercentage] = useState<number>(0)

  useEffect(() => {
    // Calculate completion percentage based on habit.completedDays.length
    const completionRate = habit.completedDays.length / habit.frequency
    setPercentage(Math.min(completionRate * 100, 100)) // Ensure percentage doesn't exceed 100
  }, [habit.completedDays, habit.frequency])

  const data = habit.streakData || []

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h3 className="text-lg font-semibold text-gray-800">{habit.name}</h3>
      <p className="text-gray-600">Frequency: {habit.frequency} days/week</p>

      <div className="flex items-center justify-between mt-4">
        <div style={{ width: 100, height: 100 }}>
          <CircularProgressbar
            value={percentage}
            text={`${Math.round(percentage)}%`}
            styles={buildStyles({
              pathColor: `rgba(62, 152, 255, ${percentage / 100})`,
              textColor: "#3e98ff",
              trailColor: "#d6d6d6",
              backgroundColor: "#3e98ff",
            })}
          />
        </div>
        <button
          className={`px-4 py-2 rounded-md ${habit.isCompleted ? "bg-green-500 text-white" : "bg-blue-500 text-white"}`}
          onClick={() => onToggleCompletion(habit.id)}
        >
          {habit.isCompleted ? "Completed" : "Mark Complete"}
        </button>
      </div>

      <div className="mt-4">
        <p className="text-gray-600">
          Current Streak: <span className="text-blue-500 font-medium">{habit.currentStreak}</span> days
        </p>
        <p className="text-gray-600">
          Longest Streak: <span className="text-blue-500 font-medium">{habit.longestStreak}</span> days
        </p>
      </div>

      {data.length > 0 && (
        <div className="mt-4">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="streak" stroke="#8884d8" name="Streak" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}

const HabitsPage = () => {
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: 1,
      name: "Drink Water",
      frequency: 7,
      isCompleted: false,
      completedDays: [],
      currentStreak: 5,
      longestStreak: 10,
      streakData: [],
    },
    {
      id: 2,
      name: "Exercise",
      frequency: 5,
      isCompleted: true,
      completedDays: [1, 2, 3],
      currentStreak: 2,
      longestStreak: 7,
      streakData: [],
    },
    {
      id: 3,
      name: "Read",
      frequency: 7,
      isCompleted: false,
      completedDays: [],
      currentStreak: 0,
      longestStreak: 5,
      streakData: [],
    },
  ])

  const toggleHabitCompletion = (habitId: number): void => {
    setHabits(habits.map((habit) => (habit.id === habitId ? { ...habit, isCompleted: !habit.isCompleted } : habit)))
  }

  return (
    <main className="bg-gray-50 min-h-screen py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-semibold text-gray-900 mb-6">Habit Tracker</h1>
        {habits.map((habit) => (
          <HabitCard key={habit.id} habit={habit} onToggleCompletion={toggleHabitCompletion} />
        ))}
      </div>
    </main>
  )
}

export default HabitsPage

