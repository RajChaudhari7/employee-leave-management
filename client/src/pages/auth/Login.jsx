import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Lock,
  Eye,
  EyeOff,
  LogIn,
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

import useAuth from "../../hooks/useAuth";
import { loginUser } from "../../services/auth.service";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.username.trim()) {
      return toast.error("Username is required");
    }

    if (!form.password.trim()) {
      return toast.error("Password is required");
    }

    try {
      setLoading(true);

      const response = await loginUser(form);

      login(response.data.user, response.data.token);

      toast.success("Login Successful");

      if (response.data.user.role === "MANAGER") {
        navigate("/manager/dashboard");
      } else {
        navigate("/employee/dashboard");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100 flex items-center justify-center p-6">

      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border"
      >

        <div className="text-center mb-8">

          <div className="mx-auto w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
            <LogIn
              size={30}
              className="text-blue-600"
            />
          </div>

          <h1 className="text-3xl font-bold mt-4">
            Welcome Back
          </h1>

          <p className="text-gray-500 mt-2">
            Login to your Employee Leave Management account
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div className="relative">

            <User
              size={20}
              className="absolute left-4 top-3.5 text-gray-400"
            />

            <input
              name="username"
              type="text"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              className="w-full rounded-xl border pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          <div className="relative">

            <Lock
              size={20}
              className="absolute left-4 top-3.5 text-gray-400"
            />

            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-xl border pl-12 pr-12 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-4 top-3 text-gray-500"
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>

          </div>

          <button
            disabled={loading}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <div className="mt-6 text-center text-gray-500">

          Don't have an account?

          <Link
            to="/register"
            className="ml-2 text-blue-600 hover:underline font-semibold"
          >
            Register
          </Link>

        </div>

      </motion.div>

    </div>
  );
}