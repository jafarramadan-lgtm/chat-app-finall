const verifyToken = require('../middleware/verifyToken');
const express = require("express");
const router=express.Router();
const authControllers=require('../conteollers/friendShip')
router.post('/friendship',verifyToken,authControllers.friendShip)
module.exports=router