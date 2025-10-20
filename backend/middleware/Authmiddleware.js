const Admins = require("../model/Admins")
const jwt = require("jsonwebtoken")

Authmiddleware = (req,res,next) =>{
let token = req.cookies.jwt
if(token){
  jwt.verify(token,process.env.JWT_SECRET, (err,decodedToken)=>{
    if(err){
     return res.status(401).json({msg:"unauthenticated"})  
    }else{
      Admins.findById(decodedToken._id).then(user =>{
        req.user = user
         next()
      })
 
      }})
 
}else{
  return res.status(400).json({msg:"token beed to provide"})
}
 

}

module.exports = Authmiddleware