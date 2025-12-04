
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navebar from './Components/Navebar.jsx'
import Footer from './Components/Footer.jsx'
import Home from './Pages/Home.jsx'
import Login from './Pages/Login.jsx'
import Register from './Pages/Register.jsx'
import Dashboard from './Pages/Dashboard.jsx'

import './App.css'

function App() {

  return (
    <>
    <Router>
      <Navebar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
      <Footer />
    </Router>

    </>
  )
}

export default App
