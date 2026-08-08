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

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
].filter(Boolean);

console.log("Allowed Origins:", allowedOrigins);

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    console.log("CORS BLOCKED:", origin);

    return callback(new Error(`CORS blocked: ${origin}`));
  },

  methods: [
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
    "OPTIONS",
  ],

  allowedHeaders: [
    "Content-Type",
    "Authorization",
  ],

  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(helmet());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/manager", managerRoutes);
app.use("/api/notifications", notificationRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Employee Leave Management API Running 🚀",
  });
});

export default app;