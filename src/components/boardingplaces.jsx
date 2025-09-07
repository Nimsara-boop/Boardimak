import React, {useState} from 'react'
import { Link } from 'react-router-dom' 
import Postboardingbutton from './postboardingbutton'

const BoardingPlaces = () => {

  const [showPopup, setShowPopup] = useState(false);



  return (
        <div className="p-4">

    <div className='flex flex-row justify-between '>
    <div className='items-left py-10'>
      <button className="text-lg font-bold text-white bg-green-600">Google Maps</button>
      <p className='text-gray-400'>View all boarding listings on Google Maps</p>
    </div>
    <div className='items-right py-6'>
      <button className="text-lg font-bold text-white bg-yellow-500" onClick={() => setShowPopup(true)}>
        <p>Post Boarding</p> <p className='text-red-600 text-sm'>For Free</p></button>
      <p className='text-gray-400'>Post Your Boarding For Free!</p>
    </div>
    </div>
            {showPopup && (
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96 relative">
            <button
              className="absolute top-2 right-2 text-gray-500"
              onClick={() => setShowPopup(false)}
            >
              ✖
            </button>
            <Postboardingbutton />
          </div>
        </div>
      )}
    </div>
  )

  
}

export default BoardingPlaces