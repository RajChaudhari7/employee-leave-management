import { useState } from "react";
import { X, Calendar, User, FileText } from "lucide-react";
import { format } from "date-fns";

export default function LeaveApprovalModal({
  leave,
  isOpen,
  onClose,
  onSubmit,
}) {
  const [remarks, setRemarks] = useState("");

  if (!isOpen || !leave) return null;

  const handleSubmit = (status) => {
    onSubmit(leave.id, status, remarks);
    setRemarks("");
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl">
        {/* Header */}

        <div className="flex items-center justify-between border-b p-6">
          <div>
            <h2 className="text-2xl font-bold">Leave Request</h2>

            <p className="text-gray-500 mt-1">
              Review and approve/reject the request
            </p>
          </div>

          <button
            onClick={onClose}
            className="hover:bg-gray-100 p-2 rounded-full"
          >
            <X />
          </button>
        </div>

        {/* Body */}

        <div className="p-6 space-y-6">
          {/* Employee */}

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <User className="text-blue-600" />
            </div>

            <div>
              <h3 className="font-semibold">{leave.employee.username}</h3>

              <p className="text-sm text-gray-500">Employee</p>
            </div>
          </div>

          {/* Reason */}

          <div>
            <h4 className="font-semibold mb-2">Leave Reason</h4>

            <div className="bg-slate-50 rounded-xl p-4 border">
              {leave.reason}
            </div>
          </div>

          {/* Dates */}

          <div className="grid grid-cols-2 gap-5">
            <div className="border rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar size={18} />

                <span className="font-medium">Start Date</span>
              </div>

              {format(new Date(leave.startDate), "dd MMM yyyy")}
            </div>

            <div className="border rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar size={18} />

                <span className="font-medium">End Date</span>
              </div>

              {format(new Date(leave.endDate), "dd MMM yyyy")}
            </div>
          </div>

          {/* Document */}

          {leave.documentUrl && (
            <a
              href={leave.documentUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-blue-600 hover:underline"
            >
              <FileText size={18} />
              View Uploaded Document
            </a>
          )}

          {/* Remarks */}

          <div>
            <label className="font-semibold">Manager Remarks</label>

            <textarea
              rows={4}
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Write your remarks..."
              className="w-full border rounded-xl mt-2 p-3 resize-none focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Footer */}

        <div className="border-t p-6 flex justify-end gap-3">
          <button onClick={onClose} className="px-5 py-2 rounded-xl border">
            Cancel
          </button>

          <button
            onClick={() => handleSubmit("REJECTED")}
            className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white"
          >
            Reject
          </button>

          <button
            onClick={() => handleSubmit("APPROVED")}
            className="px-5 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white"
          >
            Approve
          </button>
        </div>
      </div>
    </div>
  );
}
