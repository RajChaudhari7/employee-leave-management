import {
  applyLeave,
  getDashboardData,
  getLeaveHistory,
} from "../services/employee.service.js";

import { applyLeaveSchema } from "../validators/employee.validator.js";

import { uploadToImageKit } from "../services/imagekit.service.js";

export const applyLeaveController = async (req, res) => {
  try {
    console.log("========== APPLY LEAVE ==========");
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const validatedData = applyLeaveSchema.parse(req.body);

    let documentPath = null;

    if (req.file) {
      console.log("Uploading document to ImageKit...");

      const uploadedFile = await uploadToImageKit(
        req.file.buffer,
        req.file.originalname,
      );

      documentPath = uploadedFile.url;

      console.log("IMAGEKIT URL:", documentPath);
    }

    const leave = await applyLeave({
      userId: req.user.id,
      ...validatedData,
      documentPath,
    });

    return res.status(201).json({
      success: true,
      message: "Leave applied successfully",
      data: leave,
    });
  } catch (error) {
    console.error("APPLY LEAVE ERROR:", error);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};