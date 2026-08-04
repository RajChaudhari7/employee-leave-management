import { Users } from "lucide-react";

export default function EmployeeStats({
  employees,
}) {
  const total = employees.length;

  const totalLeaves = employees.reduce(
    (sum, employee) =>
      sum + employee.totalLeaves,
    0
  );

  const average =
    total === 0
      ? 0
      : (totalLeaves / total).toFixed(1);

  return (
    <div className="grid md:grid-cols-3 gap-5 mt-8">

      <div className="bg-white rounded-2xl shadow border p-6">

        <Users
          className="text-blue-600 mb-4"
          size={28}
        />

        <p className="text-gray-500">
          Employees
        </p>

        <h2 className="text-3xl font-bold mt-2">
          {total}
        </h2>

      </div>

      <div className="bg-white rounded-2xl shadow border p-6">

        <p className="text-gray-500">
          Total Leaves
        </p>

        <h2 className="text-3xl font-bold mt-2">
          {totalLeaves}
        </h2>

      </div>

      <div className="bg-white rounded-2xl shadow border p-6">

        <p className="text-gray-500">
          Avg Leaves
        </p>

        <h2 className="text-3xl font-bold mt-2">
          {average}
        </h2>

      </div>

    </div>
  );
}