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
    hidden: { opacity: 0, y: 40, scale: 0.9 },
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
      y: -5,
      boxShadow: "0 20px 40px rgba(59,130,246,0.25)",
      background:
        "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(147,197,253,0.15))",
      transition: { duration: 0.35, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen relative overflow-hidden bg-gradient-to-br  text-white px-4 sm:px-8 md:px-12 lg:px-20 py-16"
    >
      {/* Ambient Glow Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          className="absolute -top-32 -left-32 w-96 h-96 bg-blue-500/20 blur-[120px] rounded-full"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
          className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/20 blur-[120px] rounded-full"
        />
      </div>

      {/* Search Bar */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex justify-center mb-14 relative z-10"
      >
        <motion.div
          animate={{ width: focused ? "90%" : "70%" }}
          transition={{ duration: 0.4, type: "spring" }}
          className="flex items-center bg-white/10 backdrop-blur-lg border border-white/20 rounded-full px-4 py-3 w-full max-w-lg shadow-lg hover:shadow-blue-500/30 transition-all"
        >
          <Search className="text-blue-400 mr-3" size={20} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Search knowledge..."
            className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400 text-base sm:text-lg"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              type="button"
              className="text-gray-800 hover:text-gray-800 transition ml-2"
            >
              ✕
            </button>
          )}
        </motion.div>
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto text-center mb-16 px-4"
      >
        <h1 className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-r text-blue-500 bg-clip-text  mb-4">
          Knowledge Hub
        </h1>
        <p className="text-gray-900 text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
          Discover, learn, and grow with the most exciting tech insights.
        </p>
      </motion.div>

      {/* Topics Grid */}
      {loading ? (
        <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="bg-white/10 animate-pulse rounded-2xl p-6 h-44"
              />
            ))}
        </div>
      ) : topics.length === 0 ? (
        <div className="text-center text-gray-400 text-lg">
          No topics available.
        </div>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-6xl mx-auto bg-sky-300 rounded grid gap-8 sm:grid-cols-2 lg:grid-cols-3 relative z-10"
        >

     {topics.map((item) => (
 
    <motion.div
    key={item._id}
    variants={card}
    whileHover={glow.whileHover}
    className="relative bg-white rounded-2xl border border-gray-200 p-6 shadow-lg overflow-hidden group cursor-pointer transition-all"
  >
    {/* Animated border glow */}
    <motion.div
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-gradient-to-tr bg-white to-transparent rounded-2xl"
      animate={{
        backgroundPosition: ["0% 0%", "100% 100%"],
      }}
      transition={{
        repeat: Infinity,
        duration: 4,
        ease: "easeInOut",
      }}
    />
    <div className="relative z-10">
      <h2 className="text-xl font-semibold hover:underline  text-blue-900 mb-2 group-hover:text-blue-700 transition">
        {item.title}
      </h2>
      <p className="text-sm text-gray-700 sm:text-base leading-relaxed mb-4 line-clamp-3">
        {item.description}
      </p>
      <Link to={`/knowledge/${item._id}`}>
        <motion.button
          whileHover={{
            x: 3,
            color: "#3B82F6",
          }}
          transition={{ duration: 0.3 }}
          className="text-blue-600 text-sm sm:text-base font-medium"
        >
          Learn More →
        </motion.button>
      </Link>
    </div>
  </motion.div>

))}

        </motion.div>
      )}

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="text-center mt-20 text-gray-400 text-xs sm:text-sm"
      >
        © {new Date().getFullYear()} Knowledge Platform — BEA
      </motion.div>
    </motion.div>
  );
}

export default Knowledge;
