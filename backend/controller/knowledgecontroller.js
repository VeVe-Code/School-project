const  mongoose = require("mongoose")
const Knowledge = require("../model/Knowledge")





let knowledgecontroller = {

    index:async(req,res)=>{
        let limit = 6
        let page = req.query.page || 1
        let knowledge = await Knowledge  
        .find()
        .skip((page - 1) * 6)
        .limit(limit)
        .sort({createdAt:-1})

        let TotalKnowledge = await Knowledge.countDocuments()
        console.log(TotalKnowledge)
        let TotalPage = Math.ceil(TotalKnowledge/limit)

        console.log(TotalPage)
          let links = {
  nextPage:page < TotalPage,
  previousPage: page>1,
  currentPage: 1,
  looplinks: [
    // changed duplicate 2 → 3 (optional)
  ]
}
        for (let index = 0; index < TotalPage; index++) {
            let number = index+1
    links.looplinks.push({number})
            
        }
let response = {
 links,
    data:knowledge,
 
}
        return res.json(response) 
    },
    store:async(req,res)=>{
     try{   let {title,description,about,writer} =req.body
        let knowledge = await Knowledge.create({
            title,
            description,
            about,
            writer
        })
        return res.json(knowledge) }catch(e){
            return res.status(500).json({msg:" server error" })
        }
    },
    show:async(req,res)=>{
       try{ let id = req.params.id
        if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).json({msg:"Invalid Id"})
        }
        let knowledge = await Knowledge.findById(id)
         if(!knowledge){
    return res.status(404).json({msg:"not found knowledge"})
        }
         return res.json(knowledge)}catch(e){
            return res.status(500).json({msg:"server error"})
         }
    },
    destroy:async(req,res)=>{
      try{ let id = req.params.id
        if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).json({msg:"Invalid Id"})
        }
        let knowledge = await Knowledge.findByIdAndDelete(id)
         if(!knowledge){
    return res.status(404).json({msg:"not found knowledge"})
        }
         return res.json(knowledge)}catch(e){
            return res.status(500).json({msg:"server error"})
         }
    },
    update:async(req,res)=>{
   try{ let id = req.params.id
        if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).json({msg:"Invalid Id"})
        }
        let knowledge = await Knowledge.findByIdAndUpdate(id,{
            ...req.body
        })
         if(!knowledge){
    return res.status(404).json({msg:"not found knowledge"})
        }
         return res.json(knowledge)}catch(e){
            return res.status(500).json({msg:"server error"})
         }
    }
    }






module.exports = knowledgecontroller