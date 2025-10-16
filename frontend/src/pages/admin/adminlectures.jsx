import React from "react";


function AdminLectures() {
  return (
 <div className="p-8 bg-gray-50 min-h-screen space-y-16">
      {/* ======== Founder Section ======== */}
      <section className="max-w-5xl mx-auto bg-white rounded-xl p-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Left: Image */}
          <div className="flex-shrink-0">
            <img
              src="https://randomuser.me/api/portraits/men/10.jpg"
              alt="Founder"
              className="w-56 h-56 object-cover rounded-lg border border-gray-300"
            />
          </div>

          {/* Right: Text */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">👑 John Doe</h2>
            <p className="text-blue-600 font-medium mb-4">Founder & CEO</p>
            <p className="text-gray-600">
              John founded this platform with a vision to make coding education
              accessible and practical. With over 10 years in the software
              industry, he continues to mentor aspiring developers worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* ======== Lecturers Section ======== */}
      <section className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
          🎓 Our Lecturers
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Lecturer 1 */}
          <div className="bg-white p-6 rounded-xl text-center">
            <img
              src="https://randomuser.me/api/portraits/women/45.jpg"
              alt="Alice Johnson"
              className="w-28 h-28 object-cover rounded-lg border border-gray-300 mx-auto mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-800">Alice Johnson</h2>
            <p className="text-blue-600 font-medium mb-2">Frontend Instructor</p>
            <p className="text-gray-600 text-sm">
              Expert in React and Next.js with 5+ years of teaching experience.
            </p>
          </div>

          {/* Lecturer 2 */}
          <div className="bg-white p-6 rounded-xl text-center">
            <img
              src="https://randomuser.me/api/portraits/men/52.jpg"
              alt="Michael Tan"
              className="w-28 h-28 object-cover rounded-lg border border-gray-300 mx-auto mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-800">Michael Tan</h2>
            <p className="text-green-600 font-medium mb-2">Backend Engineer</p>
            <p className="text-gray-600 text-sm">
              Specialist in Node.js, Express, and MongoDB architecture.
            </p>
          </div>

          {/* Lecturer 3 */}
          <div className="bg-white p-6 rounded-xl text-center">
            <img
              src="https://randomuser.me/api/portraits/women/68.jpg"
              alt="Sara Kim"
              className="w-28 h-28 object-cover rounded-lg border border-gray-300 mx-auto mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-800">Sara Kim</h2>
            <p className="text-pink-600 font-medium mb-2">UI/UX Designer</p>
            <p className="text-gray-600 text-sm">
              Designs clean, accessible interfaces with a focus on usability.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

 

export default AdminLectures;
