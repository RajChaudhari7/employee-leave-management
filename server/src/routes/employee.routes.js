import express from "express";
import {
  applyLeaveController,
  employeeDashboard,
  getLeaveHistoryController,
} from "../controllers/employee.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

const employeeRoutes = express.Router();

employeeRoutes.post(
  "/leave",
  authMiddleware,
  upload.single("document"),
  applyLeaveController,
);

employeeRoutes.get("/leave-history", authMiddleware, getLeaveHistoryController);
employeeRoutes.get("/dashboard", authMiddleware, employeeDashboard);

export default employeeRoutes;
