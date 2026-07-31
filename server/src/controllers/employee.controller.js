import { applyLeave, getLeaveHistory } from "../services/employee.service.js";
import { applyLeaveSchema } from "../validators/employee.validator.js";

export const applyLeaveController = async (req, res) => {
  try {
    const validatedData = applyLeaveSchema.parse(req.body);

    const leave = await applyLeave({
      userId: req.user.id,
      ...validatedData,
      documentPath: req.file?.path || null,
    });

    return res.status(201).json({
      success: true,
      message: "Leave applied successfully",
      data: leave,
    });
  } catch (error) {
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
