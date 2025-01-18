const express=require("express");
const router=express.Router();
const inviteController =require("../controller/inviteController");

router.post("/invitee",inviteController);
module.exports =router;