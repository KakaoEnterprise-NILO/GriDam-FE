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
  hashtags?: string[];
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
    id: item.id ?? index,
    title: item.title,
    content: item.content,
    date: item.date,
    image: item.imageUrl,
    emotion: '',
    userUploadImage: item.imageUrl || '',
    color: '',
    hashtags: item.hashtags || [],
  }));
});

export const fetchEmotionCards = createAsyncThunk('diary/fetchEmotionCards', async () => {
  const response = await api.get('/emotion-cards');
  return response.data.data.result;
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
