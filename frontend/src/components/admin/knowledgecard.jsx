import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'

function knowledgecard({item,ondelete}) {
  let deleteknowledge =async (e) =>{
    e.preventDefault()
    let res = await axios.delete('http://localhost:4000/api/knowledge/' + item._id)
    if(res.status === 200){
       ondelete(item._id)
    }
  }
  
  return (
  <div
         
            className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {item.title}
            </h2>
            <p className="text-gray-600 mb-3">{item.description}</p>
            <div className="flex items-center justify-between text-sm text-gray-400">
              <span>By {item.writer}</span>
              <div className="flex gap-3">
               <Link to={'/admin/adminKnowledge/edit/' + item._id}> <button className="text-blue-600 hover:underline">Edit</button></Link>
                <button className="text-red-600 hover:underline" onClick={deleteknowledge}>Delete</button>
              </div>
            </div>
          </div>
  )
}

export default knowledgecard