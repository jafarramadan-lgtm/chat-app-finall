const express = require("express");
const router=express.Router();
const authControllers=require('../conteollers/login')
router.post('/login',authControllers.login)
module.exports=router