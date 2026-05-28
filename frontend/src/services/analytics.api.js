import { apiClient } from "./api";

export const fetchSalaryStats = (params) =>
  apiClient.get("/analytics/salary", { params });
