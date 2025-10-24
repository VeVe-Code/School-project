let foundercontroller = require ('../controller/foundercontroller')

let express = require('express')

let router = express.Router()

router.get('/', foundercontroller.index)

router.get('/:id', foundercontroller.show)

module.exports = router