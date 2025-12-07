import express from "express"
import isAuth from "../middleware/isAuth.js"
import { editProfile, getCurrentUser, getOtherUsers, searchUsers } from "../controllers/user.controllers.js"
import { upload } from "../middleware/multer.js"

const userRouter = express.Router()

userRouter.get("/current",isAuth ,getCurrentUser)
userRouter.put("/edit-profile",isAuth ,upload.single("image"), editProfile)
userRouter.get("/others",isAuth , getOtherUsers)
userRouter.get("/search",isAuth , searchUsers)


export default userRouter

