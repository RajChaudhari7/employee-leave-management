import NotificationBell from "./NotificationBell";
import useAuth from "../hooks/useAuth";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-40 ml-72 h-20 bg-white shadow flex items-center justify-between px-8">
      <h2 className="font-semibold text-xl">
        Employee Leave Management
      </h2>

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