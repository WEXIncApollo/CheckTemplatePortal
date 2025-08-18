import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import DesignCheck from './pages/DesignCheck'
import VerifyCheck from './pages/VerifyCheck'
import Home from './pages/Home'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/design" element={<DesignCheck />} />
          <Route path="/verify" element={<VerifyCheck />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
