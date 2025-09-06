import React, { useState, useEffect } from 'react'
import menu_icon from '../assets/menu_icon.svg'
import cross_icon from '../assets/cross_icon.svg'
import { Link  } from 'react-router-dom';
import logo from '../assets/logo_dark.png'
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(()=> {
    if (showMobileMenu){
          document.body.style.overflow ='hidden'
    }
    else {
      document.body.style.overflow = 'auto'
    }
    return ()=>{
     document.body.style.overflow='auto'
    };
  }, [showMobileMenu])

  return (
    <div className='top-0 left-0 w-full z-10 '>
      <div className='container flex justify-between 
                      item-center sm:px-5 lg:px-3 
                       sm:gap-40 bg-red-800'>
        <Link to="/" className='flex flex-col items-center'>
        <img src={logo} alt="logo" className='flex items-center sm:w-full md:w-1/2 py-1'/>
        </Link>
        <ul className='hidden md:flex items-center lg:gap-30 sm:gap-10
                      text-white text-lg font-semibold'> 
          <NavLink
            to="/boardinghosts"
            className={({ isActive }) => 
    `cursor-pointer ${isActive ? "text-gray-200 font-bold rounded px-8" : "text-gray-900 px-8 font-bold"} hover:text-gray-200`}>
              Boardings
            </NavLink>

          <NavLink 
            to="/boardinghunters" 
             className={({ isActive }) => 
    `cursor-pointer ${isActive ? "text-gray-200 font-bold rounded px-8" : "text-gray-900 px-8 font-bold"} hover:text-gray-300`}>
              Boarding Hunters
              </NavLink>

          <NavLink
            to="/brokeragents" 
             className={({ isActive }) => 
    `cursor-pointer ${isActive ? "text-gray-200 font-bold rounded px-8" : "text-gray-900 px-8 font-bold"} hover:text-gray-300`}>
              Broker Agents</NavLink>

          <NavLink
            to="/tips-and-faq" 
             className={({ isActive }) => 
    `cursor-pointer ${isActive ? "text-gray-200 font-bold rounded px-8" : "text-gray-900 px-8 font-bold"} hover:text-gray-300`}>
              FAQ</NavLink>
        </ul>
        {/*<button className='hidden md:block bg-white px-8 py-2 rounded-full'>Sign Up</button>*/}
        <img onClick={()=> setShowMobileMenu(true)} src={menu_icon} className='md:hidden w-7 cursor-pointer' alt="menu"/>
      </div>
      {/*------for mobile menu*/}
      <div className={`bg-white md:hidden ${showMobileMenu ? 'fixed w-full' : 'h-0 w-0'}  right-0 top-0 bottom-0 overflow-hidden transition-all`}>
        <div className='flex justify-end p-6 cursor-pointer'>
          <img onClick={()=> setShowMobileMenu(false)} src={cross_icon} className='w-6 t' alt='cross'/>
        </div>
        <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
          <Link to='/' onClick={()=> setShowMobileMenu(false)} className="px-4 py-2 rounded-full inline-block text-black">Home</Link>
          <Link to='/testing' onClick={()=> setShowMobileMenu(false)} className="px-4 py-2 rounded-full inline-block text-black">Testing</Link>
          <Link to='/about' onClick={()=> setShowMobileMenu(false)} className="px-4 py-2 rounded-full inline-block text-black">About</Link>
          <Link to='/contact' onClick={()=> setShowMobileMenu(false)} className="px-4 py-2 rounded-full inline-block text-black">Contact Us</Link>
        </ul>
      </div>
    </div>
  )
}

export default Navbar