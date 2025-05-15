import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/login/Register";
<<<<<<< HEAD
// import UploadEmotionCard from "./components/writingdiary/UploadEmotionCard";
import StatusCard from "./components/writingdiary/StatusCard";
// import EmotionPreviewCard from "./components/writingdiary/EmotionPreviewCard";
import WritingDiaryPage from "./pages/diary/WritingDiaryPage";
=======
// import WritingDiary from "./components/writingdiary/WritingDiary";
// import UploadEmotionCard from "./components/writingdiary/UploadEmotionCard";
import StatusCard from "./components/writingdiary/StatusCard";
<<<<<<< Updated upstream
import EmotionPreviewCard from "./components/writingdiary/EmotionPreviewCard";
=======
// import EmotionPreviewCard from "./components/writingdiary/EmotionPreviewCard";
import Topbar from "./components/common/Topbar";
import WritingDiaryPage from "./pages/diary/WritingDiaryPage";
>>>>>>> Stashed changes
>>>>>>> f6bc8e7 (✨ [feature]#23 일기 작성 페이지 구현)

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/diary/write" element={<WritingDiaryPage/>} />
        <Route path="/diary/test" element={<StatusCard/>} />
        <Route path="/diary/test2" element={<Home/>} />

      </Routes>
    </div>
  );
}

export default App;
