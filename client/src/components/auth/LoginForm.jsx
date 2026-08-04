import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  Loader2,
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

import useAuth from "../../hooks/useAuth";
import { loginUser } from "../../services/auth.service";

export default function LoginForm() {
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

      toast.success("Welcome Back 👋");

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
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-full max-w-lg"
    >
      <div className="bg-white rounded-[32px] shadow-2xl p-10">

        <div className="text-center">

          <div className="mx-auto w-20 h-20 rounded-3xl bg-blue-100 flex items-center justify-center">
            <LogIn
              size={36}
              className="text-blue-600"
            />
          </div>

          <h1 className="text-4xl font-bold mt-6">
            Welcome Back
          </h1>

          <p className="text-gray-500 mt-3">
            Login to continue to LeaveMS
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-6"
        >

          <div className="relative">

            <User
              size={20}
              className="absolute left-5 top-4 text-gray-400"
            />

            <input
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              className="w-full h-14 rounded-2xl border border-gray-300 pl-14 pr-5 outline-none transition focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
            />

          </div>

          <div className="relative">

            <Lock
              size={20}
              className="absolute left-5 top-4 text-gray-400"
            />

            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full h-14 rounded-2xl border border-gray-300 pl-14 pr-14 outline-none transition focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-5 top-4 text-gray-400"
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
            className="w-full h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:scale-[1.02] transition-all shadow-lg"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2
                  size={20}
                  className="animate-spin"
                />
                Logging In...
              </span>
            ) : (
              "Login"
            )}
          </button>

        </form>

        <div className="mt-8 text-center text-gray-500">

          Don't have an account?

          <Link
            to="/register"
            className="text-blue-600 ml-2 font-semibold"
          >
            Register
          </Link>

        </div>

      </div>
    </motion.div>
  );
}