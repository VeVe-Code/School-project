import React, { useState } from "react";
import { Trash2, Edit2, Check, X } from "lucide-react";

function DataCard({ d, deletefn, updatefn }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    student: d.student,
    course: d.course,
    noofyear: d.noofyear,
  });

  const onDelete = () => deletefn(d._id); // ✅ FIXED
  const onEdit = () => setIsEditing(true);
  const onCancel = () => {
    setFormData({ student: d.student, course: d.course, noofyear: d.noofyear });
    setIsEditing(false);
  };
  const onSave = () => {
    updatefn(d._id, formData); // ✅ FIXED
    setIsEditing(false);
  };

  return (
    <div className="relative bg-gradient-to-b from-[#020617] to-[#0f172a] border border-blue-500/40 rounded-2xl shadow-[0_0_20px_rgba(0,128,255,0.15)] 
      flex flex-col sm:flex-row sm:items-center sm:justify-around w-full max-w-5xl py-6 px-4 text-white space-y-4 sm:space-y-0">
      
      {/* Delete / Edit Icons */}
      <div className="absolute top-3 right-3 flex space-x-2">
        {!isEditing ? (
          <>
            <button onClick={onDelete} className="p-2 rounded-full bg-red-500/20 hover:bg-red-500/40 transition">
              <Trash2 className="w-5 h-5 text-red-400 hover:text-red-300" />
            </button>
            <button onClick={onEdit} className="p-2 rounded-full bg-yellow-500/20 hover:bg-yellow-500/40 transition">
              <Edit2 className="w-5 h-5 text-yellow-400 hover:text-yellow-300" />
            </button>
          </>
        ) : (
          <>
            <button onClick={onSave} className="p-2 rounded-full bg-green-500/20 hover:bg-green-500/40 transition">
              <Check className="w-5 h-5 text-green-400 hover:text-green-300" />
            </button>
            <button onClick={onCancel} className="p-2 rounded-full bg-red-500/20 hover:bg-red-500/40 transition">
              <X className="w-5 h-5 text-red-400 hover:text-red-300" />
            </button>
          </>
        )}
      </div>

      {/* Student */}
      <div className="flex flex-col items-center text-center space-y-2 sm:mx-2 w-full sm:w-auto">
        {isEditing ? (
          <input
            type="text"
            value={formData.student}
            onChange={(e) => setFormData({ ...formData, student: e.target.value })}
            className="w-full sm:w-24 text-center rounded-md text-white px-2 py-1 bg-gray-900/30"
          />
        ) : (
          <>
            <h6 className="text-xl font-bold text-blue-400 truncate">{d.student}</h6>
            <span className="text-gray-400 text-sm">students</span>
          </>
        )}
      </div>

      {/* Divider */}
      <div className="hidden sm:block h-14 w-[1px] bg-blue-500/40"></div>

      {/* Course */}
      <div className="flex flex-col items-center text-center space-y-2 sm:mx-2 w-full sm:w-auto">
        {isEditing ? (
          <input
            type="text"
            value={formData.course}
            onChange={(e) => setFormData({ ...formData, course: e.target.value })}
            className="w-full sm:w-24 text-center rounded-md text-white px-2 py-1 bg-gray-900/30"
          />
        ) : (
          <>
            <h6 className="text-xl font-bold text-blue-400 truncate">{d.course}</h6>
            <span className="text-gray-400 text-sm">videos</span>
          </>
        )}
      </div>

      {/* Divider */}
      <div className="hidden sm:block h-14 w-[1px] bg-blue-500/40"></div>

      {/* Number of Years */}
      <div className="flex flex-col items-center text-center space-y-2 sm:mx-2 w-full sm:w-auto">
        {isEditing ? (
          <input
            type="text"
            value={formData.noofyear}
            onChange={(e) => setFormData({ ...formData, noofyear: e.target.value })}
            className="w-full sm:w-24 text-center rounded-md text-white px-2 py-1 bg-gray-900/30"
          />
        ) : (
          <>
            <h6 className="text-xl font-bold text-blue-400 truncate">{d.noofyear}</h6>
            <span className="text-gray-400 text-sm">Number of year</span>
          </>
        )}
      </div>
    </div>
  );
}

export default DataCard;
