import React, { useState } from "react";
import Sidebar from "../../components/common/Sidebar";
import TopBar from "../../components/common/Topbar";
import WritingDiary from "../../components/writingdiary/WritingDiary";
import UploadEmotionCard from "../../components/writingdiary/UploadEmotionCard";
import EmotionPreviewCard from "../../components/writingdiary/EmotionPreviewCard";

const WritingDiaryPage = () => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleComplete = () => {
    setIsCompleted(true);
  };

  const handlePreviewOpen = () => {
    setIsPreviewOpen(true);
  };

  const handlePreviewClose = () => {
    setIsPreviewOpen(false);
  };

  return (
    <div className="relative min-h-screen bg-[#F5F7FA] flex p-6 overflow-hidden">
      
      {/* 어두운 배경 + 블러 효과 */}
      {isPreviewOpen && (
        <div className="absolute inset-0 backdrop-blur-sm bg-gray-600 bg-opacity-10 z-30 transition-opacity duration-300"></div>
      )}

      {/* Sidebar */}
      <div
        className={`mr-8 mt-4 flex-shrink-0 z-20 transition-all duration-300 ${
          isPreviewOpen ? "opacity-50 pointer-events-none" : "opacity-100"
        }`}
      >
        <Sidebar activePage="write" />
      </div>

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col z-20 transition-all duration-300 ${
          isPreviewOpen ? "opacity-50 pointer-events-none" : "opacity-100"
        }`}
      >
        {/* Top Bar */}
        <div className="mb-4">
          <TopBar />
        </div>

        {/* Content Area */}
        <div className="flex flex-1 justify-center items-start space-x-6 transition-all duration-500">
          {/* Writing Diary */}
          <div
            className={`w-[700px] flex-shrink-0 transition-transform duration-500 ${
              isCompleted ? "translate-x-[-50px]" : "translate-x-[+200px]"
            }`}
          >
            <WritingDiary onComplete={handleComplete} />
          </div>

          {/* Upload Emotion Card */}
          <div
            className={`w-[600px] flex-shrink-0 transition-opacity duration-500 ${
              isCompleted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
            }`}
          >
            <UploadEmotionCard onPreview={handlePreviewOpen} />
          </div>
        </div>
      </div>

      {/* 미리보기 모달 */}
      {isPreviewOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-40">
          <EmotionPreviewCard onClose={handlePreviewClose} />
        </div>
      )}
    </div>
  );
};

export default WritingDiaryPage;
