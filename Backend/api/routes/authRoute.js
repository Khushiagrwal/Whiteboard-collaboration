const express = require("express");
const app = express();
const router = express.Router();
const {Signin,Signup} =require("../controller/authController")

router.post("/signup", Signup);
router.post("/signin",Signin);

module.exports = router;
