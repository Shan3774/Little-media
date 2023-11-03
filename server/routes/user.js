import express from "express"
import { getUser, getFriends, addRemoveFriend } from "../controllers/user.js"
import { verifyToken } from "../middlewares/auth.js"

const router = new express.Router()


/* READ */
router.get("/:id", verifyToken, getUser)
router.get("/:id/friends", verifyToken, getFriends)

/* UPDATE */
router.patch("/:id/:friendId", verifyToken, addRemoveFriend) //the patch method is to update only a specific property
