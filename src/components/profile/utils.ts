import type { UserInfo } from "@/types/profile"

export function getProfileIntroduction(user: UserInfo): string {
  return user.introduction || `일기 ${user.diaryCount}개 작성`
}
