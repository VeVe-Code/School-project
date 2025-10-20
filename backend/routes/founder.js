let express = require('express')
let foundercontroller = require('../controller/foundercontroller')
let router = express.Router()
let upload = require('../helper/upload')
const { body } = require('express-validator')
router.get('', foundercontroller.index)

const handleerror = require('../middleware/handleerror');


router.get('', foundercontroller.index)
router.post('',[
    body('name').notEmpty(),
    body('about').notEmpty(),
    body('position').notEmpty()
],handleerror, foundercontroller.store)
router.patch('/:id', foundercontroller.update)
router.get('/:id', foundercontroller.show)
router.delete('/:id', foundercontroller.destory)

router.post('/:id/upload', [
  upload.single('photo'),

  // ✅ Validate the uploaded file
  body('photo').custom((value, { req }) => {
    if (!req.file) {
      throw new Error('file is required');
    }
    if (!req.file.mimetype.startsWith('image/')) {
      throw new Error('file must be an image');
    }
    return true;
  })

], handleerror, foundercontroller.upload);

module.exports = router