let express = require('express')
let admincontroller = require('../controller/admincontroller')
const { body, validationResult } = require('express-validator');
const handleerror = require('../middleware/handleerror');
const Admins = require('../model/Admins');
let Authmiddleware = require('../middleware/authmiddleware')

let route = express.Router()

route.post('/login',admincontroller.login)
route.get('/me',Authmiddleware ,admincontroller.me)
route.post('/logout',admincontroller.logout)

route.post('/register',[
  body('name').notEmpty(),
    body('email').custom(async value => {
    const user = await Admins.findOne({email : value});
    if (user) {
      throw new Error('E-mail already in use');
    }
  }),
    body('password').notEmpty(),
],handleerror,admincontroller.register)

module.exports = route