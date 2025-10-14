import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "../../helper/axios";
import { useNavigate, useParams } from "react-router-dom";

function CourseForm() {
  let {id} = useParams()
  console.log(id)
    let[title, setTitle] = useState('')
    let[description,setDescription] = useState('')
    let[about, setAbout] = useState('')
    let[price, setPrice] = useState('')
    let  navigate=useNavigate()
    let[error, setError] = useState(null)
    

    useEffect(()=>{
 
  let course = async()=> {
 if(id){
  let res = await axios.get('/api/courses/' + id)
  if(res.status === 200){
    setTitle(res.data.title)
    setDescription(res.data.description)
    setAbout(res.data.about)
    setPrice(res.data.price)


  }
 }
 
  }
  course()

    },[id])

let createCourse = async (e) => {
   try{ e.preventDefault()
   let course = {
    title,
    description,
    about,
    price
   }
 let res 
 if(id){res= await axios.patch('/api/courses/'+ id,course)

 }else{
  res= await axios.post('/api/courses',course)
 }
 

 if(res.status === 200){
    navigate('/admin/admincourse')
 }}catch(e){
    setError(e.response.data.errors)
 }

}


  return (
    <div className="mx-auto max-w-lg md:mt-10 mt-20 px-4">
      {/* Animated Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white rounded-2xl shadow-xl p-8"
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="font-bold text-3xl text-center text-gray-800"
        >
          Create New Course
        </motion.h1>

        <form action="" onSubmit={createCourse} className="mt-6 space-y-5">
          {/* Title */}
          <motion.input

            whileFocus={{ scale: 1.02 }}
            value={title}
            onChange={e => setTitle(e.target.value)}
            type="text"
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
            placeholder="Course Title"
           
          />
          {(error && error.title) && <p className="text-red-600 text-sm">{error.title.msg} title</p>}

          {/* Description */}
          <motion.textarea
          value={description}
          onChange={e=>setDescription(e.target.value)}
            whileFocus={{ scale: 1.02 }}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition min-h-[100px]"
            placeholder="Short Description"
          />
 {(error && error.description) && <p className="text-red-600 text-sm">{error.description.msg} description</p>}
          {/* About */}
          <motion.textarea
           value={about}
          onChange={e=>setAbout(e.target.value)}
            whileFocus={{ scale: 1.02 }}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition min-h-[150px]"
            placeholder="Detailed About the Course"
         
         />
{(error && error.about) && <p className="text-red-600 text-sm">{error.about.msg} about</p>}
          {/* Price */}
          <motion.input
             value={price}
          onChange={e=>setPrice(e.target.value)}
            whileFocus={{ scale: 1.02 }}
            type="number"
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
            placeholder="Price (MMK)"
          />
{(error && error.price) && <p className="text-red-600 text-sm">{error.price.msg} price</p>}
          {/* Submit Button */}
          <motion.button
          
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold text-lg shadow-md hover:bg-blue-700 transition"
          >
            Create Course
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

export default CourseForm;
