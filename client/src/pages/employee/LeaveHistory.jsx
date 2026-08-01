import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  CalendarDays,
  CheckCircle2,
  Clock3,
  XCircle,
} from "lucide-react";


import LeaveCard from "../../components/leave/LeaveCard";
import LeaveStats from "../../components/leave/LeaveStats";
import LeaveSkeleton from "../../components/leave/LeaveSkeleton";
import EmptyLeave from "../../components/leave/EmptyLeave";
import { getLeaveHistory } from "../../services/leave.service";

export default function LeaveHistory() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
    
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      setLoading(true);

      const response = await getLeaveHistory();

      setLeaves(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredLeaves = useMemo(() => {
    return leaves.filter((leave) => {
      const matchesSearch = leave.reason
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus = status === "ALL" || leave.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [leaves, search, status]);

  const stats = {
    total: leaves.length,

    approved: leaves.filter((leave) => leave.status === "APPROVED").length,

    pending: leaves.filter((leave) => leave.status === "PENDING").length,

    rejected: leaves.filter((leave) => leave.status === "REJECTED").length,
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      {/* Header */}

      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-slate-800">Leave History</h1>

        <p className="text-slate-500 mt-2">
          Track all your leave requests in one place.
        </p>
      </motion.div>

      {/* Stats */}

      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5 mb-8">
        <LeaveStats
          title="Total Leaves"
          value={stats.total}
          icon={<CalendarDays className="text-blue-600" />}
          color="bg-blue-100"
        />

        <LeaveStats
          title="Approved"
          value={stats.approved}
          icon={<CheckCircle2 className="text-green-600" />}
          color="bg-green-100"
        />

        <LeaveStats
          title="Pending"
          value={stats.pending}
          icon={<Clock3 className="text-yellow-600" />}
          color="bg-yellow-100"
        />

        <LeaveStats
          title="Rejected"
          value={stats.rejected}
          icon={<XCircle className="text-red-600" />}
          color="bg-red-100"
        />
      </div>

      {/* Search + Filter */}

      <div className="bg-white rounded-2xl border shadow-sm p-5 mb-8">
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="relative">
            <Search size={18} className="absolute left-4 top-4 text-gray-400" />

            <input
              type="text"
              placeholder="Search leave reason..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="relative">
            <Filter size={18} className="absolute left-4 top-4 text-gray-400" />

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="ALL">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Leave List */}

      {loading ? (
        <LeaveSkeleton />
      ) : filteredLeaves.length === 0 ? (
        <EmptyLeave />
      ) : (
        <motion.div layout className="grid gap-6">
          {filteredLeaves.map((leave) => (
            <LeaveCard key={leave.id} leave={leave} />
          ))}
        </motion.div>
      )}
    </div>
  );
}
