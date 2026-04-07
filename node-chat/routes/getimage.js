const verifyToken = require('../middleware/verifyToken');
const express = require("express");
const router=express.Router();
const authControllers=require('../conteollers/getimage')
router.get('/getImageProfile',verifyToken,authControllers.getimage)
module.exports=router