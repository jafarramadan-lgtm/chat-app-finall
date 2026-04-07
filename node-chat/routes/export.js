const verifyToken = require('../middleware/verifyToken');
const express = require("express");
const router=express.Router();
const authControllers=require('../conteollers/export')
router.get('/export',verifyToken,authControllers.export)
module.exports=router