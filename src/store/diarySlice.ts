import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/api/axios';

export interface EmotionCardDataType {
  color: string;
  emotion: string;
  image: string;
  date: string;
  hashtags: string[];
  chartData: { name: string; value: number }[];
  diaryId: number;
}

export interface Diary {
  id: number;
  title: string;
  content: string;
  date: string;
  image?: string;
  emotion?: string;
  userUploadImage?: string;
  color?: string;
}

interface DiaryState {
  diaries: Diary[];
  emotionCards: EmotionCardDataType[];
  loading: boolean;
  error: string | null;
}

const initialState: DiaryState = {
  diaries: [],
  emotionCards: [],
  loading: false,
  error: null,
};

export const fetchDiaries = createAsyncThunk('diary/fetchDiaries', async () => {
  const response = await api.get('/diary/list');
  return response.data.result.map((item: any, index: number) => ({
    id: index,
    title: item.title,
    content: item.content,
    date: item.date,
    image: item.imageUrl,
    emotion: '',
    userUploadImage: item.imageUrl || '',
    color: '',
  }));
});

export const fetchEmotionCards = createAsyncThunk('diary/fetchEmotionCards', async () => {
  // 테스트용 더미 카드 데이터
  const dummyCards: EmotionCardDataType[] = [
    {
      diaryId: 0,
      color: 'bg-green-300',
      emotion: '기쁨',
      image: 'https://via.placeholder.com/150',
      date: '2025-06-04',
      hashtags: ['#행복', '#웃음'],
      chartData: [
        { name: '기쁨', value: 70 },
        { name: '슬픔', value: 10 },
        { name: '화남', value: 20 },
      ],
    },
    {
      diaryId: 1,
      color: 'bg-red-300',
      emotion: '슬픔',
      image: 'https://via.placeholder.com/150',
      date: '2025-06-03',
      hashtags: ['#외로움', '#비'],
      chartData: [
        { name: '슬픔', value: 80 },
        { name: '기쁨', value: 10 },
        { name: '불안', value: 10 },
      ],
    },
  ];
  return dummyCards;
});

const diarySlice = createSlice({
  name: 'diary',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDiaries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDiaries.fulfilled, (state, action) => {
        state.loading = false;
        state.diaries = action.payload;
      })
      .addCase(fetchDiaries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch diaries';
      })
      .addCase(fetchEmotionCards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmotionCards.fulfilled, (state, action) => {
        state.loading = false;
        state.emotionCards = action.payload;
      })
      .addCase(fetchEmotionCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch emotion cards';
      });
  },
});

export default diarySlice.reducer;
