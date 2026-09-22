export const formatStatisticsDate = (dateString: string) =>
  dateString
    ? new Date(dateString).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";
export const getEmotionColor = (emotion: string) =>
  ({
    행복: "bg-yellow-50 text-yellow-700 border-yellow-200",
    기쁨: "bg-amber-50 text-amber-700 border-amber-200",
    슬픔: "bg-blue-50 text-blue-700 border-blue-200",
    불안: "bg-purple-50 text-purple-700 border-purple-200",
    화남: "bg-red-50 text-red-700 border-red-200",
    놀람: "bg-orange-50 text-orange-700 border-orange-200",
    역겨움: "bg-green-50 text-green-700 border-green-200",
    두려움: "bg-gray-50 text-gray-700 border-gray-200",
    없음: "bg-slate-50 text-slate-700 border-slate-200",
  })[emotion] || "bg-gray-50 text-gray-700 border-gray-200";
export const getEmotionCardColor = (emotion: string) =>
  ({
    행복: "bg-gradient-to-br from-yellow-100 to-yellow-200 border-yellow-300",
    기쁨: "bg-gradient-to-br from-amber-100 to-amber-200 border-amber-300",
    슬픔: "bg-gradient-to-br from-blue-100 to-blue-200 border-blue-300",
    불안: "bg-gradient-to-br from-purple-100 to-purple-200 border-purple-300",
    화남: "bg-gradient-to-br from-red-100 to-red-200 border-red-300",
    놀람: "bg-gradient-to-br from-orange-100 to-orange-200 border-orange-300",
    역겨움: "bg-gradient-to-br from-green-100 to-green-200 border-green-300",
    두려움: "bg-gradient-to-br from-gray-100 to-gray-200 border-gray-300",
    없음: "bg-gradient-to-br from-slate-100 to-slate-200 border-slate-300",
  })[emotion] || "bg-gradient-to-br from-gray-100 to-gray-200 border-gray-300";
