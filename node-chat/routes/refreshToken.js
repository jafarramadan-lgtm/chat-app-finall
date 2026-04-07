const verifyToken = require('../middleware/verifyToken');
const express = require("express");
const router=express.Router();
const authControllers=require('../conteollers/refreshToken')
router.post('/refresh',verifyToken,authControllers.refreshToken)
module.exports=router