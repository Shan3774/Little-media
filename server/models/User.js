import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        min: 2,
        max: 50
    },
    lastName:{
        type: String,
        required: true,
        min: 2,
        max: 50
    },
    email:{
        type: String,
        required: true,
        unique: true,
        max: 50
    },
    password:{
        type: String,
        required: true,
        min: 5
        //needs more configurations
    },
    picturePath:{
        type: String,
        default: ""
    },
    friends:{
        type: Array,
        default: []
        //syntax options: type: [String]
        //structure options: use the object id reference method to populate on demand
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number
}, { timestamp: true })

const User = mongoose.model("User", userSchema)
export default User;