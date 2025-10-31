import React, { useContext } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import App from "../App.jsx";
import Home from "../pages/home.jsx";
import AdminLayout from "../adminLayout.jsx";
import AdminCoursedatail from '../pages/admin/admincoursedetail.jsx'
import AdminCourse from "../pages/admin/admincourse.jsx";
import CourseForm from "../pages/admin/courseform.jsx";
import AdminKnowledge from "../pages/admin/adminknowledge.jsx";
import KnowledgeForm from "../pages/admin/knowledgeform.jsx";
import LoginForm from "../pages/admin/login.jsx";
import RegisterForm from "../pages/admin/register.jsx";
import AdminLectures from "../pages/admin/adminlectures.jsx";
import FounderForm from "../pages/admin/founderform.jsx";
import TeacherForm from "../pages/admin/teacherform.jsx";
import Aboutus from '../pages/aboutus.jsx'
import CoursesDetail from '../pages/CourseDetail.jsx'
import AdminKnowledgeDetail from '../pages/admin/adminknowledgedetail'
import { AuthContext, AuthContextProvider } from "../contexts/AuthContext.jsx";
import Courses from "../pages/courses.jsx";
import Knowledge from "../pages/knowledge.jsx";
import KnowledgeDetail from '../pages/knowledgeDetail.jsx';
import Contactus  from '../pages/contactus';
import AdminContactus from '../pages/admin/admincontactus.jsx';
import AdminContactusdetail  from '../pages/admin/admincontactusdetail.jsx';
import AdminData  from '../pages/admin/admindata.jsx'
import DataForm from '../pages/admin/dataform.jsx'

// 🔹 Step 1: Wrap everything in AuthContextProvider
function Index() {
  return (
    <AuthContextProvider>
      <IndexWithAuth />
    </AuthContextProvider>
  );
}

// 🔹 Step 2: Define router AFTER context is available
function IndexWithAuth() {
  const { user } = useContext(AuthContext);

  // Optional: handle case where context is still loading
  if (user === undefined) {
    return <div>Loading...</div>;
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [{ path: "/", element: <Home /> },
        { path: "/aboutus", element: <Aboutus /> },
        { path: "/courses", element: <Courses /> },
         { path: "/courses/:id", element: <CoursesDetail /> },
            { path: "/knowledge", element: <Knowledge /> },
                   { path: "/knowledge/:id", element: <KnowledgeDetail /> },
                     { path: "/contact-us", element: <Contactus /> }
      ],
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          path: "admincourse",
          element: user ? <AdminCourse /> : <Navigate to="/admin/login" />,
        },
        {
          path: "admincourse/create",
          element: user ? <CourseForm /> : <Navigate to="/admin/login" />,
        },
         {
          path: "admincourse/:id",
          element: user ? <AdminCoursedatail/> : <Navigate to="/admin/login" />,
        },
         {
          path: "admincourse/:id",
          element: user ? <AdminCoursedatail/> : <Navigate to="/admin/login" />,
        },
        {
          path: "admincourse/edit/:id",
          element: user ? <CourseForm /> : <Navigate to="/admin/login" />,
        },
        {
          path: "adminknowledge",
          element: user ? <AdminKnowledge /> : <Navigate to="/admin/login" />,
        },
         {
          path: "adminknowledge/:id",
          element: user ? <AdminKnowledgeDetail /> : <Navigate to="/admin/login" />,
        }
        ,
        {
          path: "adminknowledge/create",
          element: user ? <KnowledgeForm /> : <Navigate to="/admin/login" />,
        },
        {
          path: "adminknowledge/edit/:id",
          element: user ? <KnowledgeForm /> : <Navigate to="/admin/login" />,
        },
        {
          path: "lecturers",
          element: user ? <AdminLectures /> : <Navigate to="/admin/login" />,
        },
        {
          path: "lecturers/edit/:id",
          element: user ? <FounderForm /> : <Navigate to="/admin/login" />,
        },
        {
          path: "lecturers/create",
          element: user ? <FounderForm /> : <Navigate to="/admin/login" />,
        },
        {
          path: "teachers/create",
          element: user ? <TeacherForm /> : <Navigate to="/admin/login" />,
        },
        {
          path: "teachers/edit/:id",
          element: user ? <TeacherForm /> : <Navigate to="/admin/login" />,
        },
         {
          path: "admincontactus",
          element: user ? <AdminContactus /> : <Navigate to="/admin/login" />,
        },
           {
          path: "admincontactus/:id",
          element: user ? <AdminContactusdetail /> : <Navigate to="/admin/login" />,
        },
        {
          path: "data",
          element: user ? <AdminData /> : <Navigate to="/admin/login" />,
        }, {
          path: "data/:id",
          element: user ? <DataForm /> : <Navigate to="/admin/login" />,
        } 
       ,
        {
          path: "login",
          element: !user ? <LoginForm /> : <Navigate to="/admin/admincourse" />,
        },
        {
          path: "register",
          element: !user ? <RegisterForm /> : <Navigate to="/admin/admincourse" />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Index;
