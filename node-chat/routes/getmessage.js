const verifyToken = require('../middleware/verifyToken');
const express = require("express");
const router=express.Router();
const authControllers=require('../conteollers/getmessage')
router.post('/getlastmessage',verifyToken,authControllers.getmessage)
module.exports=router