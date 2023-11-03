import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/User.js";

/* REGISTER */
export const register = async (req, res) => {
    try {
        const {
            firstName, 
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body;
        //hash the password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt)
        
        //create the object instance of the User model
        const newUser = new User({
            firstName, 
            lastName,
            email,
            password:hashedPassword,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000)
        })
        
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
        } catch (err) {
            res.status(500).json({error: err.message})
        }
};

/* LOGGING IN */
export const login = async (req, res) => {
    try {
        const{ email, password } = req.body;
        const user = await User.find({email:email});
        if(!user) res.status(400).json({msg: "No user with that email."})

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) res.status(400).json({msg: "Incorrect password. "})

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        delete user.password;//deleting a property from an object
        res.status(200).json({ token, user})

    } catch (err) {
        res.status(500).json({error: err.message})
    }

}