import { create } from "zustand"

// Define types for our state
type User = {
  id: string
  name: string
  email: string
  avatar?: string
}

type ThemeType = "light" | "dark" | "system"

interface AppState {
  user: User | null
  isAuthenticated: boolean
  setUser: (user: User | null) => void
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  theme: ThemeType
  setTheme: (theme: ThemeType) => void
  sidebarOpen: boolean
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  login: async (email, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        set({
          user: {
            id: "1",
            name: "John Doe",
            email,
          },
          isAuthenticated: true,
        })
        resolve(true)
      }, 1000)
    })
  },
  logout: () => set({ user: null, isAuthenticated: false }),

  theme: "system",
  setTheme: (theme) => set({ theme }),

  sidebarOpen: false,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
}))

