import React from 'react'
import BoardingHunters from './boardinghunters'
import Sidebarhunters from './sidebarhunters/sidebarhunters'

const HuntersNSidebar = () => {
  return (
    <div className="md:flex w-full h-screen sm:flex-row">
      {/* Sidebarhunters - 1/5th */}
      <div className="md:w-1/5">
        <Sidebarhunters />
      </div>

      {/* Main Content - 4/5th */}
      <div className="w-4/5 bg-gray-100">
        <BoardingHunters />
      </div>
    </div>
  )
}

export default HuntersNSidebar