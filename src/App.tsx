import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/login/Register";
// import UploadEmotionCard from "./components/writingdiary/UploadEmotionCard";
import StatusCard from "./components/writingdiary/StatusCard";
import WritingDiaryPage from "./pages/diary/WritingDiaryPage";

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
