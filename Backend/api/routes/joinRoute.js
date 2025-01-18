const express=require("express");
const joinController= require("../controller/joinController")
const router =express.Router();

router.post("/joiner",joinController)
module.exports=router