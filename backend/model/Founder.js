let mongoose = require("mongoose")


let Schema = mongoose.Schema

let founderSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    position:{
        type:String,
        required:true
    },    
    about:{
        type:String,
        required:true
    },
    photo:{
        type:String,
  
    }
    
})

module.exports = mongoose.model("Founder",founderSchema)