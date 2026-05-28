import { apiClient } from "./api";

export const fetchEmployees = (params) =>
  apiClient.get("/employees", { params });
