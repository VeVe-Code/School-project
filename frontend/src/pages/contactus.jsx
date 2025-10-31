import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "../helper/axios";
import DOMPurify from "dompurify";

export default function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phno, setPhno] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false); // ✅ new state

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.2 },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
     const safeMessage = DOMPurify.sanitize(msg, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
    setLoading(true); // ✅ start loading
    try {
      const data = { name, email, phno, msg:safeMessage };
      const res = await axios.post("/api/contactus", data);

      if (res.status === 200) {
        console.log(res.data);
        setError({});
        setName("");
        setEmail("");
        setPhno("");
        setMsg("");
        alert("✅ Your message has been sent successfully!");
      }
    } catch (e) {
      console.error(e);
      setError(e.response?.data?.errors || {});
    } finally {
      setLoading(false); // ✅ stop loading
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={container}
      className="min-h-screen bg-gray-100 py-12 px-6 md:px-12 lg:px-24"
    >
      {/* Header */}
      <motion.div
        variants={fadeUp}
        className="max-w-3xl mx-auto text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
          Get in Touch
        </h1>
        <p className="text-gray-600 text-lg">
          We'd love to hear from you! Choose the best way to reach out.
        </p>
      </motion.div>

      {/* Feedback Form */}
      <motion.div
        variants={fadeUp}
        className="max-w-3xl mx-auto bg-white rounded-3xl p-8 sm:p-10 shadow-lg"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-6">
          Send Us a Message
        </h2>
        <p className="text-gray-500 text-center mb-8 text-sm sm:text-base">
          Fill out the form below and we’ll get back to you promptly. <br />
          or <br />
          Email directly to{" "}
          <span className="text-blue-500">
            englishacademybright@gmail.com
          </span>
        </p>

        <form className="space-y-6 max-w-xl mx-auto" onSubmit={handleSubmit}>
          {/* Name */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-blue-500 focus:border-blue-500"
            />
            {error.name && (
              <p className="text-red-500 text-sm mt-1">{error.name.msg}</p>
            )}
          </motion.div>

          {/* Phone */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="text"
              value={phno}
              onChange={(e) => setPhno(e.target.value)}
              placeholder="Enter your phone"
              className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-blue-500 focus:border-blue-500"
            />
            {error.phno && (
              <p className="text-red-500 text-sm mt-1">{error.phno.msg}</p>
            )}
          </motion.div>

          {/* Email */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-blue-500 focus:border-blue-500"
            />
            {error.email && (
              <p className="text-red-500 text-sm mt-1">{error.email.msg}</p>
            )}
          </motion.div>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <label className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              rows="5"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              placeholder="Write your message..."
              className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-blue-500 focus:border-blue-500"
            />
            {error.msg && (
              <p className="text-red-500 text-sm mt-1">{error.msg.msg}</p>
            )}
          </motion.div>

          {/* Submit Button with Loading Spinner */}
          <motion.button
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center items-center gap-2 font-semibold px-6 py-3 rounded-xl shadow-lg transition transform hover:scale-105 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700"
            }`}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
                <span>Submitting...</span>
              </>
            ) : (
              "Submit"
            )}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
}
