import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
<<<<<<< HEAD
import Login from "./pages/login/Login";
import "./App.css";
import HomeMyDiary from "./pages/home/HomeMyDiary";
import Calendar from "./pages/calendar/Calendar";
import Register from "./pages/login/Register";
import KakaoCallback from './pages/login/KakaoCallBack';
import NaverCallback from './pages/login/NaverCallback';


=======
import Login from "./pages/Login";
import Register from "./pages/Register";
import WritingDiary from "./components/writingdiary/WritingDiary";
// import UploadEmotionCard from "./components/writingdiary/UploadEmotionCard";
import StatusCard from "./components/writingdiary/StatusCard";
import EmotionPreviewCard from "./components/writingdiary/EmotionPreviewCard";
import Topbar from "./components/common/Topbar";
>>>>>>> refactor/#20-project-structure-refactoring/CCS-158

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/HomeMyDiary" element={<HomeMyDiary />} />

        <Route path="/login" element={<Login />} />
<<<<<<< HEAD
        
        <Route path="/login/oauth/kakao/callback" element={<KakaoCallback />} />
        <Route path="/login/oauth/naver/callback" element={<NaverCallback />} />
       
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/register" element={<Register />} />
=======
        <Route path="/register" element={<Register/>} />
        <Route path="/diary/write" element={<WritingDiary/>} />
        <Route path="/diary/test" element={<StatusCard/>} />
        <Route path="/diary/test2" element={<Topbar/>} />

>>>>>>> refactor/#20-project-structure-refactoring/CCS-158
      </Routes>
    </div>
  );
}

export default App;
