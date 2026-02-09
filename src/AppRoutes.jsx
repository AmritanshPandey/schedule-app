import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TaskDetailPage from "./pages/TaskDetailPage";
import TaskPlanPage from "./pages/TaskPlanPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/task/:id" element={<TaskDetailPage />} />
      <Route path="/task/:id/plan" element={<TaskPlanPage />} />
    </Routes>
  );
}

export default AppRoutes;
