import React from 'react'
import Home from './components/pages/home'
import Login from './components/pages/login'
import Profile from './components/pages/profile'
import Register from './components/pages/register'
import { Authentication, useAuth } from './components/storage/authentication'
import Layout from './components/ui/Layout'
import './index.css'
import { Routes, Route } from 'react-router'



function App() {

  return (
    <Authentication>
        <div>
            <Layout>
                <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="home" element={<Home />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
            </Layout>
        </div>
    </Authentication>
  )
}

export default App
