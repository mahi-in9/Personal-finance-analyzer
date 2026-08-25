import './App.css'
import Login from './pages/Login'
import Upload from './pages/Upload'
import { Routes, Route } from 'react-router-dom'
import Register from './pages/Register'


function App() {

  return (
    <>
      <h2>Personal Finance Analyzer</h2>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/upload' element={<Upload />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </>
  )
}

export default App
