import { Routes, Route } from "react-router-dom";
import "./App.css";

import HomePage from "./pages/home/HomePage";
import RegisterPage from "./pages/login/RegisterPage";
import LoginPage from "./pages/login/LoginPage";
import KakaoCallbackPage from "./pages/login/KakaoCallbackPage";
import NaverCallbackPage from "./pages/login/NaverCallbackPage";
import WritingDiaryPage from "./pages/diary/WritingDiaryPage";
import CalendarPage from "./pages/calendar/CalendarPage";
import FeedListPage from "./pages/feed/FeedListPage";
import EmotionCardPostPage from "./components/feed/EmotionCardPost2";
import MyProfilePage from "./pages/profile/MyProfilePage";
import NotificationPage from "./pages/notification/NotificationPage";
import ConfigurationPage from "./pages/configuration/ConfigurationPage";
import HomeMyDiaryPage from "./pages/home/HomeMyDiaryPage";
import FeedEntirePage from "./pages/feed/FeedEntirePage";
import StatisticsPage from "./pages/statistics/StatisticsPage";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/login/oauth/kakao/callback"
          element={<KakaoCallbackPage />}
        />
        <Route
          path="/login/oauth/naver/callback"
          element={<NaverCallbackPage />}
        />

        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/diary/write" element={<WritingDiaryPage />} />
        <Route path="/profile" element={<MyProfilePage />} />

        <Route path="/friends/feed" element={<FeedListPage />} />
        <Route
          path="/friend/list/feed/entire/:id"
          element={<EmotionCardPostPage />}
        />
        <Route
          path="/friend/feed/entire/1"
          element={<FeedEntirePage />}
        />
        <Route path="/alarm" element={<NotificationPage />} />
        <Route path="/setting" element={<ConfigurationPage />} />
        <Route path="/homeDiary" element={<HomeMyDiaryPage />} />
        <Route path="/statistics" element={<StatisticsPage />} />
      </Routes>
    </div>
  );
}
export default App;
