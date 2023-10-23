import Home from './components/pages/home'
import Profile from './components/pages/profile'
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
                </Routes>
        </Layout>
    </div>

    </>
  )
}

export default App
