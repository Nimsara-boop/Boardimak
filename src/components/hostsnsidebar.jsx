import React, {useState, useEffect }from 'react'
import BoardingPlaces from './boardingplaces'
import Sidebar from './sidebarplaces/sidebarplaces'

const HostsNSidebar = () => {


  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    fetch("http://localhost:5000/places")
      .then((res) => res.json())
      .then((data) => {
        setListings(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch((err) => {
        console.error("Error fetching listings:", err)
        setListings([])
        setLoading(false)
      })
  }, [])

  return (
    <div className="md:flex w-full h-screen sm:flex-row">
      {/* Sidebar - 1/5th */}
      <div className="md:w-1/5">
        <Sidebar setPlaces={setListings} />
      </div>

      {/* Main Content - 4/5th */}
      <div className="w-4/5 bg-gray-100">
        <BoardingPlaces listings={listings} loading={loading} />
      </div>
    </div>
  )
}

export default HostsNSidebar