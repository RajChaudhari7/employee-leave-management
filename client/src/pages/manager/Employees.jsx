import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import { toast } from "sonner";

import { getEmployees } from "../../services/manager.service";

import EmployeeCard from "../../components/manager/EmployeeCard";
import EmployeeFilters from "../../components/manager/EmployeeFilters";
import EmployeeStats from "../../components/manager/EmployeeStats";
import EmployeeSkeleton from "../../components/manager/EmployeeSkeleton";
import EmployeePagination from "../../components/manager/EmployeePagination";

export default function Employees() {
  const [employees, setEmployees] = useState([]);

  const [pagination, setPagination] = useState(null);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchEmployees();
  }, [page, search]);

  const fetchEmployees = async () => {
    try {
      setLoading(true);

      const response = await getEmployees(page, 8, search);

      setEmployees(response.data);

      setPagination(response.pagination);
    } catch (error) {
      toast.error("Failed to load employees");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <EmployeeSkeleton />;
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      {/* Header */}

      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center">
            <Users className="text-blue-600" size={32} />
          </div>

          <div>
            <h1 className="text-4xl font-bold">Employees</h1>

            <p className="text-gray-500">Manage all employees</p>
          </div>
        </div>
      </div>

      <EmployeeStats employees={employees} />

      <EmployeeFilters search={search} setSearch={setSearch} />

      {employees.length === 0 ? (
        <div className="bg-white rounded-2xl border p-12 text-center mt-6">
          <Users size={60} className="mx-auto text-gray-300" />

          <h2 className="text-2xl font-bold mt-5">No Employees Found</h2>

          <p className="text-gray-500 mt-2">Try another search keyword.</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6 mt-6">
          {employees.map((employee) => (
            <EmployeeCard key={employee.id} employee={employee} />
          ))}
        </div>
      )}

      <EmployeePagination
        pagination={pagination}
        page={page}
        setPage={setPage}
      />
    </div>
  );
}
