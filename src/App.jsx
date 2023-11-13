import React from 'react'
import Home from './components/pages/home'
import Login from './components/pages/login'
import Profile from './components/pages/profile'
import Register from './components/pages/register'
import { Authentication, useAuth } from './components/storage/authentication'
import Layout from './components/ui/Layout'
import './index.css'
import { Routes, Route } from 'react-router'
import Venues from './components/pages/venues'
import Venue from './components/pages/venue'
import Create from './components/pages/create'
import ManageVenues from './components/pages/manage'
import Edit from './components/pages/manage/update'



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
                        <Route path="/venues" element={<Venues />}/>
                        <Route path="/create" element={<Create />}/>
                        <Route path="/edit/:id" element={<Edit />} />
                        <Route path="/manage" element={<ManageVenues />}/>
                        <Route path="/venues/:id" element={<Venue />}/>
                    </Routes>
            </Layout>
        </div>
    </Authentication>
  )
}

export default App
