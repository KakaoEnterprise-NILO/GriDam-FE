import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDiaries, fetchEmotionCards, EmotionCardDataType } from '@/store/diarySlice';
import { RootState, AppDispatch } from '@/store';

import MainLayout from '../../components/common/MainLayout';
import DiaryCard from '../../components/diary/DiaryCard';
import DiaryPagination from '../../components/diary/DiaryPagination';

export default function HomeMyDiary() {
  const dispatch = useDispatch<AppDispatch>();
  const { diaries, emotionCards, loading, error } = useSelector((state: RootState) => state.diary);
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 3;

  useEffect(() => {
    dispatch(fetchDiaries());
    dispatch(fetchEmotionCards());
  }, [dispatch]);

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const currentDiaries = diaries.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const maxPage = Math.ceil(diaries.length / ITEMS_PER_PAGE);

  const handlePrev = () => page > 1 && setPage(page - 1);
  const handleNext = () => page < maxPage && setPage(page + 1);

  return (
    <MainLayout>
      <div className="mr-30 p-6 space-y-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">나의 일기</h1>
          <DiaryPagination page={page} maxPage={maxPage} onPrev={handlePrev} onNext={handleNext} />
          <div className="w-24" />
        </div>

        {loading && <p>불러오는 중...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="space-y-4">
          {currentDiaries.map((diary) => {
            const relatedCard = emotionCards.find((card) => card.diaryId === diary.id);

            return (
              <DiaryCard
                key={diary.id}
                id={diary.id}
                title={diary.title}
                content={diary.content}
                emotion={relatedCard?.emotion || diary.emotion || ''}
                date={diary.date}
                userUploadImage={diary.userUploadImage || ''}
                image={diary.image || ''}
                color={relatedCard?.color || diary.color || ''}
                emotionCard={relatedCard}
              />
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
}
