import useAuth from "../hooks/useAuth";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between">
      <h2 className="font-semibold text-xl">Employee Leave Management</h2>

      <div>
        <p className="font-semibold">{user.username}</p>

        <p className="text-sm text-gray-500">{user.role}</p>
      </div>
    </header>
  );
}
