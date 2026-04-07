const verifyToken = require('../middleware/verifyToken');
const express = require("express");
const router=express.Router();
const authControllers=require('../conteollers/logout')
router.get('/logout',verifyToken,authControllers.logout)
module.exports=router