import { useAuthStore } from "./store/authStore";
import { lazy, Suspense, useEffect } from "react";
import RouteLoading from "./components/common/RouteLoading";
import { Routes, Route } from "react-router-dom";
import "./App.css";

const HomePage = lazy(() => import("./pages/home/HomePage"));
const RegisterPage = lazy(() => import("./pages/login/RegisterPage"));
const LoginPage = lazy(() => import("./pages/login/LoginPage"));
const KakaoCallbackPage = lazy(() => import("./pages/login/KakaoCallbackPage"));
const NaverCallbackPage = lazy(() => import("./pages/login/NaverCallbackPage"));
const WritingDiaryPage = lazy(() => import("./pages/diary/WritingDiaryPage"));
const CalendarPage = lazy(() => import("./pages/calendar/CalendarPage"));
const FeedListPage = lazy(() => import("./pages/feed/FeedListPage"));
const EmotionCardPostDetailPage = lazy(() => import("./pages/feed/EmotionCardPostDetailPage"));
const ProfilePage = lazy(() => import("./pages/profile/ProfilePage"));
const NotificationPage = lazy(() => import("./pages/notification/NotificationPage"));
const ConfigurationPage = lazy(() => import("./pages/configuration/ConfigurationPage"));
const HomeMyDiaryPage = lazy(() => import("./pages/home/HomeMyDiaryPage"));
const StatisticsPage = lazy(() => import("./pages/statistics/StatisticsPage"));

function App() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const loadCurrentUser = useAuthStore((state) => state.loadCurrentUser);
  useEffect(() => {
    if (accessToken) void loadCurrentUser();
  }, [accessToken, loadCurrentUser]);

  return (
    <div className="min-h-screen flex flex-col">
      <Suspense fallback={<RouteLoading />}>
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
          <Route path="/profile" element={<ProfilePage />} />

          <Route path="/friends/feed" element={<FeedListPage />} />
          <Route
            path="/friend/list/feed/entire/:id"
            element={<EmotionCardPostDetailPage />}
          />
          <Route path="/alarm" element={<NotificationPage />} />
          <Route path="/setting" element={<ConfigurationPage />} />
          <Route path="/homeDiary" element={<HomeMyDiaryPage />} />
          <Route path="/statistics" element={<StatisticsPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}
export default App;
