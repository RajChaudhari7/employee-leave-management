import { Users, FileText, Clock } from "lucide-react";
import { Link } from "react-router-dom";

export default function QuickActions() {
  const actions = [
    {
      title: "Employees",
      icon: <Users size={28} />,
      to: "/manager/employees",
    },
    {
      title: "Leave Requests",
      icon: <FileText size={28} />,
      to: "/manager/leaves",
    },
    {
      title: "Pending Approvals",
      icon: <Clock size={28} />,
      to: "/manager/leaves?status=PENDING",
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6 mt-8">
      {actions.map((item) => (
        <Link
          key={item.title}
          to={item.to}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-6 hover:scale-105 transition"
        >
          <div className="mb-4">{item.icon}</div>

          <h2 className="font-bold text-xl">
            {item.title}
          </h2>
        </Link>
      ))}
    </div>
  );
}