// AdminCourse.jsx
import axios from '../../helper/axios';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import CourseCard from '../../components/admin/coursecard';
import Pagination from '../../components/admin/AdminPagi';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function AdminCourse() {
  const [courses, setCourses] = useState([]);
  const [links, setLinks] = useState(null);
  const [search, setSearch] = useState('');
  const [focused, setFocused] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const Searchquery = new URLSearchParams(location.search);
  const page = parseInt(Searchquery.get('page')) || 1;

  useEffect(() => {
    const timeout = setTimeout(async () => {
      try {
        const res = await axios.get(`/api/courses?page=${page}&title=${search}`);
        if (res.status === 200) {
          setCourses(res.data.data);
          setLinks(res.data.links);
          window.scroll({ top: 0, left: 0, behavior: 'smooth' });
        }
      } catch (err) {
        console.error('Error fetching courses:', err);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [page, search]);

  const Deletecourse = (_id) => {
    if (courses.length === 1 && page > 1) {
      navigate(`/admin/admincourse?page=${page - 1}`);
    } else {
      setCourses(prev => prev.filter(c => c._id !== _id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 md:mt-4 mt-16">
      {/* Search bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-end w-full mb-6"
      >
        <motion.div
          animate={{ width: focused ? '90%' : '70%' }}
          transition={{ duration: 0.4, type: 'spring' }}
          className="flex items-center bg-white shadow-md border border-gray-300 rounded-full px-3 py-2 hover:shadow-lg transition-all duration-300 sm:w-[16rem] md:w-[22rem] lg:w-[24rem]"
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
              onClick={() => setSearch('')}
              type="button"
              className="text-gray-400 hover:text-gray-600 transition ml-2"
            >
              ✕
            </button>
          )}
        </motion.div>
      </motion.div>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-3xl font-bold text-gray-800">Courses</h2>
        <Link to="/admin/admincourse/create/">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
            Create Course
          </button>
        </Link>
      </div>

      {/* Courses grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {courses.length > 0 ? (
          courses.map(course => (
            <CourseCard key={course._id} course={course} Deletecourse={Deletecourse} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No courses found.</p>
        )}
      </div>

      {/* Pagination */}
      {links && (
        <div className="mt-8">
          <Pagination links={links} page={page} />
        </div>
      )}
    </div>
  );
}

export default AdminCourse;
