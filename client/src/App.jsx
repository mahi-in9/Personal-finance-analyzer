import './App.css'
import Login from './pages/Login'
import Upload from './pages/Upload'
import { Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'


function App() {

  return (
    <div className="App">

      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/upload' element={<Upload />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </div>
  )
}

export default App
