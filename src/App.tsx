import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import MemberDashboard from "./pages/MemberDashboard";
import MembersPage from "./components/members/Members";
import { AuthProvider } from "./provider/AuthProvider";
import CreateMemberPage from "./pages/CreateMemberPage";
import EditMemberPage from "./pages/EditMemberPage";
import MemberDetailsPage from "./pages/MemberDetailsPage";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          {/* Admin routes */}
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute requiredRole="ADMIN">
                <AdminDashboard />
              </ProtectedRoute>
            }
          >
            {/* Members routes */}
            <Route path="members" element={<MembersPage />} />
            <Route path="members/new" element={<CreateMemberPage />} />
            <Route path="members/:id/edit" element={<EditMemberPage />} />
            <Route path="members/:id" element={<MemberDetailsPage />} />
          </Route>

          {/* Member routes */}
          <Route
            path="/member-dashboard"
            element={
              <ProtectedRoute requiredRole="MEMBER">
                <MemberDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
