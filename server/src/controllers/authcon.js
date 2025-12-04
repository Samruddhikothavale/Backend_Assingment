const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generatetoken = require("../auth/generateToken");

// register a new user
exports.register = async (req, res) => {
    const { username, email, password } = req.body;     
    const exist=await User.findOne({email});
    if(exist){
        return res.status(400).json({message:"User already exists"});
    }   

    const hashed=await bcrypt.hash(password,10);

    const user = new User({
        name:username,
        email:email,
        password: hashed
    });
    await user.save();
    res.status(201).json({
        message: "User registered successfully",
        token: generatetoken(user)
    });
};
//login user
exports.login = async (req, res) => {
    const { email, password } = req.body;   
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
        return res.status(400).json({ message: "Invalid email or password" });
    }
    res.status(200).json({
        message: "Login successful",
        token: generatetoken(user)
    });
}; 