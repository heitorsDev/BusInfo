import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style/index.css'
import Header from './components/Header2'
import Login from './components/Login'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    <Login />
  </StrictMode>,
)
