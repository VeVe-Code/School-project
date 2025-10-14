Authmiddleware = (req,res,next) =>{
let token = req.cookies.jwt
if(token){
   next()
}else{
  return res.status(400).json({msg:"token beed to provide"})
}
 

}

module.exports = Authmiddleware