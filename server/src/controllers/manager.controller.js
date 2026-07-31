import {
  getAllEmployees,
  getAllLeaveRequests,
  getManagerDashboard,
  updateLeaveStatus,
} from "../services/manager.service.js";
import { updateLeaveStatusSchema } from "../validators/manager.validator.js";

export const managerDashboard = async (req, res) => {
  try {
    const dashboard = await getManagerDashboard();

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

export const getEmployees = async (req, res) => {
  try {
    const employees = await getAllEmployees();
    return res.status(200).json({
      success: true,
      data: employees,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllLeaves = async (req, res) => {
  try {
    const leaves = await getAllLeaveRequests();

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

export const updateLeaveStatusController = async (req, res) => {
  try {
    const { leaveId } = req.params;

    const validatedData = updateLeaveStatusSchema.parse(req.body);

    const leave = await updateLeaveStatus(
      leaveId,
      validatedData.status,
      validatedData.managerRemarks,
    );

    return res.status(200).json({
      success: true,
      message: `Leave ${validatedData.status.toLowerCase()} successfully.`,
      data: leave,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
