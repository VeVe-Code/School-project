import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { use } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function teacherform() {
    let {id} = useParams()
  
    let [name, setName] = React.useState('')
    let [role, setRole] = React.useState('')
    let [about, setAbout] = React.useState('')
    let [file, setFile] = React.useState(null)
    let [preview, setPreview] = React.useState(null)
    let nevigate = useNavigate()


    let SubmitFrom = async(e)=>{
        e.preventDefault()
        let data = {
            name,
            role,
            about
        }
        let res;
        if(id){
            res = await axios.patch('/api/lecturers/'+id,data)
        }else{
                res = await axios.post('/api/lecturers',data)
        }

        //file
        let formData = new FormData
        formData.set('photo',file)

          //upload
         let uploadRes = await axios.post('/api/lecturers/'+res.data._id+'/upload',formData,{
          headers :{
            Accept : 'multipart/form-data',
          }
         })
         console.log(uploadRes)
        if(res.status === 200){
            alert("teacher created successfully")
            nevigate('/admin/lecturers')
        }
    }
useEffect(()=>{
    if(id){
        let fetchTeacher = async()=>{
            let res = await axios.get('/api/lecturers/'+id)
            if(res.status === 200){
                setName (res.data.name)
                setRole (res.data.role)
                setAbout (res.data.about)
                   setPreview(import.meta.env.VITE_BACKEND_URL + res.data.photo);
            }
    }
    fetchTeacher()}

},[id])

let upload = async(e)=>{
  let file = e.target.files[0]
  setFile(file)
 // preview
 let fileReader = new FileReader()
 fileReader.onload = async(e)=>{
  let preview = e.target.result
setPreview(preview)
 }
 fileReader.readAsDataURL(file)
}

  return (
    <form
      className="max-w-md mx-auto p-4 bg-white rounded shadow mt-20"
        onSubmit={SubmitFrom}
      
    >
      <h2 className="text-xl font-bold mb-4 text-center">{id ? "Teachers Edit Form" : "Teachers Form"}</h2>

     
      <input type='file' onChange={upload}/>
     {preview && <img src={preview} className='h-48 w-48 object-cover mb-3'/>}
      <input
        onChange={(e) => setName(e.target.value)}
        value={name}
        type="text"
        placeholder="Name"
        className="w-full mb-3 p-2 border rounded mt-20"
      />

      <input
        value={role}
        onChange={(e) => setRole(e.target.value)}
        type="text"
        placeholder="Role"
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
        {id ? "edit" : "Save"}
      </button>
    </form>
  )
}

export default teacherform