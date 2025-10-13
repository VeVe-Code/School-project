import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function AdminNav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile header */}
      <div className="md:hidden flex justify-between items-center bg-gray-800 text-white p-4 fixed w-full top-0 z-50">
        <span className="text-lg font-bold">Admin Panel</span>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gray-700 px-3 py-2 rounded hover:bg-gray-600"
        >
          {isOpen ? "Close" : "Menu"}
        </button>
      </div>

      {/* Sidebar overlay for mobile */}
      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity md:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <div
        className={`
          bg-gray-900 text-white flex flex-col
          md:w-64 md:h-screen md:static fixed top-0 left-0 h-full
          transform transition-transform duration-300 z-50
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="hidden md:block p-4 text-2xl font-bold border-b border-gray-700">
          Admin Panel
        </div>

        <nav className="flex-1 p-6 mt-16 md:mt-0">
          <ul className="space-y-4">
            <li>
              <Link
                to="/admin/orders"
                className="flex items-center gap-3 p-3 rounded-xl transition-all duration-300 hover:bg-gray-800 hover:text-white group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors duration-300"
                  viewBox="0 0 640 640"
                  fill="currentColor"
                >
                  <path d="M320 312C386.3 312 440 258.3 440 192C440 125.7 386.3 72 320 72C253.7 72 200 125.7 200 192C200 258.3 253.7 312 320 312zM290.3 368C191.8 368 112 447.8 112 546.3C112 562.7 125.3 576 141.7 576L498.3 576C514.7 576 528 562.7 528 546.3C528 447.8 448.2 368 349.7 368L290.3 368z"/>
                </svg>
                <span className="font-medium text-gray-300 group-hover:text-white">
                  Admin
                </span>
              </Link>
            </li>
            <li>
              <Link to="/admin/service" className="hover:text-gray-300 block p-3 rounded-xl hover:bg-gray-800">
                Services
              </Link>
            </li>
            <li>
              <Link to="/admin/news" className="hover:text-gray-300 block p-3 rounded-xl hover:bg-gray-800">
                News
              </Link>
            </li>
            <li>
              <Link to="/admin/adminContactUs" className="hover:text-gray-300 block p-3 rounded-xl hover:bg-gray-800">
                Contact Us
              </Link>
            </li>
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-700">
          <button
            className="w-full bg-red-600 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  )
}

export default AdminNav
