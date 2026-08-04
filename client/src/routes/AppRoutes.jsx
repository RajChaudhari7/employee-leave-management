import { Route, Routes } from "react-router-dom";
import Login from "../pages/auth/Login";
import EmployeeLayout from "../layouts/EmployeeLayout";
import EmployeeDashboard from "../pages/employee/Dashboard";
import ManagerLayout from "../layouts/ManagerLayout";
import ManagerDashboard from "../pages/manager/Dashboard";
import ProtectedRoute from "../components/ProtectedRoute";
import ApplyLeave from "../pages/employee/ApplyLeave";
import LeaveHistory from "../pages/employee/LeaveHistory";
import Notifications from "../pages/employee/Notifications";
import LeaveRequests from "../pages/manager/LeaveRequests";
import Employees from "../pages/manager/Employees";

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
        <Route path="apply-leave" element={<ApplyLeave />} />
        <Route path="history" element={<LeaveHistory />} />
        <Route path="notifications" element={<Notifications />} />
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
        <Route path="employees" element={<Employees />} />
        <Route path="leaves" element={<LeaveRequests   />} />
      </Route>
    </Routes>
  );
}
