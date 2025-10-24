import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import axios from "axios";


function admincoursedetail() {
   const [course, setCourse] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const showDetail = async () => {
      try {
        const res = await axios.get(`/api/courses/${id}`);
        if (res.status === 200) {
          setCourse(res.data);
        }
      } catch (error) {
        console.error("Failed to fetch course:", error);
      }
    };
    showDetail();
  }, [id]);

  if (!course) return <div className="text-center py-20">Loading...</div>;

  return (
    <motion.div
      className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden mt-10"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Course Image */}
      <div className="relative w-full h-64 md:h-80 overflow-hidden mt-20 ">
        <img
          src={import.meta.env.VITE_BACKEND_URL +  course.photo}
          alt={course.title}
          className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <h1 className="absolute bottom-4 left-6 text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
          {course.title}
        </h1>
      </div>

      {/* Content Section */}
      <div className="p-6 md:p-8 space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-2 text-gray-800">Description</h2>
          <p className="text-gray-600 leading-relaxed">{course.description}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2 text-gray-800">About this course</h2>
          <p className="text-gray-600 leading-relaxed">{course.about}</p>
        </section>

        <div className="flex items-center justify-between border-t pt-4">
          <span className="text-2xl font-bold text-gray-900">
            ฿{course.price.toLocaleString()}
          </span>
       <Link to={`/admin/admincourse/edit/${course._id}`}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-xl shadow-md hover:bg-blue-700 transition"
                  >
              
                    Edit
                  </motion.button>   </Link>
        </div>

        <div className="text-sm text-gray-400 text-right">
          <p>Created: {new Date(course.createdAt).toLocaleDateString()}</p>
          <p>Updated: {new Date(course.updatedAt).toLocaleDateString()}</p>
        </div>
      </div>
    </motion.div>
  );
}


export default admincoursedetail