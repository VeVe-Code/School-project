import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import axios from "../../helper/axios";
import { Link } from "react-router-dom";

// ✅ Example Data Row Component
function Data({ d, OnDelete }) {
  return (
    <tr className="hover:bg-gray-50 transition">
      <td className="px-6 py-3 text-sm text-gray-700">{d.name}</td>
      <td className="px-6 py-3 text-sm text-gray-700">{d.phno}</td>
      <td className="px-6 py-3 text-sm text-gray-700">{d.email}</td>
      <td className="px-6 py-3 text-sm text-gray-700 max-w-xs truncate"><Link to={"/admin/admincontactus/" + d._id}><button className=" bg-blue-300 text-sm text-white rounded px-4 p-3">read msg</button></Link></td>
      <td className="px-6 py-3 text-sm text-gray-500">
        {new Date(d.createdAt).toLocaleDateString()}
      </td>
      <td className="px-6 py-3 text-center">
        <button
          onClick={() => OnDelete(d._id)}
          className="text-red-500 hover:text-red-700 font-medium transition"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default function AdminContactus() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const FetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/contactus?name=" + search);
        if (res.status === 200) {
          setData(res.data);
        }
      } catch (err) {
        console.error("Error fetching contact messages:", err);
      } finally {
        setLoading(false);
      }
    };
    FetchData();
  }, [search]);

  const OnDeleted = async(_id) => {
       await axios.delete(`/api/contactus/${_id}`);
    setData((prev) => prev.filter((p) => p._id !== _id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:mt-3 mt-14">
        {/* Title */}
        <h1 className="text-xl font-bold md:hidden text-gray-800 mb-6">
          📩 Customer Contact Messages
        </h1>

        {/* Header */}
        <div className="flex justify-between p-3 items-center">
          <h1 className="text-2xl mr-28 font-bold hidden md:block text-gray-800 mb-6 whitespace-nowrap">
            📩 Customer Contact Messages
          </h1>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-end w-full p-4"
          >
            <motion.div
              animate={{
                width: focused ? "90%" : "70%",
              }}
              transition={{ duration: 0.4, type: "spring" }}
              className="flex items-center rounded-2xl px-3 py-2 bg-white/10 shadow-2xl border hover:border-2
                        sm:w-[16rem] sm:animate-none sm:transition-none 
                        md:w-[20rem] lg:w-[24rem]"
            >
              <Search className="text-gray-500 mr-2" size={20} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="Search data..."
                className="w-full bg-transparent outline-none text-sm sm:text-base"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Phone</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Message</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
                <th className="px-6 py-3 text-center text-sm font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {/* Loading Spinner */}
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-6">
                    <div
                      role="status"
                      className="flex justify-center items-center h-20"
                    >
                      <svg
                        aria-hidden="true"
                        className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051..."
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409..."
                          fill="currentFill"
                        />
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </div>
                  </td>
                </tr>
              ) : data.length > 0 ? (
                data.map((d) => (
                  <Data d={d} key={d._id} OnDelete={OnDeleted} />
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
