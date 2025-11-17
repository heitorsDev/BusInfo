import { useState } from 'react'
import '../style/App.css'
import logo from '../assets/logo.png'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <img src={logo} className="logo" alt="Businfo logo" />
      </div>
      <h1>Businfo</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Welcome to Businfo
      </p>
    </>
  )
}

export default App
