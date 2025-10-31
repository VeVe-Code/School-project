const { default: mongoose } = require("mongoose")
const Qunatity = require("../model/Qunatity")


let quantitycontroller = {
    index:async(req,res)=>{
        let quantity = await Qunatity.find() 
        return res.json(quantity)
    },
     store:async(req,res)=>{
       try{ let{student,course,noofyear} = req.body
        let quantity = await Qunatity.create({
            student,course,noofyear
        })
        return res.json(quantity)}catch(e){
            return res.status(500).json({msg:"server error"})
        }
     }
    ,
    show:async(req,res) =>{
       try{ let id = req.params.id
        if(!mongoose.Types.ObjectId.isValid(id)){
               return res.status(400).json({msg:"invalid id"})
        }
        let quantity = await Qunatity.findById(id)
        if(!quantity){
              return res.status(404).json({msg:"not found quantity"})
        }
        return res.json(quantity)}catch(e){
            return res.status(500).json({msg:"server error"})
        }
    },
    destory:async(req,res) =>{
        try{ let id = req.params.id
        if(!mongoose.Types.ObjectId.isValid(id)){
               return res.status(400).json({msg:"invalid id"})
        }
        let quantity = await Qunatity.findByIdAndDelete(id)
        if(!quantity){
              return res.status(404).json({msg:"not found quantity"})
        }
        return res.json(quantity)}catch(e){
            return res.status(500).json({msg:"server error"})
        }
    },
    update:async(req,res)=>{
        try{ let id = req.params.id
        if(!mongoose.Types.ObjectId.isValid(id)){
               return res.status(400).json({msg:"invalid id"})
        }
        let quantity = await Qunatity.findByIdAndUpdate(id,{
            ...req.body
        })
        if(!quantity){
              return res.status(404).json({msg:"not found quantity"})
        }
        return res.json(quantity)}catch(e){
            return res.status(500).json({msg:"server error"})
        }
    }
    
    
}

module.exports = quantitycontroller;

