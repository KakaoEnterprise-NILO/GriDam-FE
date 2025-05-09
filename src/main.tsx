import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css' // tailwindcss 적용
import App from './App.tsx'

import Nav from './pages/Nav.tsx' // 네비게이션 바
import Home_Compo from './pages/Home(compo).tsx' // 홈 컴포넌트
import MainLayout from './pages/MainLayout.tsx' // 메인 레이아웃
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        
        <Route path="/Home_compo" element={<Home_Compo />} />
        
        {/* App.tsx  */}
        <Route path="/app" element={<App />} />
        <Route path="/Nav" element={<Nav />} />

      </Routes>
    </Router>
  </StrictMode>,
)
