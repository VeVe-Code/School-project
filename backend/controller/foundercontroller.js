const { mongoose } = require("mongoose")
const Founder = require("../model/Founder")
const removefile = require("../helper/removefile")
let fs = require("fs").promises


let foundercontroller = {
        index :async (req,res)=>{
             let founders = await Founder.find()
            return res.json(founders)
        },
        store: async(req,res)=>{
      try{  let {name,about,position} = req.body
            let founder = await Founder.create({
                name,
                about,
                position
            })
            return res.json(founder)}catch(e){
            return res.status(500).json({msg:"server error"})
            }
        }, 
       show: async (req, res) => {
  try {
    let id = req.params.id;

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid Id" });
    }

    // Find founder
    let founder = await Founder.findById(id);
    if (!founder) {
      return res.status(404).json({ msg: "not found founder" });
    }

    // Return data
    return res.json(founder);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: "server error" });
  }
}
,
      update: async (req, res) => {
  try {
    let id = req.params.id;

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid Id" });
    }

    // Find and update founder
    let founder = await Founder.findByIdAndUpdate(id, {
      ...req.body,
    });

     await removefile( __dirname + '/../public' + founder.photo)
      
     if (!founder) {
      return res.status(404).json({ msg: "not found founder" });
    }

    // Return data
    return res.json(founder);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: "server error" });
  }
},
       
          destory:async(req,res)=>{
            try {
    let id = req.params.id;

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid Id" });
    }

    // Find founder
    let founder = await Founder.findByIdAndDelete(id);
    await removefile( __dirname + '/../public' + founder.photo)
    if (!founder) {
      return res.status(404).json({ msg: "not found founder" });
    }

    // Return data
    return res.json(founder);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: "server error" });
  }
        },
        upload: async(req,res)=>{
     
            try{let id = req.params.id;

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid Id" });
    }

    // Find founder
    let founder = await Founder.findByIdAndUpdate(id,{
        photo : '/' + req.file.filename
    });
    if (!founder) {
      return res.status(404).json({ msg: "not found founder" });
    }

    // Return data
    return res.json(founder);}catch(e){
                return res.status(500).json({msg:"server error"})
            }
        }

}


module.exports = foundercontroller

