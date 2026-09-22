import { BarChart3, ChevronRight } from "lucide-react";
interface Props {
  year: number;
  month: number;
  onMonthClick: () => void;
  onStatisticsClick: () => void;
}
export default function CalendarHeader({
  year,
  month,
  onMonthClick,
  onStatisticsClick,
}: Props) {
  return (
    <div className="flex justify-between items-center mb-8">
      <button type="button"
        onClick={onMonthClick}
        className="flex items-center text-2xl font-bold text-gray-800 hover:text-gray-600 transition-colors"
      >
        {year}년 {month}월<ChevronRight className="ml-2 w-6 h-6" />
      </button>
      <button type="button"
        onClick={onStatisticsClick}
        className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-medium shadow-md transition-all duration-200 transform hover:scale-105"
      >
        <BarChart3 className="w-5 h-5" />
        통계
      </button>
    </div>
  );
}
