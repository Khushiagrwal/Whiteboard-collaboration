const User = require("../models/userModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Signup = async (req, res) => {
  try {
    const { name, email, role, password, confirmPassword } = req.body;

    if (!name || !email || !role || !password || !confirmPassword) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ msg: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "Email already in use" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = new User({ name, email, role, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ msg: "User created successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
};

const Signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Email and password are required" });
    }

    const validUser = await User.findOne({ email });
    if (!validUser) {
      return res.status(404).json({ msg: "Email not registered" });
    }

    const validPass = bcryptjs.compareSync(password, validUser.password);
    if (!validPass) {
      return res.status(401).json({ msg: "Wrong password" });
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Set token expiration time
    });

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ msg: "Signin successful", user: validUser });
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
};

module.exports = { Signup, Signin };
