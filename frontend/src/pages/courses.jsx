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
                  <h3 className="text-xl font-semibold text-blue-400 mb-2">
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
              <div className="max-w-6xl mx-auto px-4 py-16">
      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800 text-center">
        One On One <span className="text-blue-500">Class</span>
      </h1>

      {/* Content Container */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-10 md:gap-20">
        
        {/* Video */}
        <motion.div
          className="w-full md:w-1/2 flex justify-center md:justify-start"
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <iframe
            className="w-full h-64 md:h-80 rounded-lg shadow-lg"
            src="https://www.youtube.com/embed/9WidUcq7C1E?si=jcWNeP_NU-qUugVb"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </motion.div>
        
        <motion.div
          className="w-full md:w-1/2 text-gray-700 text-sm md:text-base font-semibold leading-relaxed"
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <p>𝐁𝐄𝐀 ဆိုတာနဲ့ တွဲမြင်တဲ့ 𝐎𝐧𝐞 𝐨𝐧 𝐎𝐧𝐞 𝐂𝐥𝐚𝐬𝐬 လေးနဲ့ မိတ်ဆက်ပေးချင်ပါတယ် </p>
          <p className="mt-4">𝐎𝐧𝐞 𝐨𝐧 𝐎𝐧𝐞 𝐂𝐥𝐚𝐬𝐬 ဆိုတဲ့အတိုင်း အချိန်တွေ၊ ရက်တွေ ညှိပြီး တိုင်ပင်လို့ရတဲ့အတွက်ကြောင့် မအားလို့ သင်တန်းပျက်ရမှာတွေနဲ့ စာလွတ်မှာတွေ စိတ်ပူစရာ မလိုတော့ဘူးနော် </p>
          <p className="mt-4">အတန်းတွေကလဲ</p>
          <p className="mt-4">✅ 𝐄𝐧𝐠𝐥𝐢𝐬𝐡 𝐅𝐨𝐮𝐫 𝐒𝐤𝐢𝐥𝐥𝐬 
✅ 𝐄𝐧𝐠𝐥𝐢𝐬𝐡 𝐒𝐩𝐞𝐚𝐤𝐢𝐧𝐠
✅ 𝐈𝐄𝐋𝐓𝐒 </p>
          <p className="mt-4">ကိုယ်သင်ချင်တဲ့အတန်းကို စိတ်ကြိုက်ရွေးပြီး သင်ရုံပဲ💕

𝐁𝐲 𝐎𝐧𝐞 အတန်းလေးမို့ လွတ်လွတ်လပ်လပ်စာမေးနိုင်ပြီး 𝐓𝐞𝐚𝐜𝐡𝐞𝐫 ကလဲ အနီးကပ် ကိုယ်ဖိရင်ဖိသင်ပေးမှာပါရှင် 🤪

ကဲ….. 𝐁𝐄𝐀 ရဲ့ လူတတ်များတဲ့အတန်းလေးကို အသေးစိတ်သိချင်ရင်တော့ 𝐂𝐡𝐚𝐭 𝐁𝐨𝐱 ကိုသာ အမြန်ဆုံးလှမ်းခဲ့လို့ရပါပြီ 🫶🏼</p>
          <p className="mt-4">Bright English Academy Contact us.</p>
        </motion.div>

      </div>
    </div>
    </div>

  );
}

export default Courses;
