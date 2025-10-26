const { default: mongoose } = require("mongoose")
const Contactus = require("../model/Contactus")

let contactuscontroller = {
    index :async(req,res) =>{
        let contactus = await Contactus.find().sort({createdAt : -1})
        return res.json(contactus)
    },
    show :async (req,res) =>{
    try{ let id = req.params.id
        if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json({msg:"id  is invalid"})
            }
     let contactus = await Contactus.findById(id)
      if(!contactus){
             return res.status(404).json({msg:"Contactus not found"})
        }
        return res.json(contactus)}catch(e){
            return res.status(500).json({msg:"server error"})
        }
    },
    store:async (req,res) =>{
try{        let {name,email,phno,msg} = req.body
        let contactus  =await Contactus.create({
            name,email,phno,msg
        })
        return res.json(contactus)}catch(e){
            return res.status(500).json({msg : "server error"})
        }
    },
     destory :async (req,res) =>{
    try{ let id = req.params.id
        if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json({msg:"id  is invalid"})
            }
     let contactus = await Contactus.findByIdAndDelete(id)
      if(!contactus){
             return res.status(404).json({msg:"Contactus not found"})
        }
        return res.json(contactus)}catch(e){
            return res.status(500).json({msg:"server error"})
        }
    }

}

module.exports = contactuscontroller