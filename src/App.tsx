import { Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./pages/home/Home";
// import HomeMyDiary from "./pages/home/HomeMyDiary";
import Register from "./pages/login/Register";
import Login from "./pages/login/Login";
import KakaoCallback from './pages/login/KakaoCallBack';
import NaverCallback from './pages/login/NaverCallback';

import WritingDiaryPage from "./pages/diary/WritingDiaryPage";
import Calendar from "./pages/calendar/Calendar";
import FriendList from './pages/friendlist/FriendList';
import EmotionCardPost2 from "./components/feed/EmotionCardPost2";
import MyProfile from "./pages/profile/MyProfile";
import FriendProfile from "./pages/profile/FriendProfile copy";



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
        <Route path="/profile/friend" element={<FriendProfile/>} />
        <Route path="/friends/feed" element={<FriendList/>} />
        <Route path="/friend/list/feed/entire/:id" element={<EmotionCardPost2/>} />


      </Routes>
    </div>
  );
}

export default App;
