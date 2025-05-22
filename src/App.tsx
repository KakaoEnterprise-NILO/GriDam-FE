import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import "./App.css";
import HomeMyDiary from "./pages/home/HomeMyDiary";
import Calendar from "./pages/calendar/Calendar";
import Register from "./pages/login/Register";
import KakaoCallback from './pages/login/KakaoCallBack';
import NaverCallback from './pages/login/NaverCallback';



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
      </Routes>
    </div>
  );
}

export default App;
