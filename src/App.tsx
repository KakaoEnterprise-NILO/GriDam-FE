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
import FriendProfile from "./pages/profile/FriendProfile";

import NotificationPage from "./pages/alarm/NotificationPage";

import AllUsersPage from "./components/follow/AllUsersPage";


function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Routes>  
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />        
        <Route path="/login/oauth/kakao/callback" element={<KakaoCallback />} />
        <Route path="/login/oauth/naver/callback" element={<NaverCallback />} />
       
        <Route path="/alluser" element={<AllUsersPage />} />    

        <Route path="/calendar" element={<Calendar />} />
        <Route path="/register" element={<Register />} />
        <Route path="/diary/write" element={<WritingDiaryPage/>} />
        <Route path="/profile" element={<MyProfile/>} />
        <Route path="/profile/friend" element={<FriendProfile/>} />

        <Route path="/friends/feed" element={<FeedList/>} />
        <Route path="/friend/list/feed/entire/:id" element={<EmotionCardPost2/>} />
        <Route path="/alarm" element={<NotificationPage/>} />



      </Routes>
    </div>
  );
}

export default App;
