let express = require ('express')
const knowledgecontroller = require('../controller/knowledgecontroller')

let router = express.Router()

router.get('',knowledgecontroller.index)
router.get('/:id',knowledgecontroller.show)


module.exports = router