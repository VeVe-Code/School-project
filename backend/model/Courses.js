let mongoose = require('mongoose')

let Schema = mongoose.Schema

let CourseSchma = new Schema({
    title:{
        type : String,
        required: true
    },
    description:{
        type : String,
        required:true
    },
    about:{
        type: String,
        required: true
    },
    price:{
        type:Number,
        required:true
    }
},{timestamps: true})

module.exports = mongoose.model('Courses', CourseSchma)