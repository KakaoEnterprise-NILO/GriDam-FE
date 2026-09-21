import { useOAuthCallback } from "@/components/login/useOAuthCallback"

export default function NaverCallback() {
  useOAuthCallback("naver")

  return <div>로그인 중입니다...</div>
}
