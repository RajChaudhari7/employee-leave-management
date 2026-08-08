import cloudinary from "../config/cloudinary.js";

export const uploadToCloudinary = (fileBuffer, originalName) => {
  return new Promise((resolve, reject) => {
    const fileName = originalName
      .replace(/\.[^/.]+$/, "")
      .replace(/[^a-zA-Z0-9-_]/g, "-");

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "employee-leave-management/leave-documents",
        resource_type: "auto",
        public_id: `${Date.now()}-${fileName}`,
      },
      (error, result) => {
        if (error) {
          console.error("CLOUDINARY ERROR:", error);
          reject(error);
        } else {
          console.log("CLOUDINARY UPLOAD SUCCESS:", result.secure_url);
          resolve(result);
        }
      },
    );

    uploadStream.end(fileBuffer);
  });
};