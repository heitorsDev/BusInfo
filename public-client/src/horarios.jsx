import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style/index.css'
import Header from './components/Header2'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
  </StrictMode>,
)
