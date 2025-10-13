let express = require('express')
let knowledgecontroller = require('../controller/knowledgecontroller')
let router = express.Router() 
const { body, validationResult } = require('express-validator');
const handleerror = require('../middleware/handleerror');

router.get('',knowledgecontroller.index)

router.post('',[
  body('title').notEmpty(),
   body('description').notEmpty(),
    body('about').notEmpty(),
    body('writer').notEmpty()
],handleerror,knowledgecontroller.store)
router.get('/:id',knowledgecontroller.show)
router.delete('/:id',knowledgecontroller.destroy)
router.patch('/:id',knowledgecontroller.update)


module.exports = router