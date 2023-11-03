import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
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
    location: String,
    description: String,
    picturePath:{
        type: String,
        default: ""
    },
    UserPictuerPath:{
        type: String,
        default: ""
    },
    likes:{
        type: map,
        of: boolean
    },
    comments:{
        type: Array,
        default: []
    }
}, { timestamp: true })

const post = mongoose.model("Post", postSchema)
export default post;