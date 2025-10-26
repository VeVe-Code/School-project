let express = require('express')
let contactuscontroller = require('../controller/contactuscontroller')
let router = express.Router()
const { body, validationResult } = require('express-validator');
const handleerror = require('../middleware/handleerror');


router.get('',contactuscontroller.index)
router.get('/:id',contactuscontroller.show)
router.post('',[
  body('name').notEmpty(),
   body('email').notEmpty(),
    body('phno').notEmpty(),
    body('msg').notEmpty()
],handleerror,contactuscontroller.store)
router.delete('/:id',contactuscontroller.destory)

module.exports = router