const removefile = require("../helper/removefile")
const Lecturers = require("../model/Lecturers")
const mongoose = require("mongoose")
let fs = require("fs").promises

let lecturercontroller = {
    index:async(req,res) =>{
        let lecturers = await Lecturers.find()
     return res.json(lecturers)
    },
    store:async(req,res) =>{
        try{let{name,role,about} = req.body
        let lecturer = await Lecturers.create({
            name,
            role,
            about
        })
        return res.json(lecturer)}catch(e){
            return res.status(500).json({msg:"server error"})
        }
    },
    show:async(req,res) =>{
      try{
        const id = req.params.id
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({msg:"id  is invalid"})
        }
        let lecturer = await Lecturers.findById(id)
        if(!lecturer){
            return res.status(404).json({msg:"lecturer not found"})
        }
        return res.json(lecturer)
      }catch(e){
            return res.status(500).json({msg:"server error"})
      }
    },
    destory:async(req,res) =>{
       try{
        const id = req.params.id
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({msg:"id  is invalid"})
        }
        let lecturer = await Lecturers.findByIdAndDelete(id)
        await removefile(__dirname + "/../public" + lecturer.photo);
        if(!lecturer){
            return res.status(404).json({msg:"lecturer not found"})
        }
        return res.json(lecturer)
      }catch(e){
            return res.status(500).json({msg:"server error"})
      }
    },
   update: async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "id is invalid" });
    }

    let lecturer = await Lecturers.findByIdAndUpdate(id, {
      ...req.body,
    });

    if (!lecturer) {
      return res.status(404).json({ msg: "lecturer not found" });
    }

    await removefile(__dirname + "/../public" + lecturer.photo);
    return res.json(lecturer);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: "server error" });
  }
},
    upload:async(req,res) =>{
        try{
           const id = req.params.id
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({msg:"id  is invalid"})
        }
        let lecturer = await Lecturers.findByIdAndUpdate(id,{
            photo:'/'+ req.file.filename
        })
        if(!lecturer){
            return res.status(404).json({msg:"lecturer not found"})
        }
        return res.json(lecturer)
        }catch(e){
            return res.status(500).json({msg:"server error"})
        }
    }
}
module.exports =  lecturercontroller 