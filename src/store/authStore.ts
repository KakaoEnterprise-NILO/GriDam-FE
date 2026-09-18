import { create } from "zustand"
import api from "@/api/axios"

interface AuthTokens {
  accessToken: string
  refreshToken: string
}

type LoginInput = { loginId: string; password: string }
type LoginResponse = { result: AuthTokens }

interface AuthState {
  accessToken: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  login: (data: LoginInput) => Promise<LoginResponse>
  logout: () => Promise<unknown>
  setTokens: (tokens: AuthTokens) => void
  clearAuth: () => void
}

const getStoredToken = (key: keyof AuthTokens) => {
  if (typeof window === "undefined") return null
  const value = localStorage.getItem(key)
  return value && value !== "null" ? value : null
}

const initialAccessToken = getStoredToken("accessToken")
const initialRefreshToken = getStoredToken("refreshToken")

export const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: initialAccessToken,
  refreshToken: initialRefreshToken,
  isAuthenticated: Boolean(initialAccessToken),
  setTokens: ({ accessToken, refreshToken }) => {
    localStorage.setItem("accessToken", accessToken)
    localStorage.setItem("refreshToken", refreshToken)
    set({ accessToken, refreshToken, isAuthenticated: true })
  },
  clearAuth: () => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    set({ accessToken: null, refreshToken: null, isAuthenticated: false })
  },
  login: async (data) => {
    const response = await api.post<LoginResponse>("/auth/login", data)
    get().setTokens(response.data.result)
    return response.data
  },
  logout: async () => {
    const { accessToken } = get()
    if (!accessToken) return
    const response = await api.post("/auth/logout", { accessToken })
    get().clearAuth()
    return response.data
  },
}))

if (typeof window !== "undefined") {
  window.addEventListener("storage", (event) => {
    if (event.key === "accessToken" || event.key === "refreshToken") {
      const accessToken = getStoredToken("accessToken")
      const refreshToken = getStoredToken("refreshToken")
      useAuthStore.setState({ accessToken, refreshToken, isAuthenticated: Boolean(accessToken) })
    }
  })
}
