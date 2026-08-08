import imagekit from "../config/imagekit.js";

export const uploadToImageKit = async (fileBuffer, originalName) => {
  try {
    const cleanName = originalName
      .replace(/\.[^/.]+$/, "")
      .replace(/[^a-zA-Z0-9-_]/g, "-");

    const fileName = `${Date.now()}-${cleanName}`;

    const result = await imagekit.files.upload({
      file: fileBuffer,
      fileName,
      folder: "/employee-leave-management/leave-documents",
      useUniqueFileName: true,
    });

    console.log("========== IMAGEKIT SUCCESS ==========");
    console.log("URL:", result.url);
    console.log("FILE ID:", result.fileId);
    console.log("======================================");

    return result;
  } catch (error) {
    console.error("========== IMAGEKIT ERROR ==========");
    console.error(error);
    console.error("====================================");

    throw error;
  }
};