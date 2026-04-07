const verifyToken = require('../middleware/verifyToken');
const express = require("express");
const router=express.Router();
const authControllers=require('../conteollers/getFriends')
router.get('/getFriendsLis',verifyToken,authControllers.getFriends)
module.exports=router