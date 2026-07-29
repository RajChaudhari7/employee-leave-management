import express from "express";
import { applyLeaveController } from "../controllers/employee.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

const employeeRoutes = express.Router();

employeeRoutes.post(
  "/leave",
  authMiddleware,
  upload.single("document"),
  applyLeaveController,
);

export default employeeRoutes;
