// src/pages/HomeMyDiary.tsx
import MainLayout from '../../components/common/MainLayout';
import DiaryCard from '../../components/diary/DiaryCard';
import { useDiaryStore } from '@/store/diaryStore'; // ✅ 전역 상태 가져오기
import { useState } from 'react';
import DiaryPagination from '../../components/diary/DiaryPagination';

export default function Home() {
  const diaries = useDiaryStore((state) => state.diaries); // ✅ Zustand 상태 가져오기
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 3;

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const currentDiaries = diaries.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const maxPage = Math.ceil(diaries.length / ITEMS_PER_PAGE);

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < maxPage) setPage(page + 1);
  };

  return (
    <MainLayout>
      <div className="mr-30 p-6 space-y-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">나의 일기</h1>
          <DiaryPagination page={page} maxPage={maxPage} onPrev={handlePrev} onNext={handleNext} />
          <div className="w-24" />
        </div>

        <div className="space-y-4">
          {currentDiaries.map((diary) => (
            <DiaryCard
              key={diary.id}
              id={diary.id} // ✅ id도 전달
              title={diary.title}
              content={diary.content}
              emotion={diary.emotion}
              date={diary.date}
              userUploadImage={diary.userUploadImage}
              image={diary.image}
              color={diary.color}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
