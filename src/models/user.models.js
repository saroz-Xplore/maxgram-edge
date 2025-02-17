import { mongo, mongoose } from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    address: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    profile_picture: {
        type:String,
    }
    },
    {
        timestamps: true,
    }
)

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next()
    this.password = await bcryptjs.hash(this.password, 10)
    next()
})


userSchema.methods.isPasswordCorrect = async function (password){
    return await bcryptjs.compare(password, this.password)
}

export const User = mongoose.model("User", userSchema)