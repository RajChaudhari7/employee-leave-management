import cloudinary from "../config/cloudinary.js";

export const uploadToCloudinary = (fileBuffer, originalName) => {
  return new Promise((resolve, reject) => {
    const publicId = `${Date.now()}-${originalName
      .replace(/\.[^/.]+$/, "")
      .replace(/[^a-zA-Z0-9-_]/g, "-")}`;

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "employee-leave-management/leave-documents",
        resource_type: "auto",
        public_id: publicId,
      },
      (error, result) => {
        if (error) {
          console.error("CLOUDINARY UPLOAD ERROR:", error);
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    uploadStream.end(fileBuffer);
  });
};