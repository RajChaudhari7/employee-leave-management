import { Clock3 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function RecentActivity({ leaves }) {
  return (
    <div className="bg-white rounded-2xl shadow border p-6">
      <div className="flex items-center gap-2 mb-5">
        <Clock3 />

        <h2 className="text-xl font-bold">Recent Activity</h2>
      </div>

      <div className="space-y-5">
        {leaves.map((leave) => (
          <div key={leave.id} className="border-l-4 border-blue-500 pl-5">
            <h3 className="font-semibold">{leave.employee.username}</h3>

            <p className="text-gray-500">Applied for leave</p>

            <span className="text-sm text-gray-400">
              {formatDistanceToNow(new Date(leave.createdAt))} ago
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
