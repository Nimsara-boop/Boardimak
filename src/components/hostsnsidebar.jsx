import React from 'react'
import BoardingPlaces from './boardingplaces'
import Sidebar from './sidebarplaces/sidebarplaces'

const HostsNSidebar = () => {
  return (
    <div className="md:flex w-full h-screen sm:flex-row">
      {/* Sidebar - 1/5th */}
      <div className="md:w-1/5">
        <Sidebar setPlaces={setListings}/>
      </div>

      {/* Main Content - 4/5th */}
      <div className="w-4/5 bg-gray-100">
        <BoardingPlaces />
      </div>
    </div>
  )
}

export default HostsNSidebar