import { ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function AuthLogo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-4"
    >
      <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
        <ShieldCheck
          size={34}
          className="text-white"
        />
      </div>

      <div>
        <h1 className="text-4xl font-extrabold text-white">
          LeaveMS
        </h1>

        <p className="text-blue-100">
          Employee Leave Management
        </p>
      </div>
    </motion.div>
  );
}