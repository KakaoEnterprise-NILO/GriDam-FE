import { useOAuthCallback } from "@/components/login/useOAuthCallback"

export default function KakaoCallback() {
  useOAuthCallback("kakao")

  return <div>로그인 중입니다...</div>
}
