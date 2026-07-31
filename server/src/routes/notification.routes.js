import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  getUserNotifications,
  readNotification,
} from "../controllers/notification.controller.js";

const notificationRoutes = express.Router();

notificationRoutes.get("/", authMiddleware, getUserNotifications);

notificationRoutes.patch("/:id/read", authMiddleware, readNotification);

export default notificationRoutes;