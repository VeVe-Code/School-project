import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "../../helper/axios";
import { ArrowLeft } from "lucide-react";

export default function AdminContactUsDetail() {
  const { id } = useParams();
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await axios.get(`/api/contactus/${id}`);
        setContact(res.data);
      } catch (err) {
        console.error("Error fetching contact:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchContact();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full"
        ></motion.div>
      </div>
    );
  }

  if (!contact) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Contact not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 md:mt-1 mt-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Contact Message Detail</h1>
        <Link
          to="/admin/admincontactus"
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </Link>
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8 border border-gray-100"
      >
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Name</h2>
            <p className="text-gray-600">{contact.name}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-700">Email</h2>
            <p className="text-gray-600">{contact.email}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-700">Phone Number</h2>
            <p className="text-gray-600">{contact.phno}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-700">Message</h2>
            <p className="text-gray-600 bg-gray-50 p-4 rounded-xl border border-gray-100">
              {contact.msg}
            </p>
          </div>

          <div className="pt-4 text-sm text-gray-500">
            <p>
              <span className="font-medium">Created:</span>{" "}
              {new Date(contact.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
