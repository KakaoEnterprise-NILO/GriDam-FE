import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

import EmotionChart from "./statistics-popup/EmotionChart";
import EmotionDistribution from "./statistics-popup/EmotionDistribution";
import {
  StatisticsEmptyState,
  StatisticsHeader,
  StatisticsSummary,
} from "./statistics-popup/StatisticsChrome";
import type { StatisticsPopupProps } from "./statistics-popup/types";
import { getStatisticsData } from "./statistics-popup/utils";

export default function StatisticsPopup({
  open,
  onClose,
  data,
  year,
  month,
}: StatisticsPopupProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const { chartData, displayData, totalEntries, summary } =
    getStatisticsData(data);

  const handleEmotionClick = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => !nextOpen && onClose()}
    >
      <DialogContent
        showClose={false}
        className="w-full max-w-3xl gap-0 overflow-hidden rounded-3xl bg-white p-0 shadow-2xl"
      >
        <DialogTitle className="sr-only">
          {year}년 {month}월 감정 통계
        </DialogTitle>

        <DialogDescription className="sr-only">
          선택한 달의 감정 분포와 통계를 확인합니다.
        </DialogDescription>

        <StatisticsHeader year={year} month={month} onClose={onClose} />

        <div className="p-6 md:p-8">
          {displayData.length === 0 ? (
            <StatisticsEmptyState />
          ) : (
            <div className="flex flex-col items-center gap-8 md:flex-row">
              <EmotionChart
                data={chartData}
                cellData={displayData}
                totalEntries={totalEntries}
                activeIndex={activeIndex}
                onActiveChange={setActiveIndex}
              />

              <EmotionDistribution
                data={displayData}
                totalEntries={totalEntries}
                activeIndex={activeIndex}
                onSelect={handleEmotionClick}
              />
            </div>
          )}
        </div>

        <StatisticsSummary summary={summary} />
      </DialogContent>
    </Dialog>
  );
}
