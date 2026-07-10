import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier"
import { ENV } from "../lib/env.js";

cloudinary.config({
    cloud_name: ENV.CLOUDINARY_CLOUD_NAME,
    api_key: ENV.CLOUDINARY_API_KEY,
    api_secret: ENV.CLOUDINARY_API_SECRET,
});

export const uploadBuffertoCloudinary = (bufferFile , resourceType , folderName)=>{
        return new Promise((resolve , reject) =>{
            const uploadStream = cloudinary.uploader.upload_stream({
                resource_type : resourceType,
                folder : folderName 
            } ,(error , result)=>{
                if(error) return reject(error);
                resolve(result)
            });
            streamifier.createReadStream(bufferFile).pipe(uploadStream);
        });
}

