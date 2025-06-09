import { Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./pages/home/Home";
// import HomeMyDiary from "./pages/home/HomeMyDiary";
import Register from "./pages/login/Register";
import Login from "./pages/login/Login";
import KakaoCallback from './pages/login/KakaoCallback';
import NaverCallback from './pages/login/NaverCallback';
import WritingDiaryPage from "./pages/diary/WritingDiaryPage";
import Calendar from "./pages/calendar/Calendar";
import FeedList from './pages/feed/FeedList';
import EmotionCardPost2 from "./components/feed/EmotionCardPost2";
import MyProfile from "./pages/profile/MyProfile";

import NotificationPage from "./pages/alarm/NotificationPage";
import NotificationTest from "./test/TestNotification";
import ConfigurationPage from "./pages/configuration/ConfigurationPage";
import HomeMyDiary from "./pages/home/HomeMyDiary";
import EmotionCardTest from "./test/emotionCardTest";

import FeedEntire from "./pages/feed/FeedEntire";
import Statistics from "./pages/statistics/statistics";


function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Routes>  
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />        
        <Route path="/login/oauth/kakao/callback" element={<KakaoCallback />} />
        <Route path="/login/oauth/naver/callback" element={<NaverCallback />} />

        <Route path="/calendar" element={<Calendar />} />
        <Route path="/register" element={<Register />} />
        <Route path="/diary/write" element={<WritingDiaryPage/>} />
        <Route path="/profile" element={<MyProfile/>} />

        <Route path="/friends/feed" element={<FeedList/>} />
        <Route path="/friend/list/feed/entire/:id" element={<EmotionCardPost2/>} />
        <Route path="/friend/feed/entire/1" element={<FeedEntire/>} />
        <Route path="/alarm" element={<NotificationPage/>} />
        <Route path="/setting" element={<ConfigurationPage/>} />
        <Route path="/homeDiary" element={<HomeMyDiary />} />

        <Route path="/statistics" element={<Statistics />} />



        {/* 테스트 */}
        <Route path="/notification_test" element={<NotificationTest />} />
{/*         <Route path="/alluser" element={<AllUsersPage />} /> */}
        
        <Route path="/test/emotion-cards" element={<EmotionCardTest />} />

      </Routes>
    </div>
  );
}

export default App;
