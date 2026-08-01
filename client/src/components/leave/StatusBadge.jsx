import {
  CheckCircle2,
  Clock3,
  XCircle,
} from "lucide-react";

export default function StatusBadge({ status }) {
  const styles = {
    APPROVED: {
      color:
        "bg-green-100 text-green-700 border border-green-200",
      icon: <CheckCircle2 size={16} />,
    },

    PENDING: {
      color:
        "bg-yellow-100 text-yellow-700 border border-yellow-200",
      icon: <Clock3 size={16} />,
    },

    REJECTED: {
      color:
        "bg-red-100 text-red-700 border border-red-200",
      icon: <XCircle size={16} />,
    },
  };

  const item = styles[status];

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full font-medium text-sm ${item.color}`}
    >
      {item.icon}
      {status}
    </span>
  );
}