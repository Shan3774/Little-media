import User from "../models/User.js";
import Post from "../models/post.js"

/* CREATE */
export const createPost = async (req, res) => {
    try {
        const { userId, description, picturePath } = req.body;
        const user = await User.findById(userId);
        
        const newPost = new User({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            picturePath,
            userPicturePath: user.picturePath,
            likes: {},
            comments: []
        })
    
        await newPost.save();
        const posts = await Post.find();//all posts
        res.status(200).json(posts)
    } catch (err) {
        res.status(409).json({error: err.message})
    }
}