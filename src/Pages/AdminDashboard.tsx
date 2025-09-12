import { Sidebar } from "@/components/sidebar/Sidebar";
import { Outlet } from "react-router";
function AdminDashboard() {
  return (
    <div className="flex h-screen">
      <Sidebar role="ADMIN" />
      <div className="flex flex-col flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminDashboard;
