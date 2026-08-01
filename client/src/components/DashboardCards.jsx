export default function DashboardCards({ stats }) {
  const cards = [
    {
      title: "Total Leaves",
      value: stats.totalLeaves,
      color: "bg-blue-500",
    },
    {
      title: "Pending",
      value: stats.pendingLeaves,
      color: "bg-yellow-500",
    },
    {
      title: "Approved",
      value: stats.approvedLeaves,
      color: "bg-green-500",
    },
    {
      title: "Rejected",
      value: stats.rejectedLeaves,
      color: "bg-red-500",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`${card.color} text-white rounded-xl shadow-lg p-6`}
        >
          <h3 className="text-lg">{card.title}</h3>

          <p className="text-4xl font-bold mt-3">{card.value}</p>
        </div>
      ))}
    </div>
  );
}
