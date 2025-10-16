import React, { useContext } from 'react'
import App from '../App.jsx'
import Home from '../pages/home.jsx'
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import AdminLayout from '../adminLayout.jsx'

import AdminCourse from '../pages/admin/admincourse.jsx'
import CourseForm from '../pages/admin/courseform.jsx'
import AdminKnowledge from '../pages/admin/adminknowledge.jsx'
import KnowledgeForm from '../pages/admin/knowledgeform.jsx'
import LoginForm from '../pages/admin/login.jsx'
import RegisterForm from '../pages/admin/register.jsx'
import AdminLectures from '../pages/admin/adminlectures.jsx'

import { AuthContext, AuthContextProvider } from '../contexts/AuthContext.jsx'

// 🔹 Step 1: Wrap your router with provider
function Index() {
  return (
    <AuthContextProvider>
      <IndexWithAuth />
    </AuthContextProvider>
  );
}

// 🔹 Step 2: Create your router inside context-aware component
function IndexWithAuth() {
  const { user } = useContext(AuthContext);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [{ path: "/", element: <Home /> }],
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        { path: "admincourse", element: user ? <AdminCourse /> : <Navigate to="/admin/login" /> },
        { path: "admincourse/create", element: user ? <CourseForm /> : <Navigate to="/admin/login" /> },
        { path: "admincourse/edit/:id", element: user ? <CourseForm /> : <Navigate to="/admin/login" /> },
        { path: "adminknowledge", element: user ? <AdminKnowledge /> : <Navigate to="/admin/login" /> },
        { path: "adminknowledge/create", element: user ? <KnowledgeForm /> : <Navigate to="/admin/login" /> },
        { path: "adminknowledge/edit/:id", element: user ? <KnowledgeForm /> : <Navigate to="/admin/login" /> }
        , { path: "lecturers", element:  <AdminLectures /> },
        { path: "login", element: !user ? <LoginForm /> : <Navigate to="/admin/admincourse" /> },
        { path: "register", element: !user ? <RegisterForm /> : <Navigate to="/admin/admincourse" /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Index;
