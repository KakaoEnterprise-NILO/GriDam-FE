// src/store/diaryStore.ts

import { create } from 'zustand';

type Diary = {
  id: number;
  title: string;
  content: string;
  emotion: string; // ex: '기쁨'
  userUploadImage: string;
  image: string;
  color: string;
  date: string; // '2025-03-28'
  hashtags: string[];
  chartData: { name: string; value: number }[];
};

type DiaryState = {
  diaries: Diary[];
  addDiary: (diary: Diary) => void;
  getDiaryByDate: (date: string) => Diary[];
};



// 예시 데이터 //
export const useDiaryStore = create<DiaryState>((set, get) => ({
  diaries: [
    {
      id: 1,
      title: '점심1',
      content: `오늘 밥을 먹었다. 맛있었다...
오늘 밥을 먹었다. 맛있었다...
오늘 밥을 먹었다. 맛있었다...
오늘 밥을 먹었다. 맛있었다...
오늘 밥을 먹었다. 맛있었다...
오늘 밥을 먹었다. 맛있었다...
오늘 밥을 먹었다. 맛있었다...
오늘 밥을 먹었다. 맛있었다...`,
      emotion: '기쁨',
      userUploadImage: '/sea.avif',
      image: '/emotioncard_image.png',
      color: 'bg-green-300',
      date: '2025-05-01',
      hashtags: ['기쁨', '행복', '맛점'],
      chartData: [
        { name: '기쁨', value: 30 },
        { name: '슬픔', value: 20 },
        { name: '분노', value: 30 },
        { name: '놀람', value: 20 },
      ],
    },
    {
      id: 2,
      title: '중간고사2',
      content: '오늘은 아침에 눈을 뜨자마자 ...',
      emotion: '우울',
      userUploadImage: '/logo.png',
      image: '/우울한.jpg',
      color: 'bg-purple-300',
      date: '2025-05-02',
      hashtags: ['우울', '시험', '피곤'],
      chartData: [
        { name: '우울', value: 60 },
        { name: '기쁨', value: 20 },
        { name: '분노', value: 10 },
        { name: '불안', value: 10 },
      ],
    },
    {
      id: 3,
      title: '점심1',
      content: `오늘 밥을 먹었다. 맛있었다...
      오늘 밥을 먹었다. 맛있었다...`,
      emotion: '기쁨',
      userUploadImage: '/logo.png',
      image: '/logo.png',
      color: 'bg-yellow-300',
      date: '2025-05-03',
      hashtags: ['기쁨', '행복', '맛점'],
      chartData: [
        { name: '기쁨', value: 20 },
        { name: '슬픔', value: 20 },
        { name: '분노', value: 40 },
        { name: '놀람', value: 20 },
      ],
    },
    {
      id: 4,
      title: '중간고사2',
      content: '오늘은 아침에 눈을 뜨자마자 ...',
      emotion: '우울',
      userUploadImage: '/logo.png',
      image: '/logo.png',
      color: 'bg-purple-300',
      date: '2025-05-05',
      hashtags: ['우울', '시험', '피곤'],
      chartData: [
        { name: '우울', value: 60 },
        { name: '기쁨', value: 20 },
        { name: '분노', value: 10 },
        { name: '불안', value: 10 },
      ],
    },
    {
      id: 5,
      title: '점심1',
      content: `오늘 밥을 먹었다. 맛있었다...
      오늘 밥을 먹었다. 맛있었다...`,
      emotion: '기쁨',
      userUploadImage: '/logo.png',
      image: '/logo.png',
      color: 'bg-green-300',
      date: '2025-05-10',
      hashtags: ['기쁨', '행복', '맛점'],
      chartData: [
        { name: '기쁨', value: 70 },
        { name: '슬픔', value: 10 },
        { name: '분노', value: 10 },
        { name: '놀람', value: 10 },
      ],
    },
    {
      id: 6,
      title: '중간고사2',
      content: '오늘은 아침에 눈을 뜨자마자 ...',
      emotion: '우울',
      userUploadImage: '/logo.png',
      image: '/logo.png',
      color: 'bg-purple-300',
      date: '2025-03-28',
      hashtags: ['우울', '시험', '피곤'],
      chartData: [
        { name: '우울', value: 60 },
        { name: '기쁨', value: 20 },
        { name: '분노', value: 10 },
        { name: '불안', value: 10 },
      ],
    },
    {
      id: 7,
      title: '중간고사2',
      content: '오늘은 아침에 눈을 뜨자마자 ...',
      emotion: '우울',
      userUploadImage: '/logo.png',
      image: '/logo.png',
      color: 'bg-purple-300',
      date: '2025-04-03',
      hashtags: ['우울', '시험', '피곤'],
      chartData: [
        { name: '우울', value: 60 },
        { name: '기쁨', value: 20 },
        { name: '분노', value: 10 },
        { name: '불안', value: 10 },
      ],
    },
    {
      id: 8,
      title: '개발',
      content: '오늘은 아침에 눈을 뜨자마자 ...',
      emotion: '분노',
      userUploadImage: '/logo.png',
      image: '/logo.png',
      color: 'bg-red-300',
      date: '2025-05-14',
      hashtags: ['개발', '분노', '힘듬'],
      chartData: [
        { name: '우울', value: 30 },
        { name: '기쁨', value: 0 },
        { name: '분노', value: 60 },
        { name: '불안', value: 10 },
      ],
    },
  ],
  addDiary: (diary) => set({ diaries: [...get().diaries, diary] }),
  getDiaryByDate: (date) => get().diaries.filter((diary) => diary.date === date),
}));
