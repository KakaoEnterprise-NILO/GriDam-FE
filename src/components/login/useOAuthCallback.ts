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
      alert("로그인에 필요한 인가 코드 또는 상태 값이 없습니다. 다시 로그인해주세요.")
      navigate("/login")
      return
    }

    api
      .get<OAuthResponse>(endpointByProvider[provider], { params: { code, state } })
      .then(async (response) => {
        await useAuthStore.getState().startSession(response.data.result)
        alert("로그인되었습니다.")
        navigate("/")
      })
      .catch(() => {
        alert("로그인에 실패했습니다. 다시 시도해주세요.")
        navigate("/login")
      })
  }, [navigate, provider])
}
