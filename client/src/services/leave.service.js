import api from "../api/axios";

export const applyLeave = async (formData) => {
  const response = await api.post("/employee/leave", formData);

  return response.data;
};

export const getLeaveHistory = async (params = {}) => {
  const response = await api.get("/employee/leave-history", {
    params,
  });

  return response.data;
};