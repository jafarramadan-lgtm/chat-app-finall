const verifyToken = require('../middleware/verifyToken');
const express = require("express");
const router=express.Router();
const authControllers=require('../conteollers/search')
router.post('/search',verifyToken,authControllers.search)
module.exports=router