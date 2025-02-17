import mongoose from "mongoose";

export const DatabaseConnect= async() => {
    try {
        
        const mongo = await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log(`MongoDB Connected Successfully ! Host: ${mongo.connection.host}`);
    } catch (error) {
        console.log("MongoDB Connection Failed:", error);
        process.exit(1)
    }
}