let mongoose = require('mongoose')
let bcrypt = require("bcrypt")

let Schema = mongoose.Schema

let AdminSchema =  new Schema({
    name:{
        type : String,
        required: true
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

AdminSchema.statics.register = async function(name,email,password){
    let AdminExists = await this.findOne({email})
     if(AdminExists){
        throw new Error("Admin already exist!")
     }
     let salt = await bcrypt.genSalt()
     let hashvalue = await bcrypt.hash(password,salt)

        let newadmin = await this.create({
            name,email,password : hashvalue
        })
        return newadmin
}


AdminSchema.statics.login = async function(email, password) {
  let admin = await this.findOne({ email });
  if (!admin) throw new Error("Admin does not exist!");

  const isCorrect = await bcrypt.compare(password, admin.password);
  if (!isCorrect) throw new Error("Incorrect password");

  return admin;
};


module.exports = mongoose.model("Admins",AdminSchema)




