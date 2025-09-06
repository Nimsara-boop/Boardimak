import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/header'
import BoardingHunters from './components/boardinghunters'
import HostsNSidebar from './components/hostsnsidebar'
import BrokerAgents from './components/brokeragents'
import Contact from './components/contact'
import TipsAndFAQ from './components/tipsandfaq'
import Notfoundpage from './components/notfoundpage'
import Navbar from './components/navbar'
import Footer from './components/footer'
import { Route, Routes } from 'react-router-dom'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="w-full overflow-hidden">


      <Navbar />
      
      <Routes>
        <Route path='/' element={<Header />} />
        <Route path='/boardinghunters' element={<BoardingHunters />} />
        <Route path='/boardinghosts' element={<HostsNSidebar />} />
        <Route path='/brokeragents' element={<BrokerAgents />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/tips-and-faq' element={<TipsAndFAQ />} />
        <Route path='*' element={<Notfoundpage />} />

      </Routes>

      <Footer />
    </div>
  )
}

export default App
