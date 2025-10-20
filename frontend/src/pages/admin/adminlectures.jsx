import axios from "axios";
import React from "react";
import { useEffect } from "react";
import FounderCard from "../../components/admin/foundercard";
import { useState } from "react";
import { Link } from "react-router-dom";
import TeacherCard from "../../components/admin/teachercard";


function AdminLectures() {
  let [founder, setFounder] = useState ([])
  let [teachers, setTeachers] = useState ([])
 
  useEffect(()=>{
    let fetchFounder = async()=>{
      let res = await axios.get('/api/founder')
      if(res.status === 200){
      setFounder(res.data) }
    }
      let fetchTeachers = async()=>{
    let res = await axios.get('/api/lecturers')
    if(res.status === 200){
    setTeachers(res.data)}
  }
  fetchTeachers()
    fetchFounder()
  },[])
let onDelete = (id) =>{
  let updatedFounder = founder.filter((f) => f._id !== id)
  setFounder (updatedFounder)
}
  
let Delete = (id) =>{
  let updatedTeachers = teachers.filter((t) => t._id !== id)
  setTeachers (updatedTeachers)
}
// useEffect(()=>{
//   let fetchTeachers = async()=>{
//     let res = await axios.get('/api/lecturers')
//     if(res.status === 200){
//     console.log(res.data)}
//   }
//   fetchTeachers()
// },[])
  return (
 <div className="p-8 bg-gray-50 min-h-screen space-y-16">
      {/* ======== Founder Section ======== */}
     
      <section className="max-w-5xl mx-auto bg-white rounded-xl p-8 md:pt-7 pt-20">
        <div  className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
         Founder
          </h1>
               <Link to={'/admin/lecturers/create'}><button  className="bg-blue-500 text-neutral-50 px-4 py-2 rounded">Create</button></Link>
        </div>
  
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Left: Image */}
        <form action="">
  {founder.map((f) => (
 <FounderCard f={f}  onDelete={onDelete} key={f._id}></FounderCard>
  ))}
</form>

        </div>
          
      </section>

      {/* ======== Lecturers Section ======== */}
      <section className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Our Lecturers
        </h1>
     <div className="flex items-center justify-end mb-8">
       <Link to={'/admin/teachers/create'}>  <button  className="bg-blue-500 text-neutral-50 px-4 py-2 rounded">Create Teacher</button></Link>
     </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {!!teachers.length && teachers.map((teacher) => (
          <TeacherCard key={teacher._id} teacher={teacher} Delete={Delete} />
          ))}
    <div>


        
         
    </div>
        </div>
      </section>
    </div>
  );
}

 

export default AdminLectures;
