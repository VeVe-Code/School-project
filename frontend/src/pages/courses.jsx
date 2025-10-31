import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "../helper/axios";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15 },
  }),
};

function Courses() {
  const [coursesData, setCoursesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await axios.get(`/api/publiccourses?title=${search}`);
        if (res.status === 200) {
          setCoursesData(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchdata();
  }, [search]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-16 px-6 lg:px-20">
      {/* Search Bar */}
      <div className="flex justify-center mb-10">
        <motion.div
          animate={{ width: focused ? "90%" : "70%" }}
          transition={{ duration: 0.4, type: "spring" }}
          className="flex items-center bg-white shadow-md border border-gray-300 rounded-full px-4 py-2 w-full max-w-md hover:shadow-lg transition-all"
        >
          <Search className="text-gray-500 mr-2" size={20} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Search by title..."
            className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400 text-sm sm:text-base"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              type="button"
              className="text-gray-400 hover:text-gray-600 transition ml-2"
            >
              ✕
            </button>
          )}
        </motion.div>
      </div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-800 mb-12"
      >
        Our <span className="text-blue-600">Courses</span>
      </motion.h1>

      {/* Loading State */}
      {loading ? (
        <p className="text-center text-gray-500 text-lg">Loading courses...</p>
      ) : coursesData.length ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {coursesData.map((course, i) => (
            <motion.div
              key={course._id || i}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 flex flex-col"
            >
              {/* Image */}
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
                src={import.meta.env.VITE_BACKEND_URL + course.photo}
                alt={course.title}
                className="w-full h-56 object-contain bg-gray-50"
              />

              {/* Content */}
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {course.description}
                  </p>
                  <span className="px-3 py-1 bg-blue-100 text-blue-600 text-sm font-medium rounded-full">
                    {course.price} MMK
                  </span>
                </div>

                {/* Buttons */}
                <div className="flex items-center justify-between mt-6 gap-3">
                  <Link to={`/courses/${course._id}`} className="w-1/2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-yellow-500 text-white px-4 py-2 rounded-xl shadow-md hover:bg-yellow-600 transition"
                    >
                      More Detail
                    </motion.button>
                  </Link>

                  <Link
                    to="https://m.facebook.com/msg/450502891471332/?show_interstitial=0&mdotme_uri=https%3A%2F%2Fm.me%2Fbrightenglishacademy24&source_id=1441792&handler=m.me&referer&refsrc=deprecated&_rdr"
                    className="w-1/2"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-blue-600 text-white px-4 py-2 rounded-xl shadow-md hover:bg-blue-700 transition"
                    >
                      Enroll Now
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg">
          No courses available.
        </p>
      )}
    </div>
  );
}

export default Courses;
