import Home from './components/pages/home'
import Login from './components/pages/login'
import Profile from './components/pages/profile'
import Register from './components/pages/register'
import Layout from './components/ui/Layout'
import './index.css'
import { Routes, Route } from 'react-router'

function App() {

  return (
    <>
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

    </>
  )
}

export default App
