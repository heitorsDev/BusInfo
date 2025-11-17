import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Login from './Pages/Login'
import Register from './Pages/Register'
import MotoristaDashboard from './Pages/MotoristaDashboard'
import AdminDashboard from './Pages/AdminDashboard'
import "./style/Button.css"
import './App.css'

function App() {
  return (
    <Router>
      <nav>
        <Link className='button' to="/login" style={{fontFamily: 'Segoe UI'}}>Login</Link>

        <Link className='button' to="/register" style={{fontFamily: 'Segoe UI'}}>Register</Link>
      </nav>
      
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard/:id" element={<MotoristaDashboard />} />
        <Route path="/admindashboard/:id" element={<AdminDashboard />} />
      </Routes>
    </Router>
  )
}

export default App
