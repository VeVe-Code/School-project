import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "../../helper/axios";
import Data from "../../components/admin/datacard.jsx";
import { Link } from "react-router-dom";

function AdminData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🟦 Fetch all records
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/quantity");
        if (res.status === 200) {
          setData(res.data);
        }
      } catch (error) {
        console.error("❌ Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 🟥 Delete record
  const deletefn = async (_id) => {
    try {
      await axios.delete(`/api/quantity/${_id}`);
      setData((prev) => prev.filter((p) => p._id !== _id));
    } catch (error) {
      console.error("❌ Error deleting record:", error);
    }
  };

  // 🟩 Update record (if DataCard supports edit)
  const updatefn = async (_id, formData) => {
    try {
      await axios.put(`/api/quantity/${_id}`, formData);
      setData((prev) =>
        prev.map((p) => (p._id === _id ? { ...p, ...formData } : p))
      );
    } catch (error) {
      console.error("❌ Error updating record:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.8 }}
      className="mt-20 md:mt-10 w-full grid grid-cols-1 justify-center px-4 gap-6"
    >
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-3xl text-blue-400">BEA Information</h1>
        <Link to="/admin/data/dataform">
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-3 px-4 rounded-lg transition">
            Create Information
          </button>
        </Link>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center text-gray-400 mt-6">Loading data...</div>
      )}

      {/* Data List */}
      {!loading && data.length === 0 && (
        <div className="text-center text-gray-400 mt-6">No data available</div>
      )}

      {!loading &&
        data.map((d) => (
          <Data
            key={d._id}
            d={d}
            deletefn={deletefn}
            updatefn={updatefn}
          />
        ))}
    </motion.div>
  );
}

export default AdminData;
