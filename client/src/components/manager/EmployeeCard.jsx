import { CalendarDays, CheckCircle, Clock3, User, XCircle } from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";

export default function EmployeeCard({ employee }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-2xl shadow-md border overflow-hidden"
    >
      {/* Header */}

      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-5 text-white">

        <div className="flex items-center gap-4">

          <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">

            <User size={28} />

          </div>

          <div>

            <h2 className="text-xl font-bold">
              {employee.username}
            </h2>

            <p className="text-blue-100">
              Employee
            </p>

          </div>

        </div>

      </div>

      {/* Body */}

      <div className="p-6">

        <div className="flex items-center gap-2 text-gray-500 mb-5">

          <CalendarDays size={18} />

          Joined on{" "}
          {format(new Date(employee.createdAt), "dd MMM yyyy")}

        </div>

        <div className="grid grid-cols-2 gap-4">

          <div className="bg-blue-50 rounded-xl p-4">
            <p className="text-sm text-gray-500">
              Total Leaves
            </p>

            <h3 className="text-2xl font-bold mt-2">
              {employee.totalLeaves}
            </h3>
          </div>

          <div className="bg-green-50 rounded-xl p-4">
            <div className="flex items-center gap-2">
              <CheckCircle
                size={18}
                className="text-green-600"
              />

              <span>Approved</span>
            </div>

            <h3 className="text-2xl font-bold mt-2">
              {employee.approvedLeaves}
            </h3>
          </div>

          <div className="bg-yellow-50 rounded-xl p-4">
            <div className="flex items-center gap-2">
              <Clock3
                size={18}
                className="text-yellow-600"
              />

              <span>Pending</span>
            </div>

            <h3 className="text-2xl font-bold mt-2">
              {employee.pendingLeaves}
            </h3>
          </div>

          <div className="bg-red-50 rounded-xl p-4">
            <div className="flex items-center gap-2">
              <XCircle
                size={18}
                className="text-red-600"
              />

              <span>Rejected</span>
            </div>

            <h3 className="text-2xl font-bold mt-2">
              {employee.rejectedLeaves}
            </h3>
          </div>

        </div>
      </div>
    </motion.div>
  );
}