import express from "express";
import { verifyToken } from "../middlewares/auth.js";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/post.js"

const router = new express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts)
router.get("/:userId", verifyToken, getUserPosts) //may be there is a need for /:userId/posts

/* UPDATE */
router.patch("/:userId/like", verifyToken, likePost )