const Courses = require("../model/Courses")
let mongoose = require('mongoose')

let coursecontroller = {
    index:async(req,res)=>{
       let limit = 6
       let page = req.query.page || 1
        let courses =await Courses
        .find()
     .skip((page-1) * limit)
     .limit(limit)
        .sort({createdAt:-1})

 let totalCourse = await Courses.countDocuments()
 console.log(totalCourse)
 let TotalPage = Math.ceil(totalCourse/limit)
 console.log(TotalPage)


  let links = {
  nextPage :  page < TotalPage,
  previousPage :page > 1,
  currentPage : page,
  Looplinks :[]

  }
  //generate loopLinks array
  for (let index = 0; index < TotalPage; index++) {
    let number = index+1
    links.Looplinks.push({number})
    
  }
  
  console.log(links)

  let response = {
     links,
        data: courses
    
    }
    return res.json(response)
},
store:async(req,res)=>
    {
try{let {title,description,about,price} = req.body    
let course = await Courses.create({
    title,description,about,price
})

   return res.json(course)}catch(e){
    return res.status(400).json({msg:"error"})
   }
}
,
    show:async(req,res)=>{
try{        let id = req.params.id
     if(!mongoose.Types.ObjectId.isValid(id)){
         return res.status(400).json({msg:"id  is invalid"})
     }
        let course = await Courses.findById(id) 
        if(!course){
             return res.status(404).json({msg:"Course not found"})
        }
        
        return res.json(course)}catch(e){
             return res.status(500).json({msg:"server error "})
        }
    },
    update:async(req,res)=>{
       try{        let id = req.params.id
     if(!mongoose.Types.ObjectId.isValid(id)){
         return res.status(400).json({msg:"id  is invalid"})
     }
        let course = await Courses.findByIdAndUpdate(id,{
            ...req.body
        }) 
        if(!course){
             return res.status(404).json({msg:"Course not found"})
        }
        
        return res.json(course)}catch(e){
             return res.status(500).json({msg:"server error "})
        }
    },
    destory:async(req,res)=>{
       try{        let id = req.params.id
     if(!mongoose.Types.ObjectId.isValid(id)){
         return res.status(400).json({msg:"id  is invalid"})
     }
        let course = await Courses.findByIdAndDelete(id) 
        if(!course){
             return res.status(404).json({msg:"Course not found"})
        }
        
        return res.json(course)}catch(e){
             return res.status(500).json({msg:"server error "})
        }
    }
}

module.exports = coursecontroller
