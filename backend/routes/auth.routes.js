import express from "express"
import { logOut, resetPassword, SendOtp, signIn, signUp, verifyOtp } from "../controllers/auth.controller.js"

const authRouter = express.Router()

authRouter.post("/signup", signUp)
authRouter.post("/login", signIn)
authRouter.get("/logout", logOut)
authRouter.post("/send-otp", SendOtp)
authRouter.post("/verify", verifyOtp)
authRouter.post("/reset-password", resetPassword)


export default authRouter