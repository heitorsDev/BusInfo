import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './style/index.css'
import Header from './components/Header2'
import Horarios from './components/Horarios'
import Noticias from './components/Noticias'
import Configuracao from './components/Configuracao'
import Contato from './components/Contato'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Header />
      <Routes>
        <Route path="/horarios" element={<Horarios />} />
        <Route path="/" element={<Noticias />} />
        <Route path="/configuracao" element={<Configuracao />} />
        <Route path="/contato" element={<Contato />} />
      </Routes>
    </Router>
  </StrictMode>,
)
