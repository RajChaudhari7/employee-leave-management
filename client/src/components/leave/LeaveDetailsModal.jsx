import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  FileText,
  MessageSquare,
  X,
  Download,
} from "lucide-react";
import { format } from "date-fns";
import StatusBadge from "./StatusBadge";

export default function LeaveDetailsModal({
  leave,
  open,
  onClose,
}) {
  if (!leave) return null;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-40"
          />

          {/* Modal */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
            }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl shadow-2xl w-full max-w-xl p-8 z-50"
          >
            <div className="flex justify-between items-center">

              <h2 className="text-2xl font-bold">
                Leave Details
              </h2>

              <button onClick={onClose}>
                <X />
              </button>

            </div>

            <div className="mt-8 space-y-6">

              <div>
                <p className="text-gray-500 text-sm">
                  Reason
                </p>

                <h3 className="font-semibold text-lg mt-1">
                  {leave.reason}
                </h3>
              </div>

              <div className="flex gap-3 items-center">

                <Calendar />

                <span>

                  {format(
                    new Date(leave.startDate),
                    "dd MMM yyyy"
                  )}

                  {" → "}

                  {format(
                    new Date(leave.endDate),
                    "dd MMM yyyy"
                  )}

                </span>

              </div>

              <StatusBadge status={leave.status} />

              {leave.managerRemarks && (
                <div className="bg-slate-100 rounded-xl p-4">

                  <div className="flex gap-2">

                    <MessageSquare />

                    <div>

                      <p className="font-semibold">
                        Manager Remarks
                      </p>

                      <p className="mt-2">
                        {leave.managerRemarks}
                      </p>

                    </div>

                  </div>

                </div>
              )}

              {leave.documentUrl && (
                <a
                  href={leave.documentUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-blue-600"
                >
                  <FileText />
                  View Document
                  <Download size={18} />
                </a>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}