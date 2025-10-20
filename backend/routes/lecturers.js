let express = require("express")
let lecturercontroller  = require('../controller/lecturercontoller')
let router = express.Router()
const { body, validationResult } = require('express-validator');
const handleerror = require('../middleware/handleerror');
let upload = require('../helper/upload')
router.get('', lecturercontroller.index)
router.post('',[
  body('name').notEmpty(),
   body('role').notEmpty(),
    body('about').notEmpty(),
 
],handleerror, lecturercontroller.store)
router.post('/:id/upload', upload.single('photo'),body('photo').custom((value,{req})=>{
  if(!req.file){
    throw new Error('file is required')
  };
  if(!req.file.mimetype.startsWith('image')){
    throw new Error('file must be an image')
  };
  return true;
}),handleerror, lecturercontroller.upload)
router.get('/:id', lecturercontroller.show)
router.delete('/:id', lecturercontroller.destory)
router.patch('/:id', lecturercontroller.update)



module.exports = router


