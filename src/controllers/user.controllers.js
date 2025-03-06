import { User } from "../models/user.models.js";

const generateAccessToken = async(userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()

        return {accessToken}
    } catch (error) {
        console.log("Error generating access token", error);
    }
}

const generateRefreshToken = async(userId) => {
    try {
        const user = await User.findById(userId)
        const refreshToken = user.generateRefreshToken()

        user.refreshToken= refreshToken
        user.save({validateBeforeSave: false})

        return {refreshToken}
    } catch (error) {
        console.log("error generating refresh token", error);
    }
}

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
            imageUrl: PhotoUrl   
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


const userLogin = async(req, res) => {
    try {
        
        const {email, password} = req.body
        if(!email){
            return res.status(400).json({
                message: 'Email must be required'
            })
        }
        const user = await User.findOne({email})
        if(!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        const isPasswordValid = await user.isPasswordCorrect(password)
        if(!isPasswordValid){
            return res.status(401).json({
                message: "Invalid Credentials"
            })
        }

        const {accessToken} = await generateAccessToken(user.id)
        const {refreshToken} = await generateRefreshToken(user._id)
    
        const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

        const options= {
            httpOnly: true,
            secure: true
        }
        return res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)    
            .json({
            message: "User Successfully Logged In",
            data: loggedInUser
        })

    } catch (error) {
        console.log("something went wrong");
        res.status(500).json({
            message: "Error occured while logging"
        })
    }
}

const userLogout = async(req, res) => {
    try {
        await User.findByIdAndUpdate(
            req.user._id,
            {
                $set: {
                    refreshToken: undefined
                }
            },
            {
                new: true
            })

            const options = {
                httpOnly: true,
                secure: true
            }
        return res.status(200)
        .clearCookie("accesstoken", options)
        .clearCookie("refreshtoken", options)
        .json({
            message: "User Log Out Successfully"
        })
    } catch (error) {
        console.log("error while logging out");
        res.status(500).json({
            message: "something went wrong"
        })
    }
}
export {userRegister, userLogin, userLogout}