import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css' // THIS LINE IS CRITICAL
import App from './App.jsx'
import { Analytics } from "@vercel/analytics/react" // <-- THIS MUST BE 'react', NOT 'next'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Analytics/> 
  </StrictMode>,
)