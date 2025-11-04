import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style/index.css'
import Header from './components/Header2'
import Login from './components/Login'
import Horarios from './components/Horarios'
import Noticias from './components/Noticias'
import Configuracao from './components/Configuracao'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    <Horarios />
  </StrictMode>,
)
