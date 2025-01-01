// Vishwas
import React from 'react'
import { useState,useEffect } from 'react'
import {Search,Paperclip } from 'lucide-react';
import Showmodal from './ShowModal.jsx';
import Card from './Card.jsx';
// const Events = () => {
//   return (
//     <div>Events</div>
//   )
// }

// export default Events

function Events() {
  const [showmodal, setshowmodal] = useState(false);

  const closeModal = () => setshowmodal(false);

  return (
    <>
<div className="flex h-screen bg-white" >
  {/* <!-- Sidebar --> */}
  <aside className="w-20 h-6/9 bg-[#F6FAFF] flex flex-col items-center py-4 m-5 rounded-sm  ">
    <div className="mb-6">
      <img src="logo.png" alt="Logo" className="h-10 w-10 rounded-full" />
    </div>
    <nav className="space-y-6">
      <a href="#" className="text-gray-500 hover:text-blue-500">
        <i className="fas fa-calendar"></i> 
        {/* <!-- Replace with icon --> */}
      </a>
      <a href="#" className="text-gray-500 hover:text-green-500">
        <i className="fas fa-whatsapp"></i> 
        {/* <!-- Replace with icon --> */}
      </a>
      <a href="#" className="text-gray-500 hover:text-red-500">
        <i className="fas fa-envelope"></i> 
        {/* <!-- Replace with icon --> */}
      </a>
      <a href="#" className="text-gray-500 hover:text-blue-500">
        <i className="fas fa-sync"></i> 
        {/* <!-- Replace with icon --> */}
      </a>
    </nav>
  </aside>

  {/* <!-- Main Content --> */}
  <div className="flex-1">
    {/* <!-- Header --> */}
    <header className="mt-5 flex items-center gap-12 mr-6 ml-6">
      <h1 className="text-2xl font-sans font-bold">Events</h1>

            <div className="relative  "> {/* Fixed width for search container */}
              <div className="relative h-10 w-80 border rounded-full px-4 py-2 text-sm focus:outline-2 focus:ring-2 focus:ring-blue-500">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pr-10  text-gray-700 bg-transparent border-none focus:outline-none focus:ring-0 placeholder-gray-400"
                />
              </div>
            </div>
    </header>
    <div className="flex justify-end mt-7 mr-6">
  <button className="bg-blue-500 text-white w-32 h-10 px-4 py-2 rounded-full hover:bg-blue-600" onClick={()=> setshowmodal(true)}>
    New Event
  </button>
  {showmodal && <Showmodal closeModal={closeModal}/>}
</div>
    {/* <!-- Events Content --> */}
    <main className="py-4 mx-6 mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {/*Cards container*/}
        <Card />
      </div>
    </main>
  </div>
</div>

    </>
  )
}

export default Events
