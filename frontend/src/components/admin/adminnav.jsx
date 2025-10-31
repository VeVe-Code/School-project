import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import axios from 'axios';
import { Menu, X, Home, BookOpen, User, Mail, Info } from 'lucide-react';

function AdminNav() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const res = await axios.post('/api/admins/logout');
      if (res.status === 200) {
        dispatch({ type: 'LOGOUT' });
        navigate('/admin/login');
      }
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const menuItems = [
    { name: 'Dashboard', to: '/admin/orders', icon: <Home className="w-5 h-5" /> },
    { name: 'Courses', to: '/admin/admincourse', icon: <BookOpen className="w-5 h-5" /> },
    { name: 'Knowledge', to: '/admin/adminKnowledge', icon: <BookOpen className="w-5 h-5" /> },
    { name: 'Lecturers', to: '/admin/lecturers', icon: <User className="w-5 h-5" /> },
    { name: 'Contact Us', to: '/admin/admincontactus', icon: <Mail className="w-5 h-5" /> },
    { name: 'BEA Info', to: '/admin/data', icon: <Info className="w-5 h-5" /> },
  ];

  return (
    <>
      {/* Mobile Header */}
      {user && (
       <div className="fixed md:hidden top-0 left-0 w-full bg-gray-800 text-white z-50 flex items-center justify-between px-4 sm:px-6 py-3 shadow-md">
          <span className="font-bold text-lg">Admin Panel</span>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md bg-gray-700 hover:bg-gray-600 transition"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      )}

      {/* Sidebar overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity md:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static top-0 left-0 h-full w-64 bg-gray-900 text-white z-50
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* Desktop Header */}
        <div className="hidden md:flex items-center justify-center h-16 border-b border-gray-700 text-2xl font-bold">
          Admin Panel
        </div>

        {/* Menu */}
        <nav className="mt-16 md:mt-0 p-4 flex flex-col flex-1">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              onClick={() => setIsOpen(false)} // Close sidebar on mobile
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors text-gray-300 hover:text-white mb-2"
            >
              {item.icon}
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={logout}
            className="w-full bg-red-600 hover:bg-red-700 transition py-2 rounded-lg font-medium"
          >
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

export default AdminNav;
