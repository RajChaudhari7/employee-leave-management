import { applyLeave } from "../services/employee.service.js";
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
