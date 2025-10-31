let mongoose = require('mongoose')

let Schema = mongoose.Schema
 
let quantitySchame = new Schema({
      student:{
        type:String,
        required:true
    },
      course:{
        type:String,
        required:true
      },
      noofyear:{
        type:String,
        required:true
      }
})

module.exports = mongoose.model('Quantity',quantitySchame)

 