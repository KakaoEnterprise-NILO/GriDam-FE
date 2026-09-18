"use client";
import MainLayout from "@/components/common/MainLayout";
import WordCloudGrid from "@/components/statistics/WordCloudGrid";
import WordCloudModal from "@/components/statistics/WordCloudModal";
import StatisticsHeader from "@/components/statistics/StatisticsHeader";
import StatisticsLoading from "@/components/statistics/StatisticsLoading";
import StatisticsGenerationInfo from "@/components/statistics/StatisticsGenerationInfo";
import { useWordCloudStatistics } from "@/hooks/useWordCloudStatistics";
import { useStatisticsImageModal } from "@/components/statistics/useStatisticsImageModal";
import {
  formatStatisticsDate,
  getEmotionColor,
  getEmotionCardColor,
} from "@/utils/statistics";
export default function StatisticsPage() {
  const statistics = useWordCloudStatistics();
  const modal = useStatisticsImageModal();
  if (statistics.loading)
    return (
      <MainLayout>
        <StatisticsLoading />
      </MainLayout>
    );
  return (
    <MainLayout>
      <div className="ml-2 w-full bg-white rounded-3xl shadow-lg max-w-6xl mx-auto px-6 md:px-10 py-8">
        <StatisticsHeader
          userInfo={statistics.userInfo}
          loading={statistics.loading}
          generating={statistics.generating}
          onRefresh={statistics.fetchWordCloud}
          onGenerate={statistics.handleGenerateWordCloud}
        />
        <StatisticsGenerationInfo
          generatedAt={statistics.generatedAt}
          nextGeneration={statistics.nextGeneration}
          formatDate={formatStatisticsDate}
        />
        <WordCloudGrid
          wordClouds={statistics.wordClouds}
          generating={statistics.generating}
          handleGenerateWordCloud={statistics.handleGenerateWordCloud}
          handleImageClick={modal.openImage}
          getEmotionColor={getEmotionColor}
          getEmotionCardColor={getEmotionCardColor}
        />
        <WordCloudModal
          selectedImage={modal.selectedImage}
          closeModal={modal.closeImage}
          getEmotionColor={getEmotionColor}
          getEmotionCardColor={getEmotionCardColor}
        />
      </div>
    </MainLayout>
  );
}
