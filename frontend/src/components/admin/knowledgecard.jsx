import axios from '../../helper/axios'
import React from 'react'
import { Link } from 'react-router-dom'
import Linkify from 'react-linkify';

function knowledgecard({item,ondelete}) {
  let deleteknowledge =async (e) =>{
    e.preventDefault()
    let res = await axios.delete('/api/knowledge/' + item._id)
    if(res.status === 200){
       ondelete(item._id)
    }
  }
   const lines = item.description.split("\n").filter(line => line.trim() !== "");
  const isList = lines.every(line => line.trim().startsWith("-"));
  
  return (
  <div
         
            className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-lg transition mt-3"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {item.title}
            </h2>
            {/* <p className="text-gray-600 mb-3">{item.description}</p> */}
            <Linkify>
                  <div className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed px-1 sm:px-3">
                    {isList ? (
                      <ul>
                        {lines.map((line, idx) => (
                          <li key={idx}>{line.replace(/^\-\s*/, "")}</li>
                        ))}
                      </ul>
                    ) : (
                      lines.map((line, idx) => <p key={idx}>{line}</p>)
                    )}
                  </div>
                  </Linkify>
            <div className="flex items-center justify-between text-sm text-gray-400">
              <span>By {item.writer}</span>
              
              </div>
              <div className="flex gap-3 justify-between">
                <Link to={'/admin/adminKnowledge/' + item._id}> <button className="text-blue-600 hover:underline">more detail</button></Link>
               <Link to={'/admin/adminKnowledge/edit/' + item._id}> <button className="text-blue-600 hover:underline">Edit</button></Link>
                <button className="text-red-600 hover:underline" onClick={deleteknowledge}>Delete</button>
            </div>
          </div>
  )
}

export default knowledgecard