import React from 'react';
import { Outlet } from 'react-router-dom';
import Nav from './components/admin/adminnav';

function AdminLayout() {
  return (
    <div className="md:flex">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full  shadow-md overflow-y-auto md:block">
        <Nav />
      </div>

      {/* Main content */}
      <div className="flex-1 md:ml-64 p-4">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
