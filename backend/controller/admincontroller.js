let Admins = require('../model/Admins')
let createToken = require('../helper/createtoken')


let admincontroller = {
    login : async(req,res)=>{
     try {
  const { email, password } = req.body;

  const admin = await Admins.login(email, password);

  // Optional: create JWT token for session
  const token = createToken(admin._id);

  // Optional: send cookie
  res.cookie("jwt", token, { httpOnly: true, maxAge: 3 * 24 * 60 * 60 * 1000 });

  return res.status(200).json({ admin, token });
} catch (e) {
  return res.status(400).json({ error: e.message });
}},
    register : async(req,res) =>{
    
    

      try {
          let {name,email,password} = req.body
          let newadmin = await Admins.register(name,email,password)
     
       
let token = createToken(newadmin._id);
res.cookie("jwt", token, {httpOnly : true, maxAge : 3 * 24 * 60 * 60 *1000});
return res.json({ newadmin, token });
      } catch (e) {
        return res.status(400).json({error : e.message})
      }
    }

}

module.exports = admincontroller