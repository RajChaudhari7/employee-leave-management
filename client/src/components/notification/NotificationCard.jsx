import { Bell, CheckCircle2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";

export default function NotificationCard({ notification, onRead }) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className={`rounded-2xl border p-5 transition-all shadow-sm ${
        notification.isRead ? "bg-white" : "bg-blue-50 border-blue-200"
      }`}
    >
      <div className="flex justify-between items-start">
        <div className="flex gap-4">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center ${
              notification.isRead ? "bg-gray-100" : "bg-blue-100"
            }`}
          >
            <Bell
              className={
                notification.isRead ? "text-gray-500" : "text-blue-600"
              }
            />
          </div>

          <div>
            <p className="font-semibold text-gray-800">
              {notification.message}
            </p>

            <p className="text-sm text-gray-500 mt-2">
              {formatDistanceToNow(new Date(notification.createdAt), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>

        {!notification.isRead && (
          <button
            onClick={() => onRead(notification.id)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl"
          >
            <CheckCircle2 size={18} />
            Mark Read
          </button>
        )}
      </div>
    </motion.div>
  );
}
