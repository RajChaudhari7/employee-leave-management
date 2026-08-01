import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

import { getNotifications, markAsRead } from "../services/notification.service";

export default function NotificationBell() {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const data = await getNotifications();
      setNotifications(data);
    } catch (error) {
      console.error(error);
    }
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleRead = async (id) => {
    await markAsRead(id);

    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification,
      ),
    );
  };

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="relative">
        <Bell size={24} />

        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full h-5 w-5 text-xs flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-96 bg-white rounded-xl shadow-xl border z-50">
          <div className="p-4 border-b font-semibold">Notifications</div>

          {notifications.length === 0 ? (
            <p className="p-4 text-gray-500">No notifications</p>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                onClick={() => handleRead(notification.id)}
                className={`cursor-pointer p-4 border-b hover:bg-gray-100 transition

                ${!notification.isRead ? "bg-blue-50" : ""}`}
              >
                <p className="font-medium">{notification.message}</p>

                <p className="text-xs text-gray-500 mt-1">
                  {formatDistanceToNow(new Date(notification.createdAt), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
