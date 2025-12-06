import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PrivateRoute from './components/PrivateRoute'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Createnote from './pages/Createnote'
import Login from './pages/Login'
import Signup from './pages/Signup'

function App() {
  return (
    <div className='flex flex-col min-h-screen bg-gray-900 text-white'>
      {/* Navbar */}
      <Navbar/>

      {/* Main Content */}
      <main className='flex-1 container mx-auto p-4'>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } />
          <Route path="/create" element={
            <PrivateRoute>
              <Createnote />
            </PrivateRoute>
          } />
        </Routes>
      </main>

      {/* Footer */}
      <Footer/>
    </div>
  )
}

export default App