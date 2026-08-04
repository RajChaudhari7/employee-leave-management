import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function AuthFeature({ title, delay }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: -40,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        delay,
      }}
      whileHover={{
        scale: 1.03,
      }}
      className="flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20"
    >
      <CheckCircle2
        className="text-green-400"
        size={26}
      />

      <span className="text-white text-lg font-medium">
        {title}
      </span>
    </motion.div>
  );
}