import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

const COLORS = [
  "#f59e0b",
  "#22c55e",
  "#ef4444",
];

export default function DashboardCharts({ dashboard }) {
  const barData = [
    {
      name: "Pending",
      value: dashboard.pendingLeaves,
    },
    {
      name: "Approved",
      value: dashboard.approvedLeaves,
    },
    {
      name: "Rejected",
      value: dashboard.rejectedLeaves,
    },
  ];

  const pieData = [
    {
      name: "Pending",
      value: dashboard.pendingLeaves,
    },
    {
      name: "Approved",
      value: dashboard.approvedLeaves,
    },
    {
      name: "Rejected",
      value: dashboard.rejectedLeaves,
    },
  ];

  return (
    <div className="grid lg:grid-cols-2 gap-6 mt-8">
      {/* Bar Chart */}

      <div className="bg-white rounded-2xl shadow border p-6">
        <h2 className="text-xl font-bold mb-5">
          Leave Statistics
        </h2>

        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="value"
              radius={[8, 8, 0, 0]}
              fill="#2563eb"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}

      <div className="bg-white rounded-2xl shadow border p-6">
        <h2 className="text-xl font-bold mb-5">
          Leave Distribution
        </h2>

        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              outerRadius={110}
              label
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Legend />

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}