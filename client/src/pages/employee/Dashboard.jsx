import { useEffect, useState } from "react";

import DashboardCards from "../../components/DashboardCards";
import LeaveChart from "../../components/LeaveChart";
import RecentLeaves from "../../components/RecentLeaves";

import { getDashboard, getLeaveHistory } from "../../services/employee.service";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const [dashboardData, historyData] = await Promise.all([
        getDashboard(),
        getLeaveHistory(),
      ]);

      setStats(dashboardData);
      setLeaves(historyData);
    } catch (error) {
      console.error(error);
    }
  };

  if (!stats) {
    return <p>Loading...</p>;
  }

  return (
    <div className="space-y-8">
      <DashboardCards stats={stats} />

      <LeaveChart stats={stats} />

      <RecentLeaves leaves={leaves} />
    </div>
  );
}
