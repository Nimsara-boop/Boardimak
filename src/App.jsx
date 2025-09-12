import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/header'
import HuntersNSidebar from './components/huntersnsidebar'
import HostsNSidebar from './components/hostsnsidebar'
import BrokersNSidebar from './components/brokersnsidebar'
import Contact from './components/contact'
import TipsAndFAQ from './components/tipsandfaq'
import Notfoundpage from './components/notfoundpage'
import Navbar from './components/navbar'
import Footer from './components/footer'
import { Route, Routes } from 'react-router-dom'
import BoardimakMap from './components/googlemapsbutton'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="w-full ">


      <Navbar />
      
      <Routes>
        <Route path='/' element={<Header />} />
        <Route path='/boardinghunters' element={<HuntersNSidebar />} />
        <Route path='/boardinghosts' element={<HostsNSidebar />} />
        <Route path='/boardingplacesongooglemaps' element={<BoardimakMap/>}/>
        <Route path='/brokeragents' element={<BrokersNSidebar />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/tips-and-faq' element={<TipsAndFAQ />} />
        <Route path='*' element={<Notfoundpage />} />

      </Routes>

      <Footer />
    </div>
  )
}

export default App
