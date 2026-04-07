const verifyToken = require('../middleware/verifyToken');
const express = require("express");
const router=express.Router();
const authControllers=require('../conteollers/active')
router.get('/activateAccount',verifyToken,authControllers.active)
module.exports=router