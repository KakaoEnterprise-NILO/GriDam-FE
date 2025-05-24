import { Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./pages/home/Home";
// import HomeMyDiary from "./pages/home/HomeMyDiary";
import Register from "./pages/login/Register";
import Login from "./pages/login/Login";
import KakaoCallback from './pages/login/KakaoCallBack';
import NaverCallback from './pages/login/NaverCallback';

import WritingDiaryPage from "./pages/diary/WritingDiaryPage";
import StatusCard from "./components/writingdiary/StatusCard";
import Calendar from "./pages/calendar/Calendar";

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
        <Route path="/register" element={<Register/>} />
        <Route path="/diary/write" element={<WritingDiaryPage/>} />
        <Route path="/diary/test" element={<StatusCard/>} />

      </Routes>
    </div>
  );
}

export default App;
