import { Search } from "lucide-react";

export default function LeaveFilter({ search, setSearch, status, setStatus }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border p-5 mb-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search employee..."
            className="w-full pl-10 pr-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
        </select>
      </div>
    </div>
  );
}
