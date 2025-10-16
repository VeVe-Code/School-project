let express = require('express')
let foundercontroller = require('../controller/foundercontroller')
let router = express.Router()
let upload = require('../helper/upload')
const { body } = require('express-validator')
router.get('', foundercontroller.index)

const handleerror = require('../middleware/handleerror');
// router.post('/', foundercontroller.store)


// router.patch('/createimg', foundercontroller.update)

router.post('/:id/upload',[
    upload.single('photo'),
    body('photo')
    .custom((value,{req})=>{
        if(!req.file){
            throw new Error('file is required')
        }
        if(!req.file.mimetype.startsWith('image')){
            throw new Error('file must be an image')
        }
        return true
    })

],handleerror,foundercontroller.upload)

module.exports = router