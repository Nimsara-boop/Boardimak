import React from 'react'
import BrokerAgents from './brokeragents'
import Sidebar from './sidebarbrokers/sidebarbrokers'

const BrokersNSidebar = () => {
  return (
    <div className="md:flex w-full h-screen sm:flex-row">
      {/* Sidebar - 1/5th */}
      <div className="md:w-1/5">
        <Sidebar />
      </div>

      {/* Main Content - 4/5th */}
      <div className="w-4/5 bg-gray-100">
        <BrokerAgents/>
      </div>
    </div>
  )
}

export default BrokersNSidebar