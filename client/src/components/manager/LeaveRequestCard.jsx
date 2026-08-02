import { motion } from "framer-motion";
import {
  Calendar,
  FileText,
  User,
  Eye,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { format } from "date-fns";

export default function LeaveRequestCard({
  leave,
  onApprove,
  onReject,
  onView,
}) {
  const getStatusColor = () => {
    switch (leave.status) {
      case "APPROVED":
        return "bg-green-100 text-green-700";
      case "REJECTED":
        return "bg-red-100 text-red-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

console.log("Document URL:", leave.documentUrl);
console.log("Document Path:", leave.documentPath);

  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="bg-white rounded-2xl border shadow-sm p-6"
    >
      {/* Header */}

      <div className="flex justify-between items-start">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
            <User className="text-blue-600" />
          </div>

          <div>
            <h2 className="font-bold text-lg">{leave.employee.username}</h2>

            <p className="text-gray-500 text-sm">
              Applied on {format(new Date(leave.createdAt), "dd MMM yyyy")}
            </p>
          </div>
        </div>

        <span
          className={`px-4 py-1 rounded-full text-sm font-semibold ${getStatusColor()}`}
        >
          {leave.status}
        </span>
      </div>

      {/* Reason */}

      <div className="mt-6">
        <h3 className="font-semibold">Leave Reason</h3>

        <p className="text-gray-600 mt-2">{leave.reason}</p>
      </div>

      {/* Date */}

      <div className="flex items-center gap-2 mt-6 text-gray-600">
        <Calendar size={18} />

        <span>
          {format(new Date(leave.startDate), "dd MMM yyyy")}

          {" → "}

          {format(new Date(leave.endDate), "dd MMM yyyy")}
        </span>
      </div>

      {/* Document */}

      {leave.documentUrl && (
        <a
          href={leave.documentUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 mt-5 text-blue-600 hover:underline"
        >
          <FileText size={18} />
          View Document
        </a>
      )}

      {/* Actions */}

      <div className="flex flex-wrap gap-3 mt-7">
        <button
          onClick={() => onView(leave)}
          className="flex items-center gap-2 bg-slate-700 hover:bg-slate-800 text-white px-4 py-2 rounded-xl"
        >
          <Eye size={18} />
          Details
        </button>

        {leave.status === "PENDING" && (
          <>
            <button
              onClick={() => onApprove(leave)}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl"
            >
              <CheckCircle size={18} />
              Approve
            </button>

            <button
              onClick={() => onReject(leave)}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl"
            >
              <XCircle size={18} />
              Reject
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
}
