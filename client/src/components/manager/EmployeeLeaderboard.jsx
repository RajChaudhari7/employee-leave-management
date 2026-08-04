import { Trophy } from "lucide-react";

export default function EmployeeLeaderboard({ employees = [] }) {
  return (
    <div className="bg-white rounded-2xl shadow border p-6">
      <div className="flex items-center gap-3 mb-6">
        <Trophy className="text-yellow-500" />
        <h2 className="text-xl font-bold">Top Employees</h2>
      </div>

      <div className="space-y-4">
        {employees.map((employee, index) => (
          <div
            key={employee.username}
            className="flex justify-between items-center"
          >
            <div className="flex gap-4 items-center">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold">
                {index + 1}
              </div>

              <div>
                <h3 className="font-semibold">{employee.username}</h3>

                <p className="text-sm text-gray-500">Approved Leaves</p>
              </div>
            </div>

            <span className="font-bold text-green-600">
              {employee.approvedLeaves}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
