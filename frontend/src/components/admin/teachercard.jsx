import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import Linkify from 'react-linkify';

function TeacherCard({ teacher, Delete }) {
  let onDelete = async () => {
    let res = await axios.delete('/api/lecturers/' + teacher._id);
    if (res.status === 200) {
      Delete(teacher._id);
    }
  };

  // Split about into lines
  const lines = teacher.about.split("\n").filter(line => line.trim() !== "");
  const isList = lines.every(line => line.trim().startsWith("-"));

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 w-full max-w-[20rem] sm:max-w-sm md:max-w-md mx-auto">
      <img
        src={import.meta.env.VITE_BACKEND_URL + teacher.photo}
        alt={teacher.name}
        className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-cover rounded-xl border border-gray-200 mx-auto mb-4 shadow-sm"
      />

      <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-1 break-words">
        {teacher.name}
      </h2>
      <p className="text-blue-600 font-medium text-xs sm:text-sm md:text-base mb-2">
        {teacher.role}
      </p>
<Linkify>
      <div className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed px-1 sm:px-3">
        {isList ? (
          <ul>
            {lines.map((line, idx) => (
              <li key={idx}>{line.replace(/^\-\s*/, "")}</li>
            ))}
          </ul>
        ) : (
          lines.map((line, idx) => <p key={idx}>{line}</p>)
        )}
      </div>
      </Linkify>

      <div className="mt-5 flex justify-center gap-2 sm:gap-4 flex-wrap">
        <Link to={'/admin/teachers/edit/' + teacher._id}>
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-600 text-white text-xs sm:text-sm md:text-base px-3 sm:px-4 py-2 rounded-lg shadow-sm transition-all duration-200 w-24 sm:w-auto"
          >
            Edit
          </button>
        </Link>
        <button
          onClick={onDelete}
          className="bg-red-500 hover:bg-red-600 text-white text-xs sm:text-sm md:text-base px-3 sm:px-4 py-2 rounded-lg shadow-sm transition-all duration-200 w-24 sm:w-auto"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TeacherCard;
