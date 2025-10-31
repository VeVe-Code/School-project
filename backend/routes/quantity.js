const express = require("express");
const quantitycontroller = require("../controller/quantitycontroller");
const handleerror = require('../middleware/handleerror');
const { body, validationResult } = require('express-validator');

const Router = express.Router();

Router.get("", quantitycontroller.index);
Router.get("/:id", quantitycontroller.show);
Router.post("",[
  body('student').notEmpty(),
   body('course').notEmpty(),
    body('noofyear').notEmpty(),
    ] ,handleerror, quantitycontroller.store);
Router.delete("/:id", quantitycontroller.destory);
Router.patch("/:id", quantitycontroller.update); // Express uses .put()

module.exports = Router; // ✅ CommonJS export