const express = require("express");
const app = express();
const router = express.Router();
const userController =require("../controller/authController")

router.post("/auth", userController);

module.exports = router;
