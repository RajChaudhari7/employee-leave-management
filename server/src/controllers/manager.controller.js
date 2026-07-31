import { getManagerDashboard } from "../services/manager.service.js";

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
