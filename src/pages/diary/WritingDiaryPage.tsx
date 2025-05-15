import React from 'react';
import NavBar from '../../components/common/Navbar';
import TopBar from '../../components/common/Topbar';
import WritingDiary from '../../components/writingdiary/WritingDiary';

const WritingDiaryPage = () => {
  return (
    <div className="min-h-screen bg-[#F5F7FA] flex p-6">
      {/* Sidebar */}
      <div className="mr-8 mt-4 flex-shrink-0 flex flex-col justify-between h-full pb-8">
        <NavBar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="mb-4">
          <TopBar />
        </div>

        {/* Content */}
        <div className="flex justify-center items-start mt-2">
          <WritingDiary />
        </div>
      </div>
    </div>
  );
};

export default WritingDiaryPage;

