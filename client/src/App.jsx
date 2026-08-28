import './App.css'
import Login from './pages/Login'
import Upload from './pages/Upload'
import { Routes, Route } from 'react-router-dom'
import Register from './pages/Register'


function App() {

  return (
    <div className="App">
      <h1 className="nav-bar">Personal Finance Analyzer</h1>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/upload' element={<Upload />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </div>
  )
}

export default App
