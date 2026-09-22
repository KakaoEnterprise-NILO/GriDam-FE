import { useOAuthCallback, type OAuthProvider } from "@/components/login/useOAuthCallback"

interface OAuthCallbackPageProps {
  provider: OAuthProvider
}

export default function OAuthCallbackPage({ provider }: OAuthCallbackPageProps) {
  useOAuthCallback(provider)

  return <div>로그인 중입니다...</div>
}
