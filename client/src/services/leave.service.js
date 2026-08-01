import api from "../api/axios";

export const applyLeave = async (formData) => {
  const response = await api.post("/employee/leave", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
