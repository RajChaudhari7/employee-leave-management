import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  CalendarPlus,
  History,
  Bell,
  Users,
  ClipboardList,
  LogOut,
} from "lucide-react";

import useAuth from "../hooks/useAuth";
import { getNotifications } from "../services/notification.service";

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (user?.role === "EMPLOYEE") {
      fetchUnreadNotifications();
    }
  }, []);

  const fetchUnreadNotifications = async () => {
    try {
      const response = await getNotifications();

      const unread = response.filter(
        (notification) => !notification.isRead,
      ).length;

      setUnreadCount(unread);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const linkClass = (path) =>
    `flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
      location.pathname === path
        ? "bg-blue-600 text-white shadow-md"
        : "hover:bg-slate-800 text-slate-300"
    }`;

  return (
    <aside className="fixed left-0 top-0 w-72 h-screen bg-slate-900 text-white flex flex-col shadow-xl z-50">
      {/* Logo */}

      <div className="p-6 border-b border-slate-700">
        <h1 className="text-3xl font-bold tracking-wide">LeaveMS</h1>

        <p className="text-slate-400 text-sm mt-1">Employee Leave Management</p>
      </div>

      {/* User */}

      <div className="px-6 py-5 border-b border-slate-700">
        <p className="text-sm text-slate-400">Logged in as</p>

        <h2 className="font-semibold mt-1">{user.username}</h2>

        <span className="text-xs bg-blue-600 px-3 py-1 rounded-full inline-block mt-2">
          {user.role}
        </span>
      </div>

      {/* Menu */}

      <nav className="flex-1 p-4 space-y-2">
        {user.role === "EMPLOYEE" && (
          <>
            <Link
              to="/employee/dashboard"
              className={linkClass("/employee/dashboard")}
            >
              <span className="flex items-center gap-3">
                <LayoutDashboard size={20} />
                Dashboard
              </span>
            </Link>

            <Link
              to="/employee/apply-leave"
              className={linkClass("/employee/apply-leave")}
            >
              <span className="flex items-center gap-3">
                <CalendarPlus size={20} />
                Apply Leave
              </span>
            </Link>

            <Link
              to="/employee/history"
              className={linkClass("/employee/history")}
            >
              <span className="flex items-center gap-3">
                <History size={20} />
                Leave History
              </span>
            </Link>

            <Link
              to="/employee/notifications"
              className={linkClass("/employee/notifications")}
            >
              <span className="flex items-center gap-3">
                <Bell size={20} />
                Notifications
              </span>

              {unreadCount > 0 && (
                <span className="bg-red-500 text-white text-xs font-bold rounded-full min-w-[22px] h-[22px] flex items-center justify-center px-2">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </Link>
          </>
        )}

        {user.role === "MANAGER" && (
          <>
            <Link
              to="/manager/dashboard"
              className={linkClass("/manager/dashboard")}
            >
              <span className="flex items-center gap-3">
                <LayoutDashboard size={20} />
                Dashboard
              </span>
            </Link>

            <Link
              to="/manager/employees"
              className={linkClass("/manager/employees")}
            >
              <span className="flex items-center gap-3">
                <Users size={20} />
                Employees
              </span>
            </Link>

            <Link to="/manager/leaves" className={linkClass("/manager/leaves")}>
              <span className="flex items-center gap-3">
                <ClipboardList size={20} />
                Leave Requests
              </span>
            </Link>
          </>
        )}
      </nav>

      {/* Logout */}

      <div className="p-4 border-t border-slate-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 transition rounded-xl py-3 font-medium"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}
