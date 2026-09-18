import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import api from "@/api/axios"
import { useAuthStore } from "@/store/authStore"

type OAuthProvider = "kakao" | "naver"

type OAuthResponse = {
  result: {
    accessToken: string
    refreshToken: string
  }
}

const endpointByProvider: Record<OAuthProvider, string> = {
  kakao: "/auth/login/kakao",
  naver: "/auth/login/naver",
}

export function useOAuthCallback(provider: OAuthProvider) {
  const navigate = useNavigate()
  const hasRequestedRef = useRef(false)

  useEffect(() => {
    if (hasRequestedRef.current) return
    hasRequestedRef.current = true

    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get("code")
    const state = urlParams.get("state")

    if (!code || !state) {
      alert("?멸? 肄붾뱶媛 ?놁뒿?덈떎.")
      navigate("/login")
      return
    }

    api
      .get<OAuthResponse>(endpointByProvider[provider], { params: { code, state } })
      .then((response) => {
        useAuthStore.getState().setTokens(response.data.result)
        alert("濡쒓렇???깃났")
        navigate("/")
      })
      .catch(() => {
        alert("濡쒓렇???ㅽ뙣")
        navigate("/login")
      })
  }, [navigate, provider])
}
