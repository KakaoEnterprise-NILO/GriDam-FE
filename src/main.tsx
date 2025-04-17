import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css' //tailwindcss 적용 되면 이게 뜸
import App from './App.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
