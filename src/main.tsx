import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css' // tailwindcss 적용
import App from './App.tsx'

import Nav from './components/common/Navbar.tsx' // 네비게이션 바
import Home from './pages/Home.tsx' // 홈 컴포넌트
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        
        <Route path="/" element={<Home />} />
        
        {/* App.tsx  */}
        <Route path="/app" element={<App />} />
        <Route path="/Nav" element={<Nav />} />

      </Routes>
    </Router>
  </StrictMode>,
)
