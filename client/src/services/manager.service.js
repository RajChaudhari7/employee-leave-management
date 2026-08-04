import api from "../api/axios";

export const getDashboard = async () => {
  const response = await api.get("/manager/dashboard");
  return response.data;
};

// Get all leave requests
export const getLeaveRequests = async (
  page = 1,
  limit = 10,
  status = "",
  search = "",
) => {
  const response = await api.get("/manager/leaves", {
    params: {
      page,
      limit,
      status,
      search,
    },
  });

  return response.data;
};

// Update leave status
export const updateLeaveStatus = async (leaveId, status, managerRemarks) => {
  const response = await api.patch(`/manager/leaves/${leaveId}/status`, {
    status,
    managerRemarks,
  });

  return response.data;
};
