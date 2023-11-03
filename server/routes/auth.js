import express from "express";
import { login } from "../controllers/auth.js"

export const authRouter = new express.Router()
authRouter.post("/login", login)

export default authRouter;