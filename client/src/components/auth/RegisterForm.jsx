import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Lock,
  Eye,
  EyeOff,
  UserPlus,
  Loader2,
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

import { register } from "../../services/auth.service";

export default function RegisterForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
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

    if (form.password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    if (form.password !== form.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);

      await register({
        username: form.username,
        password: form.password,
      });

      toast.success("Account created successfully 🎉");

      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45 }}
      className="w-full max-w-lg"
    >
      <div className="bg-white rounded-[32px] shadow-2xl p-10">

        {/* Header */}

        <div className="text-center">

          <div className="mx-auto w-20 h-20 rounded-3xl bg-blue-100 flex items-center justify-center">
            <UserPlus
              className="text-blue-600"
              size={36}
            />
          </div>

          <h1 className="text-4xl font-bold mt-6">
            Create Account
          </h1>

          <p className="text-gray-500 mt-3">
            Register to start using LeaveMS
          </p>

        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="space-y-6 mt-10"
        >

          {/* Username */}

          <div className="relative">

            <User
              size={20}
              className="absolute left-5 top-4 text-gray-400"
            />

            <input
              type="text"
              name="username"
              placeholder="Username"
              autoComplete="username"
              value={form.username}
              onChange={handleChange}
              className="w-full h-14 rounded-2xl border border-gray-300 pl-14 pr-5 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />

          </div>

          {/* Password */}

          <div className="relative">

            <Lock
              size={20}
              className="absolute left-5 top-4 text-gray-400"
            />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              autoComplete="new-password"
              value={form.password}
              onChange={handleChange}
              className="w-full h-14 rounded-2xl border border-gray-300 pl-14 pr-14 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-5 top-4 text-gray-400 hover:text-blue-600 transition"
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>

          </div>

          {/* Confirm Password */}

          <div className="relative">

            <Lock
              size={20}
              className="absolute left-5 top-4 text-gray-400"
            />

            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              autoComplete="new-password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full h-14 rounded-2xl border border-gray-300 pl-14 pr-14 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />

          </div>

          {/* Register Button */}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2
                  size={20}
                  className="animate-spin"
                />
                Creating Account...
              </span>
            ) : (
              "Create Account"
            )}
          </button>

        </form>

        {/* Footer */}

        <div className="mt-8 text-center text-gray-500">

          Already have an account?

          <Link
            to="/"
            className="ml-2 font-semibold text-blue-600 hover:text-blue-700 hover:underline transition"
          >
            Login
          </Link>

        </div>

      </div>
    </motion.div>
  );
}