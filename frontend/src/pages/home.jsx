import axios from "../helper/axios";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {AnimatePresence } from "framer-motion";

const reviews = [
  {
    text: "I really enjoyed the friendly and supportive atmosphere of the class...",
    name: "Chan Naing Khant",
  },
  {
    text: "သေသေချာချာနဲ့ နားလည်းအောင်ရှင်းပြပြီး engကို ပိုကောင်းအောင်...",
    name: "Hein Sitt Paing Win",
  },
  {
    text: "This class was perfect for me because I'm very weak in English...",
    name: "Nan Saing Kham",
  },
  {
    text: "What I liked the most about the class was that the teacher made the lessons interesting...",
    name: "Myint Myint Htwe",
  },
  {
    text: "What I liked most was the group discussions because they helped me share ideas...",
    name: "Khoon Sint Thaw Tar",
  },
  {
    text: "I recommend this class because the teaching is good, and the teacher is kind...",
    name: "Phyo Zar Lwin",
  },
];


export default function Home() {
  let [data, setData] = useState('')
  useEffect(()=>{
    let fetchData = async() =>{
      let res = await axios.get('/api/quantity')
      if(res.status===200){
        setData(res.data)
     
      }
    }
  fetchData()
  },[])
    const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setIndex((prev) => (prev + 1) % reviews.length),
      3500
    );
    return () => clearInterval(timer);
  }, []);
  return (
    <div className=" rounded-3xl relative mt-15 min-h-screen w-full h-full bg-gradient-to-br  from-blue-50 via-white to-blue-100 flex flex-col items-center justify-center text-center px-6">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl"
      >
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4 leading-tight">
          Welcome to <span className="text-blue-600">BEA</span>
        </h1>
        <p className="text-gray-600 text-lg mb-8">
       Bright English Academy makes learning English fun, engaging, and effective.Whether you’re a beginner or an advanced learner, our experienced teachers and personalized programs ensure you reach your full potential. Let’s shine brighter together!
        </p>

      <Link to ='/courses'>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full font-medium shadow-md hover:shadow-lg transition-all mx-auto"
        >
          <span>let's learn with us</span>
          <ArrowRight size={18} />
        </motion.button>
      </Link>
        
      </motion.div>
        <div className="max-w-6xl mx-auto px-4 py-16">
      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800 text-center">
        Celebrating Our First Year Anniversary
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
            src="https://www.youtube.com/embed/aMqm71oeung?si=khBr24g35vSczBuj"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </motion.div>

        {/* Text Content */}
        <motion.div
          className="w-full md:w-1/2 text-gray-700 text-sm md:text-base font-semibold leading-relaxed"
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <p>🎉 🎉 BEA 1 Year Anniversary အထိမ်းအမှတ်အနေနဲ့ BEA Founder နဲ့ ဆရာမတွေရဲ့ မိတ်ဆက်စကားသံလေးများ 🎉</p>
          <p className="mt-4">အခုဆိုရင် BEA က ကျောင်းသားပေါင်း 200 ကျော်လဲ မွေးထုတ်ပေးနိုင်ခဲ့သလို ဆရာမများလဲ အလုံအလောက်ရှိနေပါပြီ</p>
          <p className="mt-4">1 နှစ်တိတိရပ်တည်လာနိုင်တာကလဲ BEA ကို အမြဲ Support ပေးနေတဲ့ Brighter လေးတို့ကြောင့်ပါပဲ 🥰</p>
          <p className="mt-4">BEA ရဲ့ဆရာမ မိတ်ဆက်လေးကို သေချာလေး တင်ဆက်ပေးထားတာမို့ Video လေးကို အဆုံးထိ ကြည့်သွားပေးပါအုံးနော် ✨</p>
          <p className="mt-4">Big thanks to our amazing teachers and to our Brighters for learning with passion 🌟</p>
          <p className="mt-4">Bright English Academy Contact us.</p>
        </motion.div>

      </div>
    </div>

      {/* Image Section */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="mt-16"
      >
        <Link to="https://youtube.com/@brightenglishacademy?si=X5KD94ptAAs06bvd"><motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full font-medium shadow-md hover:shadow-lg transition-all mx-auto"
        >
          <span>View Channel</span>
          <ArrowRight size={18} />
        </motion.button></Link>
      </motion.div>

      {/* Stats Section */}
   {/* Stats Section */}
<motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.5, duration: 0.8 }}
  className="mt-16 w-full flex justify-center px-4"
>
{data && data.length > 0 ? (
  data.map((d) => (
    <div
      key={d._id}
      className="bg-gradient-to-b from-[#2345dc] to-[#0b51f2] border border-blue-600 rounded-2xl shadow-[0_0_20px_rgba(0,128,255,0.15)] flex flex-col sm:flex-row items-center justify-around w-full max-w-5xl py-8 px-6 text-white space-y-4 sm:space-y-0"
    >
      {/* Students */}
      <div className="flex flex-col items-center text-center space-y-2">
        <img
          src="https://d27v83ov1up738.cloudfront.net/public/edu.png"
          alt="students"
          className="w-16 h-16"
        />
        <h6 className="text-xl font-bold text-white">{d.student}</h6>
        <span className="text-white text-sm">students</span>
      </div>

      {/* Divider */}
      <div className="hidden sm:block h-14 w-[1px] bg-blue-500/40"></div>

      {/* Videos */}
      <div className="flex flex-col items-center text-center space-y-2">
        <img
          src="https://d27v83ov1up738.cloudfront.net/public/video.png"
          alt="videos"
          className="h-16 w-16"
        />
        <h6 className="text-xl font-bold text-white">{d.course}</h6>
        <span className="text-white text-sm">videos</span>
      </div>

      {/* Divider */}
      <div className="hidden sm:block h-14 w-[1px] bg-blue-500/40"></div>

      {/* Blogs */}
      <div className="flex flex-col items-center text-center space-y-2">
          <img
          
          src="school (1).png"
          alt="videos"
          className="w-14 h-14"
        />
        <h6 className="text-xl font-bold text-white">{d.noofyear}</h6>
        <span className="text-white text-sm">of teaching</span>
      </div>
    </div>
  ))
) : (
  <div className="text-center text-gray-300 mt-6">
    No data available
  </div>
)}

</motion.div>


     <div className="max-w-5xl w-full mx-auto text-center mt-14 px-4">
  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
    Our <span className="text-blue-400">Students’</span> Reviews
  </h2>
</div>

<div className="relative flex flex-col md:flex-row justify-center items-center md:space-x-20 gap-10 md:gap-16 mt-12 px-6 py-12 bg-gradient-to-r from-blue-50 via-indigo-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-black overflow-hidden rounded-3xl shadow-xl">
  {/* YouTube Video */}
  <div className="w-full md:w-1/2 flex justify-center">
    <div className="w-full max-w-2xl aspect-video rounded-2xl overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(147,51,234,0.4)]">
      <iframe
        className="w-full h-full rounded-2xl"
        src="https://www.youtube.com/embed/2Apd8-vQiQE?si=2BzX1O_GD52ZjqIG"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  </div>

  {/* Animated Review Card */}
  <div className="w-full md:w-1/2 flex justify-center">
    <AnimatePresence mode="wait">
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 50, rotateY: 90 }}
        animate={{ opacity: 1, y: 0, rotateY: 0 }}
        exit={{ opacity: 0, y: -50, rotateY: -90 }}
        transition={{ duration: 0.7 }}
        className="bg-gradient-to-br from-blue-200 via-indigo-200 to-blue-100 dark:from-gray-800 dark:via-gray-700 dark:to-gray-900 text-gray-900 dark:text-white rounded-2xl p-8 md:p-10 shadow-lg w-full max-w-md text-center transform transition-all duration-500 hover:-translate-y-2"
      >
        <p className="text-base md:text-lg mb-6 leading-relaxed italic">
          <span className="text-blue-400 text-3xl leading-none">“</span>
          {reviews[index].text}
          <span className="text-blue-400 text-3xl leading-none">”</span>
        </p>
        <h4 className="text-blue-700 dark:text-blue-300 font-semibold text-lg">
          {reviews[index].name}
        </h4>
      </motion.div>
    </AnimatePresence>
  </div>
</div>
    
 <div className="mt-12 flex flex-col md:flex-row items-center justify-between px-6 md:px-20 gap-10 text-gray-800">
  {/* Text Section */}
  <div className="md:w-1/2 text-left space-y-4">
    <h2 className="text-3xl font-semibold text-blue-600">
      Certificate of Completion
    </h2>
    <p className="mt-10">
      Digital certificates are issued to all learners enrolled at <b>BEA (Bright English Academy)</b> upon successful completion of their program.
      Certificates are available for both free and premium courses, and are designed to officially recognise your learning journey and language development with BEA.
    </p>
    <p>
      Gain valuable credentials while enjoying a supportive and professional learning experience — guided by our expert trainers and a modern communicative teaching approach.
    </p>
   <Link to="/courses"> <p className="font-medium text-blue-500">Start your learning journey with BEA today!</p></Link>
  </div>

  {/* Image Section */}
  <div className="md:w-1/2 flex justify-center">
    <img
      src="S__2064388.jpg"
      alt="Certificate"
      className="w-full max-w-sm rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
    />
  </div>
</div>

    </div>
  );
}
