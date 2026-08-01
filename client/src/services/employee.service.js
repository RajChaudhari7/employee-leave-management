import api from "../api/axios";

export const getDashboard = async () => {
  const response = await api.get("/employee/dashboard");
  return response.data.data;
};

export const getLeaveHistory = async () => {
  const response = await api.get("/employee/leave-history");
  return response.data.data;
};

export const getNotifications = async () => {
  const response = await api.get("/notifications");
  return response.data.data;
};
