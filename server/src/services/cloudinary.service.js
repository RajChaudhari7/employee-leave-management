import cloudinary from "../config/cloudinary.js";

export const uploadToCloudinary = (fileBuffer, originalName) => {
  return new Promise((resolve, reject) => {
    const publicId = `${Date.now()}-${originalName
      .replace(/\.[^/.]+$/, "")
      .replace(/[^a-zA-Z0-9-_]/g, "-")}`;

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "employee-leave-management/leave-documents",
        resource_type: "image",
        public_id: publicId,
      },
      (error, result) => {
        if (error) {
          console.error("========== CLOUDINARY ERROR ==========");
          console.error("Message:", error.message);
          console.error("HTTP Code:", error.http_code);
          console.error("Name:", error.name);
          console.error("Full Error:", error);
          console.error("======================================");

          reject(error);
          return;
        }

        console.log("========== CLOUDINARY SUCCESS ==========");
        console.log("URL:", result.secure_url);
        console.log("Public ID:", result.public_id);
        console.log("========================================");

        resolve(result);
      }
    );

    uploadStream.end(fileBuffer);
  });
};