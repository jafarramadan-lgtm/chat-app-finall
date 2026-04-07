const verifyToken = require('../middleware/verifyToken');
const express = require("express");
const router=express.Router();
const authControllers=require('../conteollers/delete')
router.get('/delete',verifyToken,authControllers.delete)
module.exports=router