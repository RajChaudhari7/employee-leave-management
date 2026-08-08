import imagekit from "../config/imagekit.js";

export const uploadToImageKit = async (fileBuffer, originalName) => {
  try {
    if (!fileBuffer) {
      throw new Error("File buffer is missing");
    }

    if (!originalName) {
      throw new Error("Original file name is missing");
    }

    // Convert multer Buffer to Base64
    const base64File = fileBuffer.toString("base64");

    // Make filename safe
    const safeName = originalName
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9._-]/g, "");

    const fileName = `${Date.now()}-${safeName}`;

    console.log("Uploading to ImageKit...");
    console.log("File name:", fileName);
    console.log("File size:", fileBuffer.length);

    const result = await imagekit.files.upload({
      file: base64File,
      fileName,
      folder: "/leavems/leave-documents",
      useUniqueFileName: true,
    });

    console.log("ImageKit upload successful:");
    console.log("URL:", result.url);
    console.log("File ID:", result.fileId);

    return result;
  } catch (error) {
    console.error("========== IMAGEKIT ERROR ==========");
    console.error("Message:", error.message);
    console.error("Status:", error.status);
    console.error("Error:", error);
    console.error("====================================");

    throw error;
  }
};