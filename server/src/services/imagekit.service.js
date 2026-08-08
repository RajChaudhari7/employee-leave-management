import imagekit from "../config/imagekit.js";

export const uploadToImageKit = async (
  fileBuffer,
  originalName,
  mimetype,
) => {
  try {
    const safeName = originalName
      .replace(/\.[^/.]+$/, "")
      .replace(/[^a-zA-Z0-9-_]/g, "-");

    const extension = originalName.split(".").pop();

    const fileName = `${Date.now()}-${safeName}.${extension}`;

    const result = await imagekit.files.upload({
      file: fileBuffer,
      fileName,
      folder: "/leavems/leave-documents",
      useUniqueFileName: true,
      isPrivateFile: false,
      tags: ["leave-document"],
    });

    console.log("========== IMAGEKIT UPLOAD SUCCESS ==========");
    console.log("File ID:", result.fileId);
    console.log("File URL:", result.url);
    console.log("File Path:", result.filePath);
    console.log("==============================================");

    return result;
  } catch (error) {
    console.error("========== IMAGEKIT ERROR ==========");
    console.error("Message:", error.message);
    console.error("Full Error:", error);
    console.error("====================================");

    throw error;
  }
};