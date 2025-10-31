import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "../helper/axios";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";

function Knowledge() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get(`/api/publicknowledge?title=${search}`);
        const data = Array.isArray(res.data.data) ? res.data.data : [];
        setTopics(data);
      } catch (error) {
        console.error("Error fetching topics:", error);
        setTopics([]);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, [search]);

  // Animation Variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const card = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const glow = {
    whileHover: {
      scale: 1.05,
      rotateX: 3,
      rotateY: 2,
      boxShadow: "0px 20px 35px rgba(59,130,246,0.2)",
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 px-4 sm:px-8 md:px-12 lg:px-20 py-16"
    >
      {/* Search Bar */}
      <div className="flex justify-center mb-12">
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

      {/* Header */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto text-center mb-14 px-4"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Knowledge Hub
        </h1>
        <p className="text-gray-600 text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
          Expand your skills with essential topics and stay ahead in the ever-evolving tech world.
        </p>
      </motion.div>

      {/* Topics Grid */}
      {loading ? (
        <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="bg-gray-200/50 animate-pulse rounded-2xl p-6 h-40"
              />
            ))}
        </div>
      ) : topics.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">
          No topics available.
        </div>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-6xl mx-auto grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {topics.map((item) => (
            <motion.div
              key={item._id}
              variants={card}
              whileHover={glow.whileHover}
              className="relative bg-white rounded-2xl p-6 border border-gray-100 shadow-md overflow-hidden group cursor-pointer hover:-translate-y-1 hover:shadow-xl transition-transform"
            >
              {/* Gradient Glow */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-blue-100/20 via-blue-200/30 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              />

              {/* Content */}
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                {item.title}
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-3 line-clamp-3">
                {item.description}
              </p>
              <Link to={`/knowledge/${item._id}`}>
                <button className="text-blue-600 hover:text-blue-800 text-sm sm:text-base font-medium">
                  More Detail →
                </button>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="text-center mt-20 text-gray-500 text-xs sm:text-sm"
      >
        © {new Date().getFullYear()} Knowledge Platform. All rights reserved.
      </motion.div>
    </motion.div>
  );
}

export default Knowledge;
