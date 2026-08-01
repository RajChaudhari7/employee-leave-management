import {format} from "date-fns";

export default function RecentLeaves({ leaves }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-8">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-semibold">
          Recent Leave Requests
        </h2>
      </div>

      {leaves.length === 0 ? (
        <p className="text-gray-500">
          No leave requests found.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">

            <thead>
              <tr className="border-b">
                <th className="text-left py-3">Reason</th>
                <th className="text-left py-3">Start</th>
                <th className="text-left py-3">End</th>
                <th className="text-left py-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {leaves.slice(0, 5).map((leave) => (
                <tr
                  key={leave.id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="py-3">{leave.reason}</td>

                  <td>
                    {format(
                      new Date(leave.startDate),
                      "dd MMM yyyy"
                    )}
                  </td>

                  <td>
                    {format(
                      new Date(leave.endDate),
                      "dd MMM yyyy"
                    )}
                  </td>

                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-sm text-white

                      ${
                        leave.status === "APPROVED"
                          ? "bg-green-500"
                          : leave.status === "PENDING"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    >
                      {leave.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
}