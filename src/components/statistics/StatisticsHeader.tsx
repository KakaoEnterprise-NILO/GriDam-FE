import type { UserInfo } from "@/components/statistics/types";
import { BarChart3, RefreshCw, Sparkles } from "lucide-react";
interface Props {
  userInfo: UserInfo | null;
  loading: boolean;
  generating: boolean;
  onRefresh: () => void;
  onGenerate: () => void;
}
export default function StatisticsHeader({
  userInfo,
  loading,
  generating,
  onRefresh,
  onGenerate,
}: Props) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-3 text-gray-800">
          <BarChart3 className="h-6 w-6 text-blue-500" />
          통계
          {userInfo && (
            <span className="text-lg font-normal text-gray-600">
              - {userInfo.userName}님
            </span>
          )}
        </h1>
        <p className="text-gray-600 mt-2">
          일기에서 추출한 감정별 키워드를 확인해보세요
        </p>
        {userInfo && (
          <p className="text-sm text-gray-500 mt-1">
            총 {userInfo.diaryCount}개의 일기 작성 • {userInfo.followerCount}
            명의 팔로워
          </p>
        )}
      </div>
      <div className="flex gap-3">
        <button type="button"
          onClick={onRefresh}
          disabled={loading}
          className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl transition-colors font-medium disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          새로고침
        </button>
        <button type="button"
          onClick={onGenerate}
          disabled={generating}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-2 rounded-xl font-medium shadow-md transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
        >
          <Sparkles
            className={`h-4 w-4 ${generating ? "animate-pulse" : ""}`}
          />
          {generating ? "생성 중..." : "새로 생성"}
        </button>
      </div>
    </div>
  );
}
