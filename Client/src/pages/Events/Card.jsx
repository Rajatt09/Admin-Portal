import React from 'react'
import { Paperclip } from 'lucide-react'

function Card() {
  return (
    // <div className="bg-[#F6FAFF] rounded-lg shadow p-4 ">
    //     <h2 className="font-semibold text-lg mb-4">04 August<br />Thursday</h2>
    //       {/* <!-- Event Card --> */}
    //     <div className="bg-white p-4 rounded-lg shadow mb-4 border w-96 h-40  border-[#C6D3FE] border-1 leading-10">
    //         <p className="text-sm text-gray-500">09:00 AM - 10:30 AM</p>
    //         <h3 className="font-medium text-gray-700">Account Opening</h3>
    //         <div className='flex gap-2 items-center'>
    //           <Paperclip size={15} />
    //           <p className="text-sm text-gray-400" >10 Attachments</p>
    //         </div>
    //     </div>
    //       {/* <!-- Highlighted Event --> */}
    //     <div className="bg-[#295DFA] text-white p-4 rounded-lg shadow mb-4  w-96 h-40  border-[#C6D3FE] border-1 leading-10">
    //         <p className="text-sm">11:00 AM - 11:30 AM</p>
    //         <h3 className="font-medium">New Order Confirmation</h3>
    //         <div className='flex gap-2 items-center'>
    //           <Paperclip size={15} />
    //           <p className="text-sm text-gray-400" >10 Attachments</p>
    //         </div>
    //     </div>
    //     <div className="bg-white p-4 rounded-lg shadow mb-4 border w-96 h-40  border-[#C6D3FE] border-1 leading-10">
    //         <p className="text-sm text-gray-500">02:00 PM - 2:30 PM</p>
    //         <h3 className="font-medium text-gray-700">Invicible Collaboration</h3>
    //         <div className='flex gap-2 items-center'>
    //           <Paperclip size={15} />
    //           <p className="text-sm text-gray-400" >10 Attachments</p>
    //         </div>
    //     </div>
    // </div>

    <div className="bg-[#F6FAFF] rounded-lg shadow p-4 max-w-lg mx-auto w-full">
      <h2 className="font-semibold text-lg mb-4">04 August<br />Thursday</h2>
      
      {/* Regular Event */}
      <div className="bg-white p-4 rounded-lg shadow mb-4 border border-[#C6D3FE] w-full">
        <p className="text-sm text-gray-500">09:00 AM - 10:30 AM</p>
        <h3 className="font-medium text-gray-700 my-2">Account Opening</h3>
        <div className="flex gap-2 items-center">
          <Paperclip size={15} />
          <p className="text-sm text-gray-400">10 Attachments</p>
        </div>
      </div>
      
      {/* Highlighted Event */}
      <div className="bg-[#295DFA] text-white p-4 rounded-lg shadow mb-4 w-full">
        <p className="text-sm">11:00 AM - 11:30 AM</p>
        <h3 className="font-medium my-2">New Order Confirmation</h3>
        <div className="flex gap-2 items-center">
          <Paperclip size={15} />
          <p className="text-sm opacity-60">10 Attachments</p>
        </div>
      </div>
      
      {/* Regular Event */}
      <div className="bg-white p-4 rounded-lg shadow mb-4 border border-[#C6D3FE] w-full">
        <p className="text-sm text-gray-500">02:00 PM - 2:30 PM</p>
        <h3 className="font-medium text-gray-700 my-2">Invicible Collaboration</h3>
        <div className="flex gap-2 items-center">
          <Paperclip size={15} />
          <p className="text-sm text-gray-400">10 Attachments</p>
        </div>
      </div>
    </div>
  )
}

export default Card
