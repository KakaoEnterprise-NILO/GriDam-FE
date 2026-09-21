import type { DiaryEntry } from "./types"

export const calendarSampleDiaries: DiaryEntry[] = [
  {
    diaryId: "test-diary-1",
    title: "오늘은 정말 행복한 하루였어!",
    content:
      "친구들과 함께 놀이공원에 갔다. 롤러코스터도 타고 맛있는 음식도 먹고... 정말 즐거운 시간이었다. 이런 날이 더 많았으면 좋겠다.",
    date: "2025-05-14",
    imageUrl: "/placeholder.svg?height=200&width=300",
    hashtags: ["놀이공원", "친구들", "즐거움", "행복"],
  },
  {
    diaryId: "test-diary-2",
    title: "화가 나는 하루",
    content:
      "오늘은 정말 짜증나는 일이 많았다. 지하철이 연착되어서 약속에 늦었고, 카페에서 주문한 음료도 잘못 나왔다. 하루 종일 기분이 좋지 않았다.",
    date: "2025-05-05",
    imageUrl: "/placeholder.svg?height=200&width=300",
    hashtags: ["짜증", "연착", "기분나쁨"],
  },
  {
    diaryId: "test-diary-3",
    title: "화가 나는 하루",
    content:
      "오늘은 조금 힘이 딸린다... 재미도 없고, 우울한 감정도 든다.. 내일의 나는 조금 괜찮아 지겠지..",
    date: "2025-05-17",
    imageUrl: "/placeholder.svg?height=200&width=300",
    hashtags: ["우울", "힘들", "파이팅팅"],
  },
]
