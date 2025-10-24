let express = require('express')
const coursecontroller = require('../controller/coursecontroller')

let Router = express.Router()

Router.get('',coursecontroller.index)
Router.get('/:id',coursecontroller.show)

module.exports = Router