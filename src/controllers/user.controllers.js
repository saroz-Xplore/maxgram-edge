import { User } from "../models/user.models.js";

const userRegister = async(req, res) => {
    try {
        
        const {username, email, password} = req.body

        const isExist = await User.findOne({email: email})
        if(isExist){
            res.status(409).json({
                message: "User already exists !"
            })
        }

        const PhotoUrl = `public/images/${req.file.filename}`

        const user = await User.create({
            username,
            email,
            password,
            profile_picture: PhotoUrl   
        })

        const createdUser = await User.findById(user._id).select("-password")
        if(!createdUser){
            res.status(500).json({
                message: "Error while registering"
            })
        }

        return res.status(200).json({
            message: "User Registered Successfully"
        })


    } catch (error) {
        console.log("Error in registering", error);
        res.status(500).json({
            message: "Something went wrong"
        })
    }
}
export {userRegister}