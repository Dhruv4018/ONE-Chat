import express from "express"
import isAuth from "../middleware/isAuth.js"

import { upload } from "../middleware/multer.js"
import { deleteMessage, getMessage, sendMessage } from "../controllers/message.controller.js"

const messageRouter = express.Router()


messageRouter.post("/send/:receiver",isAuth , upload.single("image"),sendMessage)
messageRouter.get("/get/:receiver",isAuth ,getMessage)
messageRouter.delete("/delete/:id", isAuth, deleteMessage)


export default messageRouter

