import axios from '../../helper/axios'
import React, { useEffect, useState } from 'react'
import CourseCard from '../../components/admin/coursecard'
import Pagination from  '../../components/admin/AdminPagi'
import { Link, useLocation, useNavigate } from 'react-router-dom'


function AdminCourse() {
  const [courses, setCourse] = useState([])
  let [links, setLinks] = useState(null)
  let location = useLocation()
  let Searchquery = new URLSearchParams(location.search)
  let page = Searchquery.get('page')
 page = parseInt(page) ? parseInt(page) : 1
 let navigate = useNavigate()
  console.log(page)
  useEffect(() => {
    const fetchcourse = async () => {
      let res = await axios.get('/api/courses?page='+ page  )
      if (res.status === 200) {
        setCourse(res.data.data)
            setLinks(res.data.links)
       window.scroll({ top: 0, left: 0, behavior: 'smooth' });
      }
    }
    fetchcourse()

  }, [page])


 let Deletecourse = (_id) => {
  if(courses.length === 1 && page > 1){
    navigate('/admin/admincourse?page=' +(page - 1))
  }else{
 setCourse(prev => prev.filter(p => p._id !== _id))
  }
 
}

  

  return (

    <div className="min-h-screen bg-gray-50 p-6 md:p-10 md:mt-8 mt-16">
     <div className='flex justify-between'>
       <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center md:text-left">
        Courses
      </h2>
 <Link to="/admin/admincourse/create/">  <button  className="bg-blue-500 text-neutral-50 px-4 py-2 rounded">Create Course</button></Link>
     </div>
      {/* Bigger blog style layout */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 ">
        {!!courses.length &&
          courses.map((course) => (
          <CourseCard  key={course._id} course={course}   Deletecourse={Deletecourse}/>
          ))}
        
      </div>
      <div>
            {  !! links &&     <Pagination links={links} page={page || 1}></Pagination>}
      </div>
      </div>
      
 
  )
}

export default AdminCourse
