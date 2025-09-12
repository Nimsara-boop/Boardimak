import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Postboardingbutton from './postboardingbutton'

const BoardingPlaces = () => {

  const [showPopup, setShowPopup] = useState(false);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/places")
      .then((res) => res.json())
      .then((data) => {
        setListings(data);
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching listings:", err));
  }, []);

  if (loading) return <p>Loading... </p>;

  return (
    <div className="p-4">

      <div className='flex flex-row justify-between '>
        <div className='items-left py-10'>
          <Link to='/boardingplacesongooglemaps'>
          <button className="text-lg font-bold text-white bg-green-600">Google Maps</button>
          <p className='text-gray-400'>View all boarding listings on Google Maps</p> </Link>
        </div>
        <div className='items-right py-6'>
          <button className="text-lg font-bold text-white bg-yellow-500" onClick={() => setShowPopup(true)}>
            <p>Post Boarding</p> <p className='bg-red-600 rounded-full  text-sm'>Free</p></button>
          <p className='text-gray-400'>Post Your Boarding For Free!</p>
        </div>
      </div>
      {showPopup && (
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
          <div className="bg-gray-100 flex p-3 rounded shadow-lg w-3/4 relative">
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

      <main className='flex-1 p-4'>
        <ul>{listings.map((listing) => (
          <li key={listing.id} className="p-2 text-gray-500 border-b border-gray-300 flex flex-row">
            <img src={listing.images} alt={listing.title} className="w-30 h-30 object-cover mb-2 rounded overflow-hidden" />
            <div className='px-4 align-left '>
              <h3 className="font-semibold text-gray-700">{listing.title}</h3>
              <p>{listing.description}</p>
              <p className="text-md font-bold text-gray-800">Rs {listing.rent_per_person} | <span className='text-sm font-semibold text-gray-700'>~ {listing.area}</span></p>
            </div>
          </li>
        ))}</ul>




        <h2 className='text-gray-900'>BOARDING</h2>

      </main>

    </div>
  )


}

export default BoardingPlaces