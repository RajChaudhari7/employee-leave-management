import { v2 as cloudinary } from "cloudinary";

const cloudinaryConfig = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
};

console.log("Cloudinary config:", {
  cloud_name: cloudinaryConfig.cloud_name,
  api_key_exists: !!cloudinaryConfig.api_key,
  api_secret_exists: !!cloudinaryConfig.api_secret,
});

cloudinary.config(cloudinaryConfig);

export default cloudinary;