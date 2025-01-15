const express = require("express");
const app = express();
const router = express.Router();
const userController =require("../controller/authController")

router.get("/auth", userController);

module.exports = router;
