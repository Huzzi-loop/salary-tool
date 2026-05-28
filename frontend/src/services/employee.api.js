import apiClient from "./api";

export const fetchEmployees = (params) =>
  apiClient.get("/employee", { params });

export const createEmployee = (data) => apiClient.post("/employee", data);

export const deleteEmployee = (id) => apiClient.delete(`/employee/${id}`);
