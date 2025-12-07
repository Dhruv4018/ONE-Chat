import { sendOtpMail } from "../config/email.js"
import gentoken from "../config/token.js"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"


export const signUp = async (req, res) => {
    try {
        const { userName, email, password } = req.body
        const checkUserByUserName = await User.findOne({ userName })
        if (checkUserByUserName) {
            return res.status(400).json({ message: "username already" })
        }
        const checkUserByEmail = await User.findOne({ email })
        if (checkUserByEmail) {
            return res.status(400).json({ message: "email already" })
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "password must be at least 6 character " })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            userName,
            email,
            password: hashedPassword
        })

        const token = gentoken(user._id)
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 10 * 24 * 60 * 1000,
            sameSite: "Strict",
            secure: false
        })

        return res.status(201).json(user)

    } catch (error) {
        return res.status(500).json({ message: `signup error ${error}` })
    }
}

export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body

        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "email doesnot exits" })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "incorrect password" })
        }

        const token = gentoken(user._id)
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 10 * 24 * 60 * 1000,
            sameSite: "Strict",
            secure: false
        })

        return res.status(200).json(user)

    } catch (error) {
        return res.status(500).json({ message: `signIn error ${error}` })
    }



}

export const logOut = async (req, res) => {
    try {
        res.clearCookie("token")
        return res.status(200).json({ message: "Log out " })
    } catch (error) {
        return res.status(500).json({ message: `Logout error ${error}` })
    }
}

export const SendOtp = async (req, res) => {
    try {
        const { email } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: `User doesnot exist` })
        }
        const otp = Math.floor(1000 + Math.random() * 9000).toString()
        user.resetOtp = otp
        user.otpExpires = Date.now() + 5 * 60 * 1000
        user.isOtpVerified = false

        await user.save()
        await sendOtpMail(email, otp)
        return res.status(200).json({ message: "Otp send successfully" })
    } catch (error) {
        return res.status(500).json({ message: `send otp error ${error}` })
    }
}
export const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body
        const user = await User.findOne({ email })
        if (!user || user.resetOtp != otp || user.otpExpires < Date.now()) {
            return res.status(400).json({ message: `Otp invalid ` })
        }
        user.isOtpVerified = true
        user.resetOtp = undefined
        user.otpExpires = undefined
        await user.save()
        return res.status(200).json({ message: "Otp verify successfully" })

    } catch (error) {
        return res.status(500).json({ message: "Otp verify error" })
    }
}

export const resetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body
        const user = await User.findOne({ email })
        if (!user || !user.isOtpVerified) {
            return res.status(400).json({ message: `otp verification required` })
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10)
        user.password = hashedPassword
        user.isOtpVerified = false
        await user.save()
        return res.status(200).json({ message: "password change successfully" })

    } catch (error) {

        return res.status(500).json({ message: "password change  error" })
    }


}



