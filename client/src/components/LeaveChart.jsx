import {
  ResponsiveContainer,
  BarChart,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Bar,
} from "recharts";

export default function LeaveChart({ stats }) {
  const data = [
    {
      name: "Approved",
      value: stats.approvedLeaves,
    },
    {
      name: "Pending",
      value: stats.pendingLeaves,
    },
    {
      name: "Rejected",
      value: stats.rejectedLeaves,
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-8">
      <h2 className="text-xl font-semibold mb-6">Leave Analytics</h2>

      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis allowDecimals={false} />

            <Tooltip />

            <Bar dataKey="value" radius={[8, 8, 0, 0]}>
              <Cell fill="#22c55e" />
              <Cell fill="#f59e0b" />
              <Cell fill="#ef4444" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
