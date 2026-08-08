import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import authRoutes from "./src/routes/auth.routes.js";
import employeeRoutes from "./src/routes/employee.routes.js";
import managerRoutes from "./src/routes/manager.routes.js";
import notificationRoutes from "./src/routes/notification.routes.js";
import connectCloudinary from "./src/config/cloudinary.js";
dotenv.config();

const app = express();
await connectCloudinary();
const allowedOrigins = ['http://localhost:5173', 'https://employee-leave-management-drab.vercel.app']


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(morgan("dev"));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use("/api/auth", authRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/manager", managerRoutes);
app.use("/api/notifications", notificationRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Employee Leave Management Api Running",
  });
});
