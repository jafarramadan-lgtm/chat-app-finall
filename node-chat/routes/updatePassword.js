const verifyToken = require('../middleware/verifyToken');
const express = require("express");
const router=express.Router();
const authControllers=require('../conteollers/updatePassword')
router.post('/updatePassword',verifyToken,authControllers.updatePassword)
module.exports=router