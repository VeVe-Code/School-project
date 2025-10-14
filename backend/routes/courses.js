let express = require('express')
let coursecontroller = require('../controller/coursecontroller')
const { body, validationResult } = require('express-validator');
const handleerror = require('../middleware/handleerror');
let router = express.Router()


router.get('',coursecontroller.index)
router.post('',[
  body('title').notEmpty(),
   body('description').notEmpty(),
    body('about').notEmpty(),
    body('price').notEmpty()
],handleerror,coursecontroller.store)
router.get('/:id',coursecontroller.show)
router.patch('/:id',coursecontroller.update)
router.delete('/:id',coursecontroller.destory)


module.exports = router