import React, { useEffect, useState } from "react";
import axios from "../../helper/axios";
import { useNavigate, useParams } from "react-router-dom";


function FounderForm() {
  let { id } = useParams();

  let [name, setName] = useState("");
  let [position, setPosition] = useState("");
  let [about, setAbout] = useState("");
  let [preview, setPreview] = useState(null);
  let navigate = useNavigate();
  let [file, setFile] = useState(null);

  let upload = (e) => {
    let file = e.target.files[0];
    setFile(file);
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      setPreview(e.target.result);
    };
    fileReader.readAsDataURL(file);
  };

  let founder = async (e) => {
    e.preventDefault();

    let data = {
      name,
      position,
      about,
    };

    let res;
    if (id) {
      res = await axios.patch("/api/founder/" + id, data);
    } else {
      res = await axios.post("/api/founder", data);
    }

    // ✅ only upload if file exists
    if (file) {
      let formData = new FormData();
      formData.set("photo", file);

      // ✅ use id if editing, else use new _id
      let founderId = id || res.data._id;

      let uploadfile = await axios.post(
        "/api/founder/" + founderId + "/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // ✅ correct header
          },
        }
      );
      console.log(uploadfile);
    }

    if (res.status === 200) {
      navigate("/admin/lecturers");
    }
  };

  useEffect(() => {
    if (id) {
      let fetchFounder = async () => {
        let res = await axios.get("/api/founder/" + id);
        if (res.status === 200) {
          setName(res.data.name);
          setPosition(res.data.position);
          setAbout(res.data.about);
          setPreview(import.meta.env.VITE_BACKEND_URL + res.data.photo);
        }
      };
      fetchFounder();
    }
  }, [id]);

  return (
    <form
      className="max-w-md mx-auto p-4 bg-white rounded shadow mt-20"
      onSubmit={founder}
    >
      <h2 className="text-xl font-bold mb-4 text-center">Founder Form</h2>

      <input type="file" onChange={upload} className="mb-2" />
      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="w-50 h-50 rounded-2xl object-cover mx-auto shadow-lg ring-2 ring-indigo-500/30 hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out"
        />
      )}

      <input
        onChange={(e) => setName(e.target.value)}
        value={name}
        type="text"
        placeholder="Name"
        className="w-full mb-3 p-2 border rounded mt-20"
      />

      <input
        value={position}
        onChange={(e) => setPosition(e.target.value)}
        type="text"
        placeholder="Position"
        className="w-full mb-3 p-2 border rounded"
      />

      <textarea
        value={about}
        onChange={(e) => setAbout(e.target.value)}
        placeholder="About"
        rows="3"
        className="w-full mb-3 p-2 border rounded"
      ></textarea>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Save
      </button>
    </form>
  );
}

export default FounderForm;
