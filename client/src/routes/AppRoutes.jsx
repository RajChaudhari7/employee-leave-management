import { Route, Routes } from "react-router-dom";
import Login from "../pages/auth/Login";
import EmployeeLayout from "../layouts/EmployeeLayout";
import EmployeeDashboard from "../pages/employee/Dashboard";
import ManagerLayout from "../layouts/ManagerLayout";
import ManagerDashboard from "../pages/manager/Dashboard";
import ProtectedRoute from "../components/ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        path="/employee"
        element={
          <ProtectedRoute allowedRoles={["EMPLOYEE"]}>
            <EmployeeLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<EmployeeDashboard />} />
      </Route>

      <Route
        path="/manager"
        element={
          <ProtectedRoute allowedRoles={["MANAGER"]}>
            <ManagerLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<ManagerDashboard />} />
      </Route>
    </Routes>
  );
}
