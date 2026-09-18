import { Calendar } from "lucide-react";
export default function StatisticsGenerationInfo({
  generatedAt,
  nextGeneration,
  formatDate,
}: {
  generatedAt: string;
  nextGeneration: string;
  formatDate: (value: string) => string;
}) {
  if (!generatedAt) return null;
  return (
    <div className="bg-gray-50 rounded-2xl p-6 mb-8">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-600">
            마지막 생성: {formatDate(generatedAt)}
          </span>
        </div>
        {nextGeneration && <div className="flex items-center gap-2"></div>}
      </div>
    </div>
  );
}
