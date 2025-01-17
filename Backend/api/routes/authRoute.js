const express = require("express");
const router = express.Router();
const {Signin,Signup,Logout} =require("../controller/authController")

router.post("/signup", Signup);
router.post("/signin",Signin);
router.post("/logout",Logout);

module.exports = router;
