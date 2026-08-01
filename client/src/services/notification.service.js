import api from "../api/axios";

export const getNotifications = async () => {
  const response = await api.get("/notifications");
  return response.data.data;
};

export const markAsRead = async (id) => {
  const response = await api.patch(`/notifications/${id}/read`);
  return response.data;
};
