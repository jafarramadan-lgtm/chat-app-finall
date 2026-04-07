const verifyToken = require('../middleware/verifyToken');
const express = require("express");
const router=express.Router();
const authControllers=require('../conteollers/profile')
router.post('/profile',verifyToken,authControllers.profile)
module.exports=router