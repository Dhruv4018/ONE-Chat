import jwt from "jsonwebtoken"
const gentoken =  (userId) => {
    try {
        const token =  jwt.sign({ userId }, process.env.JWT_SECRET, {
            expiresIn: "10d"
        })
        return token
    } catch (error) {
        console.log("gen token", error);
    } 

}

export default gentoken