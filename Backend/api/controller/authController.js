const User =require("../models/userModel")
const bcryptjs =require("bcryptjs")

const userController = async (req, res) => {

    try{
    const {name,email,role,password,confirmPassword}=req.body;

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

    const hashedpassword =await bcryptjs.hashSync(password,10)

    const newUser =new User({name,email,role,password:hashedpassword});
    
    await newUser.save();
    res.status(201).json({msg:"User created successfully"});
    
    }
    catch(error)
    {
        res.status(500).json({msg:"Servor Error",error:error})
    }
};

module.exports = userController;