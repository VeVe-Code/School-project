import axios from "../../helper/axios";
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CalendarClock } from "lucide-react";

function CourseCard({ course, Deletecourse }) {
  const onDelete = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.delete("/api/courses/" + course._id);
      if (res.status === 200) {
        Deletecourse(course._id);
      }
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };
  const formattedTime = new Date(course.createdAt).toLocaleString("en-US", {
  dateStyle: "medium",
  timeStyle: "short",
});

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -5 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.25 }}
      className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 
                 overflow-hidden w-full max-w-sm mx-auto flex flex-col border border-gray-100"
    >
      {/* Image */}
      <div className="relative w-full h-48 sm:h-56 md:h-64 bg-gradient-to-br from-indigo-50 to-gray-100 flex items-center justify-center">
        <img
          src={import.meta.env.VITE_BACKEND_URL + course.photo}
          alt={course.title}
          className="w-full h-full object-contain p-4"
        />
      </div>

      {/* Info */}
      <div className="p-5 sm:p-6 flex flex-col flex-1">
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 text-center sm:text-left line-clamp-2">
          {course.title}
        </h3>

        <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4 flex-1 line-clamp-3 text-center sm:text-left">
          {course.description}
        </p>

       <div className="flex items-center justify-between text-gray-500 mb-5">
  <span className="text-lg sm:text-xl font-semibold text-indigo-600">
    {course.price} MMK
  </span>
  <span className="flex items-center gap-1 text-sm sm:text-base text-gray-400">
    <CalendarClock className="w-4 h-4" /> {formattedTime}
  </span>
</div>
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center sm:justify-end gap-3">
          <Link to={`/admin/admincourse/${course._id}`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto bg-gradient-to-r from-yellow-400 to-yellow-500 
                         text-white font-medium px-5 py-2 rounded-xl shadow-md hover:shadow-lg transition"
            >
              More Detail
            </motion.button>
          </Link>

          <Link to={`/admin/admincourse/edit/${course._id}`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto bg-gradient-to-r from-indigo-500 to-indigo-600 
                         text-white font-medium px-5 py-2 rounded-xl hover:shadow-lg transition"
            >
              Edit
            </motion.button>
          </Link>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onDelete}
            className="w-full sm:w-auto bg-gradient-to-r from-red-500 to-red-600 
                       text-white font-medium px-5 py-2 rounded-xl hover:shadow-lg transition"
          >
            Delete
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default CourseCard;
