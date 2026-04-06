import { Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "./components/AppShell";
import { DashboardPage } from "./pages/DashboardPage";
import { IdeaDetailPage } from "./pages/IdeaDetailPage";
import { SubmitIdeaPage } from "./pages/SubmitIdeaPage";

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/submit" element={<SubmitIdeaPage />} />
        <Route path="/ideas/:id" element={<IdeaDetailPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppShell>
  );
}
