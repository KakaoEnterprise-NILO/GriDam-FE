import { useRef, useCallback, useState, useEffect } from "react"

// 샘플 데이터 타입 정의
export interface EmotionWordCloud {
  emotion: string
  url: string
}

interface UserInfo {
  userId: string
  userName: string
  diaryCount: number
  followerCount: number
}

 // 샘플 사용자 데이터
 const sampleUserInfo: UserInfo = {
   userId: "user123",
   userName: "김범진",
   diaryCount: 1,
   followerCount: 3,
 }

 // 샘플 워드클라우드 데이터
 const sampleWordClouds: EmotionWordCloud[] = [
   {
     emotion: "행복",
     url: "/wordcloud.png",
   },
   {
     emotion: "불안",
     url: "/wordcloud2.png",
   },
   {
     emotion: "화남",
     url: "/wordcloud3.png",
   },
   {
     emotion: "기쁨",
     url: "/wordcloud.png",
   },
   {
     emotion: "슬픔",
     url: "/wordcloud.png",
   },
   {
     emotion: "놀람",
     url: "/wordcloud.png",
   },
   {
     emotion: "역겨움",
     url: "/wordcloud.png",
   },
   {
     emotion: "두려움",
     url: "/wordcloud.png",
   },
 ]

// Resolve cancelled delays too, so awaiting tasks can finish without updating state.
function waitForDelay(milliseconds: number, signal: AbortSignal): Promise<void> {
  return new Promise((resolve) => {
    if (signal.aborted) {
      resolve()
      return
    }
    const finish = () => {
      clearTimeout(timeout)
      signal.removeEventListener("abort", finish)
      resolve()
    }
    const timeout = setTimeout(finish, milliseconds)
    signal.addEventListener("abort", finish, { once: true })
  })
}

export function useWordCloudStatistics() {
  const lifecycleRef = useRef<AbortController | null>(null)
  const [wordClouds, setWordClouds] = useState<EmotionWordCloud[]>([])
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [generatedAt, setGeneratedAt] = useState<string>("")
  const [nextGeneration, setNextGeneration] = useState<string>("")

  // 사용자 정보 가져오기 (샘플 데이터 사용)
  const fetchUserInfo = useCallback(async () => {
    const signal = lifecycleRef.current?.signal
    if (!signal || signal.aborted) return null
    try {
      // 실제 API 호출 시뮬레이션
      await waitForDelay(500, signal)
      if (signal.aborted) return null
      setUserInfo(sampleUserInfo)
      return sampleUserInfo.userId
    } catch (error) {
      console.error("사용자 정보 불러오기 실패:", error)
      return null
    }
  }, [])

  const fetchWordCloud = useCallback(async () => {
    const signal = lifecycleRef.current?.signal
    if (!signal || signal.aborted) return
    try {
      setLoading(true)
      // 실제 API 호출 시뮬레이션
      await waitForDelay(1000, signal)
      if (signal.aborted) return

      setWordClouds(sampleWordClouds)
      setGeneratedAt(new Date().toISOString())

      // 다음 생성 가능 시간 (24시간 후)
      const nextGen = new Date()
      nextGen.setHours(nextGen.getHours() + 24)
      setNextGeneration(nextGen.toISOString())

    } catch (error) {
      console.error("워드클라우드 불러오기 실패:", error)
    } finally {
      if (!signal.aborted) setLoading(false)
    }
  }, [])

  const handleGenerateWordCloud = async () => {
    const signal = lifecycleRef.current?.signal
    if (!signal || signal.aborted) return
    try {
      setGenerating(true)

      let userId: string | null | undefined
      if (!userInfo) {
        userId = await fetchUserInfo()
        if (signal.aborted) return
        if (!userId) {
          console.error("사용자 ID를 가져올 수 없습니다")
          return
        }
      }

      // 실제 API 호출 시뮬레이션
      await waitForDelay(2000, signal)
      if (signal.aborted) return

      // 새로운 워드클라우드 생성 (랜덤하게 일부만 표시)
      const shuffled = [...sampleWordClouds].sort(() => 0.5 - Math.random())
      const newWordClouds = shuffled.slice(0, Math.floor(Math.random() * 4) + 3)

      setWordClouds(newWordClouds)
      setGeneratedAt(new Date().toISOString())

      const nextGen = new Date()
      nextGen.setHours(nextGen.getHours() + 24)
      setNextGeneration(nextGen.toISOString())

    } catch (error) {
      console.error("워드클라우드 생성 실패:", error)
    } finally {
      if (!signal.aborted) setGenerating(false)
    }
  }

  useEffect(() => {
    const controller = new AbortController()
    lifecycleRef.current = controller
    const initializeData = async () => {
      await fetchUserInfo()
      if (controller.signal.aborted) return
      await fetchWordCloud()
    }
    initializeData()
    return () => controller.abort()
  }, [fetchUserInfo, fetchWordCloud])

  return { wordClouds, userInfo, loading, generating, generatedAt, nextGeneration, fetchWordCloud, handleGenerateWordCloud }
}
