import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function ManagerLayout() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Sidebar />

      <Navbar />

      <main className="ml-72 p-8">
        <Outlet />
      </main>
    </div>
  );
}