import { useNavigate } from "react-router-dom";
import axios from "../../helper/axios";
import React, { useState } from "react";

function DataForm() {
  let [student, setStudent] = useState("");
  let [course, setCourse] = useState("");
  let [noofyear, setNoofyear] = useState("");
  let [loading, setLoading] = useState(false); // ✅ added loading state
  let navigate = useNavigate();

  let Submit = async (e) => {
    e.preventDefault();

    if (!student || !course || !noofyear) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    try {
      setLoading(true); // ✅ start loading
      let data = { student, course, noofyear };
      let res = await axios.post("/api/quantity", data);

      if (res.status === 200) {
        console.log("successful");
        alert("Data submitted successfully!");
        navigate("/admin/data");
      }
    } catch (error) {
      if (error.response) {
        console.error("Error:", error.response.data);
        alert(`Error: ${error.response.data.msg || "Invalid input data"}`);
      } else {
        console.error("Network or other error:", error);
        alert("Failed to connect to server.");
      }
    } finally {
      setLoading(false); // ✅ stop loading
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        className="bg-white shadow-md rounded-xl p-6 w-full max-w-md"
        onSubmit={Submit}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          BEA Information
        </h2>

        {/* Student */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Number of Students</label>
          <input
            type="text"
            value={student}
            onChange={(e) => setStudent(e.target.value)}
            placeholder="Enter number of students"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        {/* Course */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Number of Courses</label>
          <input
            type="text"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            placeholder="Enter number of courses"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        {/* No of Year */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">
            Number of Years (BEA)
          </label>
          <input
            type="text"
            value={noofyear}
            onChange={(e) => setNoofyear(e.target.value)}
            placeholder="Enter number of years"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading} // ✅ disable while loading
          className={`w-full text-white font-semibold py-2 rounded-lg transition ${
            loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Submitting..." : "Submit"} {/* ✅ show loading text */}
        </button>
      </form>
    </div>
  );
}

export default DataForm;

