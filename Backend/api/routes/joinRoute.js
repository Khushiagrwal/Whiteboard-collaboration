const express=require("express");
const joinController= require("../controller/joinController")
const router =express.Router();

router.post("/join",joinController)
module.exports=router;6