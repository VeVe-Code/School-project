import axios from "../../helper/axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function KnowledgeForm() {
    let {id} = useParams()
    let [title, setTitle] = useState('')
    let[description, setDescription] = useState('')
    let[about, setAbout] = useState('')
    let[writer, setWriter] = useState('')
    let nevigate=useNavigate()
    let [errors, setErrors] = useState(null)

    useEffect(()=>{
      let knowledge = async()=>{
       if(id){
         let res = await axios.get("/api/knowledge/"+ id)
         
        if(res.status === 200){
            setTitle(res.data.title)
            setDescription(res.data.description)
            setAbout(res.data.about)
            setWriter(res.data.writer)
          }
       }
      }
      knowledge()
    },[id])
    
let createknowledge =async (e)=>{
  try{  e.preventDefault()
    let knowledge = {
        title,
        description,
        about,
        writer
    }
    let res
    if(id){
 res = await axios.patch("/api/knowledge/" + id ,knowledge)
    }else{
     res = await axios.post("/api/knowledge",knowledge)
    }
    if(res.status === 200){
        nevigate('/admin/adminKnowledge')
    }}catch(e){
        setErrors(e.response.data.errors)
    }
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Create Knowledge
        </h1>

        <form className="space-y-6" onSubmit={createknowledge}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              value = {title}
              onChange ={e=> setTitle(e.target.value)}
              placeholder="Enter knowledge title"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
            {(errors && errors.title) && <p className="text-red-600 text-sm">{errors.title.msg} title</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
             value ={description}
             onChange={e => setDescription(e.target.value)}
              placeholder="Enter knowledge description"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              rows="3"
            ></textarea>
             {(errors && errors.description) && <p className="text-red-600 text-sm">{errors.description.msg} title</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              About
            </label>
            <textarea
              value ={about}
             onChange={e => setAbout(e.target.value)}
              placeholder="Enter related topics or details"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              rows="3"
            ></textarea>
             {(errors && errors.about) && <p className="text-red-600 text-sm">{errors.about.msg} title</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Writer
            </label>
            <input
              value ={writer}
             onChange={e => setWriter(e.target.value)}
              type="text"
              placeholder="Enter writer name"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
             {(errors && errors.writer) && <p className="text-red-600 text-sm">{errors.writer.msg} title</p>}
          </div>
    
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default KnowledgeForm;