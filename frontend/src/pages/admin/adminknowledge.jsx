import axios from "../../helper/axios";
import React, { useEffect, useState } from "react";
import KnowledgeCard from "../../components/admin/knowledgecard";
import KnowledgePagi from "../../components/admin/knowledgepagi";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

function AdminKnowledge() {
  const [knowledge, setKnowledge] = useState([]);
  const [links, setLinks] = useState(null);
  const [search, setSearch] = useState("");
  const [focused, setFocused] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const searchQuery = new URLSearchParams(location.search);
  let page = parseInt(searchQuery.get("page")) || 1;

  useEffect(() => {
    const fetchKnowledge = async () => {
      try {
        const res = await axios.get(`/api/knowledge?page=${page}`);
        if (res.status === 200) {
          setKnowledge(res.data.data);
          setLinks(res.data.links);
        }
      } catch (err) {
        console.error("Error fetching knowledge:", err);
      }
    };

    const searchKnowledge = async () => {
      try {
        const res = await axios.get(`/api/knowledge?title=${search}`);
        if (res.status === 200) {
          setKnowledge(res.data.data);
          setLinks(null); // hide pagination for search
        }
      } catch (err) {
        console.error("Error searching knowledge:", err);
      }
    };

    if (search.trim() !== "") {
      searchKnowledge();
    } else {
      fetchKnowledge();
    }
  }, [page, search]);

  const onDelete = (_id) => {
    if (knowledge.length === 1 && page > 1) {
      navigate(`/admin/adminKnowledge?page=${page - 1}`);
    } else {
      setKnowledge((prev) => prev.filter((p) => p._id !== _id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8 md:mt-2 mt-16">
      {/* Search Bar */}
      <div className="flex justify-end mb-6">
        <motion.div
          animate={{
            width: focused ? "90%" : "70%",
          }}
          transition={{ duration: 0.4, type: "spring" }}
          className="flex items-center rounded-2xl px-3 py-2 bg-white shadow border
                     sm:w-[16rem] md:w-[20rem] lg:w-[24rem]"
        >
          <Search className="text-gray-500 mr-2" size={20} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Search knowledge..."
            className="w-full bg-transparent outline-none text-sm sm:text-base"
          />
        </motion.div>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Knowledge Management
        </h1>
        <Link to="/admin/adminKnowledge/create">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-xl shadow-sm hover:bg-blue-700 transition">
            + Add Knowledge
          </button>
        </Link>
      </div>

      {/* Card List */}
      <div className="grid gap-6 md:grid-cols-2">
        {knowledge.length > 0 ? (
          knowledge.map((item) => (
            <KnowledgeCard
              key={item._id}
              item={item}
              ondelete={onDelete}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No knowledge found.
          </p>
        )}
      </div>

      {/* Pagination */}
      {links && (
        <div className="mx-auto max-w-md mt-8 text-center">
          <KnowledgePagi links={links} page={page} />
        </div>
      )}
    </div>
  );
}

export default AdminKnowledge;
