import { Sidebar } from "@/components/sidebar/Sidebar";
import Members from "@/components/members/Members";

function AdminDashboard() {
  return (
    <div className="flex h-screen">
      <Sidebar role="ADMIN" />
      <div className="flex flex-col flex-1 p-6">
        <Members />
      </div>
    </div>
  );
}

export default AdminDashboard;
