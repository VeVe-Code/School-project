import React, { useEffect } from "react";
import { motion } from "framer-motion";
import axios from "../helper/axios";
function AboutUs() {
let [founders, setFounders] = React.useState([])
let [teachers, setTeachers] = React.useState([])

 useEffect(() => {
 let fetchFounders = async () => {
      let response = await axios.get("/api/cfounder");
       if (response.status === 200) {
        setFounders(response.data);
       }       }  
let fetchTeachers = async () => {
      let res = await axios.get("/api/publiclectures"); 
        if (res.status === 200) { 
          setTeachers(res.data);}  

 }

 fetchFounders()
 fetchTeachers()
}, [])

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen py-20 px-6 md:px-12 lg:px-24">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          About <span className="text-blue-600">Us</span>
        </h1>
     <p className="text-gray-700 max-w-2xl mx-auto text-base leading-relaxed font-semibold text-center">
Bright English Academy was founded in 2024 by ZinWinMaw with the goal of building confident English speakers through practical, real-life learning. In a short time, it has grown into a thriving community of 300+ learners, known for its supportive guidance, real-life communication focus, and empowering learning experience.
        </p>
      </motion.div>

      {/* Founder Section */}
      <section className="mb-24">
  <motion.h2
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.6 }}
    className="text-3xl font-bold text-gray-800 text-center mb-12"
  >
    Our Founder
  </motion.h2>

  <div className="flex flex-wrap justify-center gap-10">
    {founders.map((founder, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: index * 0.2 }}
        whileHover={{ scale: 1.02 }}
        className="bg-white/70 backdrop-blur-md flex flex-col md:flex-row items-center gap-8 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 max-w-4xl w-full"
      >
        {/* Image */}
        <div className="flex-shrink-0 text-center">
          <img
            src={import.meta.env.VITE_BACKEND_URL + founder.photo}
            alt={founder.name}
            className="w-52 h-52 object-cover rounded-xl border-4 border-blue-100 shadow-md mx-auto"
          />
        </div>

        {/* Text */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            {founder.name}
          </h2>
          <p className="text-blue-600 font-medium mb-4">{founder.position}</p>
          <p className="text-gray-600 leading-relaxed">{founder.about}</p>
        </div>
      </motion.div>
    ))}
  </div>
</section>

      {/* Teachers Section */}
      <section>
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-gray-800 text-center mb-10"
        >
          Our Lecturers
        </motion.h2>

       <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
  {teachers.map((teacher, index) => (
    <motion.div
      key={index}
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      transition={{ duration: 0.7, delay: index * 0.2 }}
      whileHover={{ scale: 1.05 }}
      className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center"
    >
      <img
        src={import.meta.env.VITE_BACKEND_URL + teacher.photo}
        alt={teacher.name}
        className="w-55 h-55 rounded-3xl object-cover mx-auto mb-6 border-4 border-blue-100 shadow-md"
      />
      <h3 className="text-xl font-semibold text-gray-800 mb-1">
        {teacher.name}
      </h3>
      <p className="text-blue-600 font-medium mb-3">{teacher.role}</p>
      <p className="text-gray-600 text-base leading-relaxed">{teacher.about}</p>
    </motion.div>
  ))}
</div>
      </section>
    </div>
  );
}

export default AboutUs;
