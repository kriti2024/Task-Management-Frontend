import "./App.css";
import { Routes, Route } from "react-router";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";

function App() {
  return (
    <Routes>
            <Route
        path="/dashboard"
        element={
            <DashboardPage />
        }
      />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}
export default App;
