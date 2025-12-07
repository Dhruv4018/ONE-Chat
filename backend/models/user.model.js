import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        

    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,

    },
    image: {
        type: String,
        default: ""
    },
    resetOtp:{
        type:String
    },
    isOtpVerified:{
        type:Boolean,
        default:false,

    },
    otpExpires:{
        type:Date
    }



}, { timestamps: true })
const User = mongoose.model("User", userSchema)
 
export default User