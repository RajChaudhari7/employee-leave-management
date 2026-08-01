import { FolderOpen } from "lucide-react";
import { Link } from "react-router-dom";

export default function EmptyLeave() {
  return (
    <div className="bg-white rounded-3xl shadow-sm border p-12 text-center">

      <FolderOpen
        size={80}
        className="mx-auto text-gray-300"
      />

      <h2 className="text-2xl font-bold mt-6">
        No Leave Requests Found
      </h2>

      <p className="text-gray-500 mt-2">
        Looks like you haven't applied for any leave yet.
      </p>

      <Link
        to="/employee/apply-leave"
        className="inline-block mt-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition"
      >
        Apply Leave
      </Link>

    </div>
  );
}