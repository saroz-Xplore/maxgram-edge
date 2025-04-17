import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken"


const VerifyToken = async(req, res, next) => {
    try {
        const token= req.cookies?.accessToken
        if(!token){
            res.status(401).json({
                message: "Unauthorized request"
            })
        }

        const decodedToken= jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
        if(!user){
            res.status(404).json({
                message: "User not found"
            })
        }
        req.user = user
        next()

    } catch (error) {
        console.log("error:", error);
        res.status(401).json({
            message:error.message
        })
    }
}

export {VerifyToken}