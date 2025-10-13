import React from 'react'
import { Outlet } from 'react-router-dom'
import Nav from './components/admin/adminnav'

function adminLayout() {
  return (
    <>
  <div className='flex'>
     <div>
     <Nav></Nav>
   </div>
    <div className='w-full h-full'>
        <Outlet></Outlet>
    </div>
  </div>
    </>
  )
}

export default adminLayout