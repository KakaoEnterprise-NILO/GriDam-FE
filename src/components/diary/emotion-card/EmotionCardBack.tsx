import { BarChart3, X } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import CustomTooltip from "../CustomTooltip";
import type { EmotionCardProps, EmotionChartData } from "./types";
export default function EmotionCardBack({
  front,
  back,
  chartData,
  onClose,
}: {
  front: EmotionCardProps["front"];
  back: EmotionCardProps["back"];
  chartData: EmotionChartData[];
  onClose?: () => void;
}) {
  return (
    <div
      className="absolute w-full h-full rounded-2xl shadow-2xl bg-gradient-to-br from-slate-50 via-white to-gray-50 overflow-hidden"
      style={{
        backfaceVisibility: "hidden",
        transform: "rotateY(180deg)",
        position: "absolute",
        top: 0,
        left: 0,
      }}
    >
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 border-2 border-purple-300 rounded-full"></div>
        <div className="absolute top-32 right-16 w-16 h-16 border-2 border-blue-300 rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 border-2 border-pink-300 rounded-full"></div>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose?.();
        }}
        className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm text-gray-600 hover:text-gray-800 hover:bg-white transition-all duration-200 shadow-lg z-10"
      >
        <X size={20} />
      </button>
      <div className="p-8 h-full flex flex-col">
        <div className="text-center mb-6">
          <div
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold text-lg shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${back.color}, ${back.color}dd)`,
              boxShadow: `0 8px 32px ${back.color}40`,
            }}
          >
            <BarChart3 size={18} />
            {front.emotion} 분석
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="bg-white rounded-xl p-4 shadow-lg ring-1 ring-gray-100 w-full">
            <h3 className="text-lg font-bold text-gray-800 text-center mb-4 flex items-center justify-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
              감정 구성 비율
              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </h3>
            {chartData.length > 0 ? (
              <div className="flex justify-center">
                <ResponsiveContainer width={300} height={220}>
                  <PieChart>
                    <Pie
                      data={chartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={60}
                      innerRadius={20}
                      stroke="#ffffff"
                      strokeWidth={2}
                    >
                      {chartData.map((entry) => (
                        <Cell key={entry.name} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                      verticalAlign="bottom"
                      height={36}
                      formatter={(value, entry) => (
                        <span style={{ color: entry.color, fontSize: "12px" }}>
                          {value} ({entry.payload?.value}%)
                        </span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="flex items-center justify-center h-48 text-gray-400">
                <div className="text-center">
                  <BarChart3 size={48} className="mx-auto mb-2 opacity-50" />
                  <p className="text-sm">감정 분석 데이터가 없습니다</p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="space-y-4">
          <div className="text-center">
            <div className="flex flex-wrap justify-center gap-2">
              {back.hashtags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 rounded-full text-sm font-medium border border-gray-200 shadow-sm"
                >
                  #{tag.replace(/^#/, "")}
                </span>
              ))}
            </div>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-gradient-to-r from-green-400 to-blue-400 rounded-full animate-pulse"></span>
              카드를 터치하여 돌아가기
              <span className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"></span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
