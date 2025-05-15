import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import WritingDiary from "./components/writingdiary/WritingDiary";
// import UploadEmotionCard from "./components/writingdiary/UploadEmotionCard";
import StatusCard from "./components/writingdiary/StatusCard";
import EmotionPreviewCard from "./components/writingdiary/EmotionPreviewCard";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/diary/write" element={<WritingDiary/>} />
        <Route path="/diary/test" element={<StatusCard/>} />
        <Route path="/diary/test2" element={<Home/>} />

      </Routes>
    </div>
  );
}

export default App;
