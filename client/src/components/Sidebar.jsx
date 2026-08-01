import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Sidebar() {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen">
      <div className="text-2xl font-bold p-6 border-b border-slate-700">
        LeaveMS
      </div>

      <nav className="flex flex-col p-4 gap-3">
        {user.role === "EMPLOYEE" && (
          <>
            <Link to="/employee/dashboard">Dashboard</Link>

            <Link to="/employee/apply-leave">Apply Leave</Link>

            <Link to="/employee/history">Leave History</Link>

            <Link to="/employee/notifications">Notifications</Link>
          </>
        )}

        {user.role === "MANAGER" && (
          <>
            <Link to="/manager/dashboard">Dashboard</Link>

            <Link to="/manager/employees">Employees</Link>

            <Link to="/manager/leaves">Leave Requests</Link>
          </>
        )}

        <button onClick={handleLogout} className="text-left mt-6 text-red-400">
          Logout
        </button>
      </nav>
    </aside>
  );
}
