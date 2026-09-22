import { create } from "zustand"
import api from "@/api/axios"
import { getMyUserId } from "@/api/user"

interface AuthTokens {
  accessToken: string
  refreshToken: string
}

type LoginInput = { loginId: string; password: string }
type LoginResponse = { result: AuthTokens }

export type AuthStatus = "checking" | "authenticated" | "unauthenticated"

interface AuthState {
  accessToken: string | null
  refreshToken: string | null
  authStatus: AuthStatus
  userId: string | null
  userError: string | null
  loadCurrentUser: () => Promise<string | null>
  startSession: (tokens: AuthTokens) => Promise<void>
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

let sessionVersion = 0
let userRequest: Promise<string | null> | null = null

let logoutRequest: Promise<unknown> | null = null

const initialAccessToken = getStoredToken("accessToken")
const initialRefreshToken = getStoredToken("refreshToken")
const initialAuthStatus: AuthStatus = initialAccessToken ? "checking" : "unauthenticated"

export const useAuthStore = create<AuthState>((set, get) => ({
  userId: null,
  userError: null,
  accessToken: initialAccessToken,
  refreshToken: initialRefreshToken,
  authStatus: initialAuthStatus,
  isAuthenticated: Boolean(initialAccessToken),
  loadCurrentUser: () => {
    if (!get().accessToken) {
      set({ authStatus: "unauthenticated", isAuthenticated: false })
      return Promise.resolve(null)
    }
    if (get().userId) {
      set({ authStatus: "authenticated", isAuthenticated: true })
      return Promise.resolve(get().userId)
    }
    if (userRequest) return userRequest
    const version = sessionVersion
    const request = Promise.resolve().then(async () => {
      try {
        const userId = await getMyUserId()
        if (version !== sessionVersion) return null
        set({ userId, userError: null, authStatus: "authenticated", isAuthenticated: true })
        return userId
      } catch {
        if (version === sessionVersion) {
          set({ userId: null, userError: "\uC0AC\uC6A9\uC790 \uC815\uBCF4\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.", authStatus: "unauthenticated", isAuthenticated: false })
        }
        return null
      } finally {
        if (userRequest === request) userRequest = null
      }
    })
    userRequest = request
    return request
  },
  startSession: async (tokens) => {
    sessionVersion += 1
    userRequest = null
    set({ userId: null, userError: null, authStatus: "checking" })
    get().setTokens(tokens)
    await get().loadCurrentUser()
  },
  setTokens: ({ accessToken, refreshToken }) => {
    localStorage.setItem("accessToken", accessToken)
    localStorage.setItem("refreshToken", refreshToken)
    set({ accessToken, refreshToken, isAuthenticated: true })
  },
  clearAuth: () => {
    sessionVersion += 1
    userRequest = null
    for (const key of ["accessToken", "refreshToken"]) {
      try {
        localStorage.removeItem(key)
      } catch {
        console.error("Failed to remove local auth data:", key)
      }
    }
    set({ accessToken: null, refreshToken: null, isAuthenticated: false, authStatus: "unauthenticated", userId: null, userError: null })
  },
  login: async (data) => {
    const response = await api.post<LoginResponse>("/auth/login", data)
    await get().startSession(response.data.result)
    return response.data
  },
  logout: () => {
    if (logoutRequest) return logoutRequest

    const accessToken = get().accessToken

    logoutRequest = Promise.resolve().then(async () => {
      try {
        if (!accessToken) return
        const response = await api.post("/auth/logout", { accessToken })
        return response.data
      } catch {
        console.error("Server logout failed; clearing local authentication.")
      } finally {
        logoutRequest = null
        get().clearAuth()
      }
    })

    return logoutRequest
  },
}))

if (typeof window !== "undefined") {
  window.addEventListener("storage", (event) => {
    if (event.key === null || event.key === "accessToken" || event.key === "refreshToken") {
      const accessToken = getStoredToken("accessToken")
      const refreshToken = getStoredToken("refreshToken")
      sessionVersion += 1
      userRequest = null
      useAuthStore.setState({ accessToken, refreshToken, isAuthenticated: Boolean(accessToken), authStatus: accessToken ? "checking" : "unauthenticated", userId: null, userError: null })
      void useAuthStore.getState().loadCurrentUser()
    }
  })
}
