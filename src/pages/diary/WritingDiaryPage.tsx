import React, { useState } from "react";
import Sidebar from "../../components/common/Sidebar";
import TopBar from "../../components/common/Topbar";
import WritingDiary from "../../components/writingdiary/WritingDiary";
import UploadEmotionCard from "../../components/writingdiary/UploadEmotionCard";

const WritingDiaryPage = () => {
  const [isCompleted, setIsCompleted] = useState(false);

  const handleComplete = () => {
    setIsCompleted(true);
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex p-6 overflow-hidden">
      {/* Sidebar */}
      <div className="mr-8 mt-4 flex-shrink-0">
        <Sidebar activePage="write" />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="mb-4">
          <TopBar />
        </div>

        {/* Content Area */}
        <div className="flex flex-1 justify-center items-start space-x-6 transition-all duration-500">
          
          {/* Writing Diary */}
          <div
            className={`w-[700px] flex-shrink-0 transition-all duration-500 ${
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
            <UploadEmotionCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WritingDiaryPage;
