import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";
import {
  getAllLeaves,
  getEmployees,
  managerDashboard,
  updateLeaveStatusController,
} from "../controllers/manager.controller.js";

const managerRoutes = express.Router();

managerRoutes.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware("MANAGER"),
  managerDashboard,
);

managerRoutes.get(
  "/employees",
  authMiddleware,
  roleMiddleware("MANAGER"),
  getEmployees,
);

managerRoutes.get(
  "/leaves",
  authMiddleware,
  roleMiddleware("MANAGER"),
  getAllLeaves,
);

managerRoutes.patch(
  "/leaves/:leaveId/status",
  authMiddleware,
  roleMiddleware("MANAGER"),
  updateLeaveStatusController,
);

export default managerRoutes;
