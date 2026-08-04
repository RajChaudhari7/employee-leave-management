import { format } from "date-fns";

export default function RecentLeaveTable({ leaves }) {
  return (
    <div className="bg-white rounded-2xl shadow border mt-8 overflow-hidden">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold">
          Recent Leave Requests
        </h2>
      </div>

      <table className="w-full">
        <thead className="bg-slate-100">
          <tr>
            <th className="text-left p-4">Employee</th>
            <th className="text-left p-4">Reason</th>
            <th className="text-left p-4">Status</th>
            <th className="text-left p-4">Applied</th>
          </tr>
        </thead>

        <tbody>
          {leaves.map((leave) => (
            <tr
              key={leave.id}
              className="border-b hover:bg-slate-50"
            >
              <td className="p-4">
                {leave.employee.username}
              </td>

              <td className="p-4">
                {leave.reason}
              </td>

              <td className="p-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    leave.status === "APPROVED"
                      ? "bg-green-100 text-green-700"
                      : leave.status === "REJECTED"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {leave.status}
                </span>
              </td>

              <td className="p-4">
                {format(
                  new Date(leave.createdAt),
                  "dd MMM yyyy"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}