import express from "express";
import { getProfile, login, register } from "../controllers/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const authRoutes = express.Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.get("/profile", authMiddleware, getProfile);

export default authRoutes;
