import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Home from './pages/home.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AdminLayout from './adminLayout.jsx'
import AdminCourse from './pages/admin/admincourse.jsx'
import CourseForm from './pages/admin/courseform.jsx'
import AdminKnowledge from './pages/admin/adminknowledge.jsx'
import KnowledgeForm from './pages/admin/knowledgeform.jsx'
import LoginForm from './pages/admin/login.jsx'
import RegisterForm from './pages/admin/register.jsx'
import { AuthContextProvider } from './contexts/AuthContext.jsx'
const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children:[
      {
        path:'/',
        element:<Home></Home>
      }
    ]
    
  },{
    path:'/admin',
    element:<AuthContextProvider>
      <AdminLayout></AdminLayout>
      </AuthContextProvider> 
    
    ,
    children:[
      {
        path:'admincourse',
        element:<AdminCourse/>
      },
       {
        path:'admincourse/create',
        element:<CourseForm/>
      },
       {
        path:'admincourse/edit/:id',
        element:<CourseForm/>
      },{
        path:'adminknowledge',
        element:<AdminKnowledge/>
      },
      {
        path:'adminknowledge/create',
        element:<KnowledgeForm/>
      },
        {
        path:'adminknowledge/edit/:id',
        element:<KnowledgeForm/>
      },{
        path:'login',
        element:<LoginForm/>
      },{
        path:"register",
        element:<RegisterForm/>
      }
    ]  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router} />
  </StrictMode>,
)
