import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "../../helper/axios";
import { useNavigate, useParams } from "react-router-dom";

function CourseForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [about, setAbout] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  // Fetch course data if editing
  useEffect(() => {
    const fetchCourse = async () => {
      if (id) {
        let res = await axios.get("/api/courses/" + id);
        if (res.status === 200) {
          setTitle(res.data.title);
          setDescription(res.data.description);
          setAbout(res.data.about);
          setPrice(res.data.price);
           setPreview(import.meta.env.VITE_BACKEND_URL + res.data.photo);
        }
      }
    };
    fetchCourse();
  }, [id]);

  // Handle file upload + preview
  const upload = (e) => {
    const file = e.target.files[0];
    setFile(file);

    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      setPreview(e.target.result);
    };
    fileReader.readAsDataURL(file);
  };

  // Submit form
  const createCourse = async (e) => {
    e.preventDefault();
    try {
      const course = { title, description, about, price };
      let res;

      // Create or update
      if (id) {
        res = await axios.patch("/api/courses/" + id, course);
      } else {
        res = await axios.post("/api/courses", course);
      }

      // Upload image if file selected
      if (file) {
        const formData = new FormData();
        formData.set("photo", file);

        const courseId = id || res.data._id;
        const uploadRes = await axios.post(
          `/api/courses/${courseId}/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(uploadRes);
      }

      if (res.status === 200) {
        navigate("/admin/admincourse");
      }
    } catch (e) {
      setError(e.response?.data?.errors || {});
    }
  };

  return (
    <div className="mx-auto max-w-lg md:mt-10 mt-20 px-4">
      {/* Animated Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white rounded-2xl shadow-xl p-8"
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="font-bold text-3xl text-center text-gray-800"
        >
          {id ? "Update Course" : "Create New Course"}
        </motion.h1>

        <form onSubmit={createCourse} className="mt-6 space-y-5">
          {/* Preview */}
          {preview && (
            <img
              className="w-40 rounded-xl border border-gray-200 shadow-sm mx-auto"
              src={preview}
              alt="Preview"
            />
          )}

          {/* File input */}
          <input
            type="file"
            onChange={upload}
            className="block w-full text-sm text-gray-600
              file:mr-4 file:py-2 file:px-4
              file:rounded-xl file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100 cursor-pointer"
          />

          {/* Title */}
          <motion.input
            whileFocus={{ scale: 1.02 }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="w-full p-3 border border-gray-300 rounded-xl 
            focus:ring-2 focus:ring-blue-400 focus:border-blue-400 
            outline-none transition"
            placeholder="Course Title"
          />
          {error?.title && (
            <p className="text-red-600 text-sm">{error.title.msg}</p>
          )}

          {/* Description */}
          <motion.textarea
            whileFocus={{ scale: 1.02 }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl 
            focus:ring-2 focus:ring-blue-400 focus:border-blue-400 
            outline-none transition min-h-[100px]"
            placeholder="Short Description"
          />
          {error?.description && (
            <p className="text-red-600 text-sm">{error.description.msg}</p>
          )}

          {/* About */}
          <motion.textarea
            whileFocus={{ scale: 1.02 }}
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl 
            focus:ring-2 focus:ring-blue-400 focus:border-blue-400 
            outline-none transition min-h-[150px]"
            placeholder="Detailed About the Course"
          />
          {error?.about && (
            <p className="text-red-600 text-sm">{error.about.msg}</p>
          )}

          {/* Price */}
          <motion.input
            whileFocus={{ scale: 1.02 }}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            className="w-full p-3 border border-gray-300 rounded-xl 
            focus:ring-2 focus:ring-blue-400 focus:border-blue-400 
            outline-none transition"
            placeholder="Price (MMK)"
          />
          {error?.price && (
            <p className="text-red-600 text-sm">{error.price.msg}</p>
          )}

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-3 rounded-xl bg-blue-600 text-white 
            font-semibold text-lg shadow-md hover:bg-blue-700 transition"
          >
            {id ? "Update Course" : "Create Course"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

export default CourseForm;
