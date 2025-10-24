let express = require('express')
let coursecontroller = require('../controller/coursecontroller')
const { body, validationResult } = require('express-validator');
const handleerror = require('../middleware/handleerror');
let router = express.Router()
let upload = require('../helper/upload')


router.get('',coursecontroller.index)
router.post('',[
  body('title').notEmpty(),
   body('description').notEmpty(),
    body('about').notEmpty(),
    body('price').notEmpty()
],handleerror,coursecontroller.store)
router.get('/:id',coursecontroller.show)
router.patch('/:id',coursecontroller.update)
router.post('/:id/upload',[upload.single('photo'),
  body('photo').custom((value,{req})=>{
  if(!req.file){
    throw new Error('photo is required')
  }
  if(!req.file.mimetype.startsWith("image")){
    throw new Error('file must be image')
  }
  return true

  })
],handleerror,coursecontroller.upload)
router.delete('/:id',coursecontroller.destory)


module.exports = router