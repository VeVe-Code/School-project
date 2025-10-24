

let express = require('express')
const lecturercontroller = require('../controller/lecturercontoller')

let router = express.Router()

router.get('/', lecturercontroller.index)

router.get('/:id', lecturercontroller.show)

module.exports = router