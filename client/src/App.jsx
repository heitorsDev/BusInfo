import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Login from './Pages/Login'
import Register from './Pages/Register'
import './App.css'

function App() {
  return (
    <Router>
      <nav>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </nav>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  )
}

export default App
