import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css' //tailwindcss 적용 되면 이게 뜸
import App from './App.tsx'
import Login from './pages/Login1.tsx' // 로그인1 페이지
import Login2 from './pages/Login2.tsx' // 로그인1 페이지

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Login2 />
  </StrictMode>,
)
