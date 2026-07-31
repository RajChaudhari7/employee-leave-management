import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";
import { managerDashboard } from "../controllers/manager.controller.js";

const managerRoutes = express.Router();

managerRoutes.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware("MANAGER"),
  managerDashboard,
);

export default managerRoutes;
