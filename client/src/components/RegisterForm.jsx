import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Lock,
  Eye,
  EyeOff,
  UserPlus,
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
      return toast.error(
        "Password must be at least 6 characters"
      );
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

      toast.success("Account created successfully");

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
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8"
    >
      <div className="text-center mb-8">
        <div className="mx-auto w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
          <UserPlus className="text-blue-600" size={30} />
        </div>

        <h1 className="text-3xl font-bold mt-4">
          Create Account
        </h1>

        <p className="text-gray-500 mt-2">
          Register as an Employee
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">

        <div className="relative">
          <User
            className="absolute left-4 top-3.5 text-gray-400"
            size={20}
          />

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="w-full border rounded-xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="relative">
          <Lock
            className="absolute left-4 top-3.5 text-gray-400"
            size={20}
          />

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border rounded-xl pl-12 pr-12 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(!showPassword)
            }
            className="absolute right-4 top-3"
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        </div>

        <div className="relative">
          <Lock
            className="absolute left-4 top-3.5 text-gray-400"
            size={20}
          />

          <input
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full border rounded-xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 font-semibold transition"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>
      </form>

      <p className="text-center text-gray-500 mt-6">
        Already have an account?{" "}
        <Link
          to="/"
          className="text-blue-600 font-semibold hover:underline"
        >
          Login
        </Link>
      </p>
    </motion.div>
  );
}