let mongoose = require('mongoose')

let Schema = mongoose.Schema

let KnowledgeSchema = new Schema({
    title:{
         type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    about:{
        type:String,
        required:true
    },
    writer:{
        type:String,
        required:true
    }
},
{
    timestamps: true
})

module.exports = mongoose.model("Knowledge", KnowledgeSchema)