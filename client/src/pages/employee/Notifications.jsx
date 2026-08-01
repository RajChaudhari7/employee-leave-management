import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { toast } from "sonner";

import {
  getNotifications,
  markAsRead,
} from "../../services/notification.service";

import NotificationCard from "../../components/notification/NotificationCard";
import NotificationSkeleton from "../../components/notification/NotificationSkeleton";
import EmptyNotification from "../../components/notification/EmptyNotification";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);

      const response = await getNotifications();

      setNotifications(data);
    } catch (error) {
      toast.error("Failed to load notifications");
    } finally {
      setLoading(false);
    }
  };

  const handleRead = async (id) => {
    try {
      await markAsRead(id);

      setNotifications((prev) =>
        prev.map((item) => (item.id === id ? { ...item, isRead: true } : item)),
      );

      toast.success("Notification marked as read");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      {/* Header */}

      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">
            <Bell className="text-blue-600" size={28} />
          </div>

          <div>
            <h1 className="text-4xl font-bold text-slate-800">Notifications</h1>

            <p className="text-slate-500 mt-1">
              Stay updated with all your leave activities.
            </p>
          </div>
        </div>
      </div>

      {/* Statistics */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        <div className="bg-white rounded-2xl border shadow-sm p-6">
          <p className="text-gray-500 text-sm">Total Notifications</p>

          <h2 className="text-3xl font-bold mt-2">{notifications.length}</h2>
        </div>

        <div className="bg-white rounded-2xl border shadow-sm p-6">
          <p className="text-gray-500 text-sm">Unread</p>

          <h2 className="text-3xl font-bold text-blue-600 mt-2">
            {notifications.filter((item) => !item.isRead).length}
          </h2>
        </div>

        <div className="bg-white rounded-2xl border shadow-sm p-6">
          <p className="text-gray-500 text-sm">Read</p>

          <h2 className="text-3xl font-bold text-green-600 mt-2">
            {notifications.filter((item) => item.isRead).length}
          </h2>
        </div>
      </div>

      {/* Notification List */}

      {loading ? (
        <NotificationSkeleton />
      ) : notifications.length === 0 ? (
        <EmptyNotification />
      ) : (
        <div className="space-y-5">
          {notifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
              onRead={handleRead}
            />
          ))}
        </div>
      )}
    </div>
  );
}
