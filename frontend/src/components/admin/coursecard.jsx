import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom';

function coursecard({course,  Deletecourse}) {
  let onDelete = async (e)=>{
    e.preventDefault();
    let res = await axios.delete('http://localhost:4000/api/courses/' + course._id)
    if(res.status === 200){
      Deletecourse(course._id)
    }
  }

  
  return (
     <div
             
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition duration-300 flex flex-col overflow-hidden"
            >
              {/* Optional Image Placeholder */}
             

              {/* Card Content */}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                  {course.title}
                </h3>

                <p className="text-base text-gray-700 mb-5 leading-relaxed flex-1">
                  {course.description}
                </p>

                <div className="flex items-center justify-between text-base text-gray-500 mb-6">
                  <span className="font-semibold text-indigo-600 text-lg">
                    {course.price} MMK
                  </span>
                  <span className="text-gray-400">🕔 5pm</span>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-gray-100 p-5 bg-gray-50 flex justify-end gap-8">
                
                 
              <Link to={`/admin/admincourse/edit/${course._id}`}>
                <button className="px-6 py-2 bg-indigo-600 text-white text-base rounded-lg hover:bg-indigo-700 transition">
                  Edit
                </button></Link>
                  <button onClick={onDelete} className="px-6 py-2 bg-red-600 text-white text-base rounded-lg hover:bg-red-900 transition">
                  Delete
                </button>
              </div>
            </div>
  )
}

export default coursecard