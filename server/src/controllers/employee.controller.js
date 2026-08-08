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
    console.log("FILE:", req.file ? {
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
    } : null);

    const validatedData = applyLeaveSchema.parse(req.body);

    let documentPath = null;

    // Upload document to ImageKit
    if (req.file) {
      const uploadedFile = await uploadToImageKit(
        req.file.buffer,
        req.file.originalname,
        req.file.mimetype,
      );

      documentPath = uploadedFile.url;

      console.log("IMAGEKIT URL:", documentPath);
    }

    // Save leave + ImageKit URL in database
    const leave = await applyLeave({
      userId: req.user.id,
      ...validatedData,
      documentPath,
    });

    console.log("LEAVE CREATED:", leave.id);

    return res.status(201).json({
      success: true,
      message: "Leave applied successfully",
      data: leave,
    });
  } catch (error) {
    console.error("========== APPLY LEAVE ERROR ==========");
    console.error(error);
    console.error("======================================");

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getLeaveHistoryController = async (req, res) => {
  try {
    const leaves = await getLeaveHistory(req.user.id);

    return res.status(200).json({
      success: true,
      data: leaves,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const employeeDashboard = async (req, res) => {
  try {
    const dashboard = await getDashboardData(req.user.id);

    return res.status(200).json({
      success: true,
      data: dashboard,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};