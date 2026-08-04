import { useEffect, useState } from "react";
import { Users, Clock3, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";

import { getDashboard } from "../../services/manager.service";

import DashboardHeader from "../../components/manager/DashboardHeader";
import DashboardCard from "../../components/manager/DashboardCard";
import DashboardCharts from "../../components/manager/DashboardCharts";
import RecentLeaveTable from "../../components/manager/RecentLeaveTable";
import QuickActions from "../../components/manager/QuickActions";
import DashboardSkeleton from "../../components/manager/DashboardSkeleton";
import EmployeeLeaderboard from "../../components/manager/EmployeeLeaderboard";
import RecentActivity from "../../components/manager/RecentActivity";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const response = await getDashboard();

      setDashboard(response.data);
    } catch (error) {
      toast.error("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <DashboardHeader />

      {/* Statistics */}

      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">
        <DashboardCard
          title="Employees"
          value={dashboard.totalEmployees}
          color="bg-blue-100 text-blue-600"
          icon={<Users />}
        />

        <DashboardCard
          title="Pending"
          value={dashboard.pendingLeaves}
          color="bg-yellow-100 text-yellow-600"
          icon={<Clock3 />}
        />

        <DashboardCard
          title="Approved"
          value={dashboard.approvedLeaves}
          color="bg-green-100 text-green-600"
          icon={<CheckCircle2 />}
        />

        <DashboardCard
          title="Rejected"
          value={dashboard.rejectedLeaves}
          color="bg-red-100 text-red-600"
          icon={<XCircle />}
        />
      </div>

      <DashboardCharts dashboard={dashboard} />

      <div className="grid lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2">
          <RecentLeaveTable leaves={dashboard.recentLeaves} />
        </div>

        <EmployeeLeaderboard employees={dashboard.topEmployees} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mt-8">
        <RecentActivity leaves={dashboard.recentLeaves} />
      </div>

      <div className="mt-8">
        <QuickActions />
      </div>
    </div>
  );
}
