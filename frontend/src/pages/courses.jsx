import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "../helper/axios";
import { Link, useParams } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.2 },
  }),
};

function Courses() {
  
  const [coursesData, setCoursesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await axios.get("/api/publiccourses");
        if (res.status === 200) {
          setCoursesData(res.data.data);
          console.log(res.data.data)
           
        }
      } catch (err) {
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchdata();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-16 px-6 lg:px-20">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-12"
      >
        Our <span className="text-blue-600">Courses</span>
      </motion.h1>

      {loading ? (
        <p className="text-center text-gray-500 text-lg">Loading courses...</p>
      ) : coursesData.length ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {coursesData.map((course, i) => (
            <motion.div
              key={course.id || i}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
                src={import.meta.env.VITE_BACKEND_URL +  course.photo}
                alt={course.title}
                className="w-full h-52 object-contain"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  {course.title}
                </h3>
                <p className="text-gray-600 mb-4">{course.description}</p>
                  <span className="px-3 py-1 bg-blue-100 text-blue-600 text-sm  font-medium rounded-full">
                        {course.price} MMK
                  </span>
                <div className="flex mt-4 items-center justify-between">
              
                      <div>
                <Link to={`/courses/${course._id}`}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-xl shadow-md hover:bg-yellow-700 transition"
                  >
              
                    More Detail
                  </motion.button>   </Link>
                </div>
                
                     <Link to='https://m.facebook.com/msg/450502891471332/?show_interstitial=0&mdotme_uri=https%3A%2F%2Fm.me%2Fbrightenglishacademy24&source_id=1441792&handler=m.me&referer&refsrc=deprecated&_rdr'>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-xl shadow-md hover:bg-blue-700 transition"
                  >
              
                    Enroll Now
                  </motion.button>   </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg">No courses available.</p>
      )}
    </div>
  );
}

export default Courses;
