import { Search } from "lucide-react";

export default function EmployeeFilters({
  search,
  setSearch,
}) {
  return (
    <div className="bg-white rounded-2xl shadow border p-5 mt-8">

      <div className="relative">

        <Search
          size={20}
          className="absolute left-4 top-3 text-gray-400"
        />

        <input
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search employee..."
          className="w-full border rounded-xl pl-12 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />

      </div>

    </div>
  );
}