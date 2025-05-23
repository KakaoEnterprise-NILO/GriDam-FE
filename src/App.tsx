import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import "./App.css";
import HomeMyDiary from "./pages/home/HomeMyDiary";
import Calendar from "./pages/calendar/Calendar";
import Register from "./pages/login/Register";
import Login from "./pages/login/Login";
import KakaoCallback from './pages/login/KakaoCallBack';
import NaverCallback from './pages/login/NaverCallback';

import WritingDiary from "./components/writingdiary/WritingDiary";
import StatusCard from "./components/writingdiary/StatusCard";
import FriendList from './pages/friendlist/FriendList';
import EmotionCardPost2 from "./components/feed/EmotionCardPost2";



function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/HomeMyDiary" element={<HomeMyDiary />} />

        <Route path="/login" element={<Login />} /> 
        
        <Route path="/login/oauth/kakao/callback" element={<KakaoCallback />} />
        <Route path="/login/oauth/naver/callback" element={<NaverCallback />} />
       
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/register" element={<Register />} />
        <Route path="/diary/write" element={<WritingDiary/>} />
        <Route path="/friend/list/feed" element={<FriendList/>} />
        <Route path="/friend/list/feed/entire/:id" element={<EmotionCardPost2/>} />
        <Route path="/diary/test" element={<StatusCard/>} />
        <Route path="/diary/test2" element={<EmotionCardPost2/>} />

      </Routes>
    </div>
  );
}

export default App;
