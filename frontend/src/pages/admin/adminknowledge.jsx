import axios from "../../helper/axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import KnowledgeCard from "../../components/admin/knowledgecard";
import KnowledgePagi from "../../components/admin/knowledgepagi"
import { useLocation, useNavigate } from "react-router-dom";


function AdminKnowledge() {
  let [Knowledge, setKnowledge] = useState([])
     let [links,setLinks] = useState(null)
 let location = useLocation()
  let Searchquery = new URLSearchParams(location.search)
  let page = Searchquery.get('page') 
  let navigate = useNavigate()
  page = parseInt(page)

  useEffect(() => {

   

    let fetchKnowledge = async () => {
      let res = await axios.get("/api/knowledge?page=" + page)
      if (res.status === 200) {
        setKnowledge(res.data.data)
        setLinks(res.data.links)
      }
    }
    fetchKnowledge()
  }, [page])

 let ondelete = (_id) =>{
  if(Knowledge.length === 1 && page > 1){
       navigate('/admin/adminKnowledge?page=' +(page - 1))
  }else{
     setKnowledge(prev => prev.filter(p => p._id !== _id))
  }
  
 }


  return (
    <div className="min-h-screen bg-gray-50 p-8 md:mt-2 mt-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Knowledge Management</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-xl shadow-sm hover:bg-blue-700 transition">
          + Add Knowledge
        </button>
      </div>

      {/* Card List */}
      <div className="grid gap-6 md:grid-cols-2">
        {!!Knowledge.length && Knowledge.map((item) => (
          <KnowledgeCard item={item} key={item._id} ondelete={ondelete} />
        ))}
      </div>
      <div className="mx-auto max-w-md mt-8 text-center">
      {!!links &&  <KnowledgePagi links={links} page={page || 1}></KnowledgePagi>}
      </div>
    </div>
  );
}

export default AdminKnowledge;