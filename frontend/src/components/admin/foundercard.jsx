import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

function foundercard({f,onDelete}) {
  

let deleteFounder = async()=>{
  let res = await axios.delete('/api/founder/' + f._id)
  if(res.status === 200){
    onDelete(f._id)
  }
}



  return (
   <div
    
      className="flex flex-col md:flex-row items-center gap-8 mb-10 p-6 bg-white shadow-md rounded-xl"
    >
      {/* Left: Image + Edit */}
      <div className="flex-shrink-0 text-center">
        <img
          src={import.meta.env.VITE_BACKEND_URL + f.photo}
          alt="Founder"
          className="w-56 h-56 object-cover rounded-lg border border-gray-300 mx-auto"
        />
        <div className="mt-3 space-x-4">
         
        <Link to ={'/admin/lecturers/edit/' + f._id}>
          <button
            type="button"
            className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded"
          >
            Edit
          </button></Link>
           <button
            type="button"
            onClick={deleteFounder}
            className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Right: Text */}
      <div className="flex-1 text-center md:text-left">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
           {f.name}
        </h2>
        <p className="text-blue-600 font-medium mb-4">
          {f.position}
        </p>
        <p className="text-gray-600">
          {f.about}
           
        </p>
      </div>
    </div>
  )
}

export default foundercard