import {v2 as cloudinary} from 'cloudinary'
import dotenv  from 'dotenv'
import fs from 'fs'


dotenv.config('./.env')

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadingOnCloudinary = async(localFilePath)=>{
    try {
        if(!localFilePath) return 
        const response = await cloudinary.uploader.upload(localFilePath,{
            folder:"instagram" ,resource_type:"auto"
        })
        fs.unlinkSync(localFilePath)
    
        return response

    } catch (error) {
        fs.unlinkSync(localFilePath)
        console.log("error in cloudinary",error);
    }
}

export  {uploadingOnCloudinary}