// Simulated user database for testing
interface User {
  id: string
  email: string
  name: string
  password: string
  role: "user" | "admin"
  isNewUser: boolean
  experience: string
  completedInitialProfile: boolean
  completedPsychologyAssessment: boolean
}

const users: User[] = [
  {
    id: "1",
    email: "demo@profitz.com",
    name: "Demo User",
    password: "demo123",
    role: "user",
    isNewUser: true,
    experience: "beginner",
    completedInitialProfile: false,
    completedPsychologyAssessment: false,
  },
  {
    id: "2",
    email: "john@profitz.com",
    name: "John Trader",
    password: "password123",
    role: "user",
    isNewUser: false,
    experience: "intermediate",
    completedInitialProfile: true,
    completedPsychologyAssessment: true,
  },
  {
    id: "3",
    email: "sarah@profitz.com",
    name: "Sarah Expert",
    password: "password123",
    role: "user",
    isNewUser: false,
    experience: "advanced",
    completedInitialProfile: true,
    completedPsychologyAssessment: true,
  },
  {
    id: "4",
    email: "admin@profitz.com",
    name: "Admin User",
    password: "admin123",
    role: "admin",
    isNewUser: false,
    experience: "advanced",
    completedInitialProfile: true,
    completedPsychologyAssessment: true,
  },
  {
    id: "5",
    email: "newbie@profitz.com",
    name: "New Trader",
    password: "newbie123",
    role: "user",
    isNewUser: true,
    experience: "beginner",
    completedInitialProfile: false,
    completedPsychologyAssessment: false,
  },
]

// Simulate sign up process
export async function simulateSignUp(email: string, password: string, name: string) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Check if user already exists
  const existingUser = users.find((u) => u.email.toLowerCase() === email.toLowerCase())
  if (existingUser) {
    return { success: false, error: "User already exists" }
  }

  // Create new user
  const newUser: User = {
    id: (users.length + 1).toString(),
    email,
    name,
    password,
    role: "user",
    isNewUser: true,
    experience: "beginner",
    completedInitialProfile: false,
    completedPsychologyAssessment: false,
  }

  users.push(newUser)

  // Store user in session storage
  const userData = {
    id: newUser.id,
    email: newUser.email,
    name: newUser.name,
    role: newUser.role,
    isNewUser: newUser.isNewUser,
    experience: newUser.experience,
    completedInitialProfile: newUser.completedInitialProfile,
    completedPsychologyAssessment: newUser.completedPsychologyAssessment,
  }

  sessionStorage.setItem("currentUser", JSON.stringify(userData))

  // Trigger custom event to notify profile builder
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("userSignedUp", { detail: userData }))
  }

  return {
    success: true,
    user: userData,
  }
}

// Simulate sign in process
export async function simulateSignIn(email: string, password: string) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Find user by email
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase())

  // Check if user exists and password matches
  if (!user) {
    return { success: false, error: "User not found" }
  }

  if (user.password !== password) {
    return { success: false, error: "Invalid password" }
  }

  // Store user in session storage
  const userData = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    isNewUser: user.isNewUser,
    experience: user.experience,
    completedInitialProfile: user.completedInitialProfile,
    completedPsychologyAssessment: user.completedPsychologyAssessment,
  }

  sessionStorage.setItem("currentUser", JSON.stringify(userData))

  // Trigger custom event to notify profile builder (only for returning users who haven't completed initial profile)
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("userSignedIn", { detail: userData }))
  }

  return {
    success: true,
    user: userData,
  }
}

// Get current user from session storage
export function getCurrentUser() {
  if (typeof window === "undefined") {
    return null
  }

  const userJson = sessionStorage.getItem("currentUser")
  if (!userJson) {
    return null
  }

  try {
    return JSON.parse(userJson)
  } catch (error) {
    console.error("Error parsing user data:", error)
    return null
  }
}

// Simulate sign out
export function simulateSignOut() {
  if (typeof window === "undefined") {
    return
  }

  sessionStorage.removeItem("currentUser")

  // Trigger custom event
  window.dispatchEvent(new CustomEvent("userSignedOut"))
}

// Check if user is authenticated
export function isAuthenticated() {
  return getCurrentUser() !== null
}

// Check if user needs initial profile setup
export function needsInitialProfile() {
  const user = getCurrentUser()
  return user ? user.isNewUser && !user.completedInitialProfile : false
}

// Check if user needs psychology assessment
export function needsPsychologyAssessment() {
  const user = getCurrentUser()
  return user ? !user.completedPsychologyAssessment : false
}

// Mark user as having completed initial profile
export function completeInitialProfile() {
  const user = getCurrentUser()
  if (user) {
    const updatedUser = {
      ...user,
      isNewUser: false,
      completedInitialProfile: true,
    }
    sessionStorage.setItem("currentUser", JSON.stringify(updatedUser))

    // Update the user in our simulated database
    const userIndex = users.findIndex((u) => u.id === user.id)
    if (userIndex !== -1) {
      users[userIndex].isNewUser = false
      users[userIndex].completedInitialProfile = true
    }
  }
}

// Mark user as having completed psychology assessment
export function completePsychologyAssessment() {
  const user = getCurrentUser()
  if (user) {
    const updatedUser = {
      ...user,
      completedPsychologyAssessment: true,
    }
    sessionStorage.setItem("currentUser", JSON.stringify(updatedUser))

    // Update the user in our simulated database
    const userIndex = users.findIndex((u) => u.id === user.id)
    if (userIndex !== -1) {
      users[userIndex].completedPsychologyAssessment = true
    }
  }
}

// Reset user profile (for testing)
export function resetUserProfile() {
  const user = getCurrentUser()
  if (user) {
    const updatedUser = {
      ...user,
      isNewUser: true,
      completedInitialProfile: false,
      completedPsychologyAssessment: false,
    }
    sessionStorage.setItem("currentUser", JSON.stringify(updatedUser))
  }
}
