
let mongoose = require('mongoose')


let Schema = mongoose.Schema

let LecturerSchema = new Schema({
    name:{
         type : String,
        required : true
    },
     photo:{
         type : String

    },
    role:{
        type:String,
        required:true
    },
    about:{
        type:String,
        required:true
    }
},{timestamps: true})

module.exports = mongoose.model("Lecturers",LecturerSchema)