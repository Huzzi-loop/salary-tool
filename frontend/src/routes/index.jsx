import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Employees from "../pages/Employees";
import AppLayout from "../layout/AppLayout";

export default function AppRoutes() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/employees" element={<Employees />} />
      </Routes>
    </AppLayout>
  );
}
