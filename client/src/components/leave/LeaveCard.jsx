import { useState } from "react";
import { Calendar, Eye, MessageSquare } from "lucide-react";

import { format } from "date-fns";

import { motion } from "framer-motion";

import StatusBadge from "./StatusBadge";
import LeaveDetailsModal from "./LeaveDetailsModal";

export default function LeaveCard({ leave }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.div
        whileHover={{
          y: -4,
        }}
        className="bg-white rounded-3xl border shadow-sm p-6"
      >
        <div className="flex justify-between">
          <div>
            <h2 className="font-bold text-xl">{leave.reason}</h2>

            <div className="flex gap-2 items-center mt-3 text-gray-500">
              <Calendar size={18} />

              <span>
                {format(new Date(leave.startDate), "dd MMM yyyy")}

                {" - "}

                {format(new Date(leave.endDate), "dd MMM yyyy")}
              </span>
            </div>
          </div>

          <StatusBadge status={leave.status} />
        </div>

        {leave.managerRemarks && (
          <div className="flex gap-2 mt-5 text-gray-600">
            <MessageSquare size={18} />

            {leave.managerRemarks}
          </div>
        )}

        <div className="mt-6">
          <button
            onClick={() => setOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl flex items-center gap-2"
          >
            <Eye size={18} />
            View Details
          </button>
        </div>
      </motion.div>

      <LeaveDetailsModal
        leave={leave}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
