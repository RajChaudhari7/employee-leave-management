import { useEffect, useState } from "react";
import { toast } from "sonner";

import {
  getLeaveRequests,
  updateLeaveStatus,
} from "../../services/manager.service";

import LeaveFilter from "../../components/manager/LeaveFilter";
import LeaveRequestCard from "../../components/manager/LeaveRequestCard";
import LeaveApprovalModal from "../../components/manager/LeaveApprovalModal";
import LeaveRequestSkeleton from "../../components/manager/LeaveRequestSkeleton";

export default function LeaveRequests() {
  const [loading, setLoading] = useState(true);

  const [leaves, setLeaves] = useState([]);

  const [selectedLeave, setSelectedLeave] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("");

  const [page, setPage] = useState(1);

  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    fetchLeaves();
  }, [page, search, status]);

  const fetchLeaves = async () => {
  try {
    setLoading(true);

    const response = await getLeaveRequests(page, 10, status, search);

    console.log("Leave Response:", response);

    setLeaves(Array.isArray(response.data) ? response.data : []);

    setPagination(response.pagination);
  } catch (error) {
    console.error(error);

    toast.error("Failed to fetch leave requests");

    setLeaves([]);
  } finally {
    setLoading(false);
  }
};

  const handleApprove = (leave) => {
    setSelectedLeave(leave);
    setModalOpen(true);
  };

  const handleReject = (leave) => {
    setSelectedLeave(leave);
    setModalOpen(true);
  };

  const handleView = (leave) => {
    setSelectedLeave(leave);
    setModalOpen(true);
  };

  const handleSubmit = async (id, leaveStatus, remarks) => {
    try {
      await updateLeaveStatus(id, leaveStatus, remarks);

      toast.success(`Leave ${leaveStatus.toLowerCase()} successfully`);

      setLeaves((prev) =>
        prev.map((leave) =>
          leave.id === id
            ? {
                ...leave,
                status: leaveStatus,
                managerRemarks: remarks,
              }
            : leave,
        ),
      );

      setModalOpen(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update leave");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      {/* Header */}

      <div className="mb-8">
        <h1 className="text-4xl font-bold">Leave Requests</h1>

        <p className="text-gray-500 mt-2">
          Review and manage employee leave requests.
        </p>
      </div>

      {/* Search & Filter */}

      <LeaveFilter
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
      />

      {/* List */}

      {loading ? (
        <LeaveRequestSkeleton />
      ) : (leaves?.length ?? 0) === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border">
          <h2 className="text-2xl font-semibold">No Leave Requests</h2>

          <p className="text-gray-500 mt-2">No leave requests found.</p>
        </div>
      ) : (
        <div className="space-y-5">
          {(leaves || []).map((leave) => (
            <LeaveRequestCard
              key={leave.id}
              leave={leave}
              onApprove={handleApprove}
              onReject={handleReject}
              onView={handleView}
            />
          ))}
        </div>
      )}

      {/* Pagination */}

      {pagination && pagination.totalPages > 1 && (
        <div className="flex justify-center mt-10 gap-3">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-5 py-2 rounded-lg border disabled:opacity-40"
          >
            Previous
          </button>

          <span className="px-5 py-2 font-semibold">
            {page} / {pagination.totalPages}
          </span>

          <button
            disabled={page === pagination.totalPages}
            onClick={() => setPage(page + 1)}
            className="px-5 py-2 rounded-lg border disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}

      {/* Modal */}

      <LeaveApprovalModal
        isOpen={modalOpen}
        leave={selectedLeave}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
