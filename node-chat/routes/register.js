const express = require("express");
const router=express.Router();
const authControllers=require('../conteollers/register')
router.post('/register',authControllers.register)
module.exports=router