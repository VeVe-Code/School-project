let mongoose = require ('mongoose')

const Schema = mongoose.Schema

const ContactusSchema = new Schema ({
    name:{
        type : String,
        required : true
    },
    email:{
        type : String,
        required : true
    },
    phno:{
        type:Number,
        required  : true
    },
    msg:{
        type:String,
        required :true
    }
},{
    timestamps : true
})
module.exports = mongoose.model('Contactus',ContactusSchema)