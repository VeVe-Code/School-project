import React from 'react';
import { Outlet } from 'react-router-dom';
import Nav from './components/admin/adminnav';

function AdminLayout() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      
      {/* Sidebar / Nav */}
      <div className="w-full md:w-64 flex-shrink-0 bg-white shadow-md">
        <Nav />
      </div>

      {/* Main content */}
      <div className="flex-1 p-4 md:p-8">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;