import NotificationBell from "./NotificationBell";
import useAuth from "../hooks/useAuth";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h2 className="font-semibold text-xl">Employee Leave Management</h2>

      <div className="flex items-center gap-6">
        <NotificationBell />

        <div>
          <p className="font-semibold">{user.username}</p>

          <p className="text-sm text-gray-500">{user.role}</p>
        </div>
      </div>
    </header>
  );
}
