import { Link, useLocation } from "react-router";

interface SidebarProps {
  role: "ADMIN" | "MEMBER";
}

export const Sidebar = ({ role }: SidebarProps) => {
  const location = useLocation();

  // Define navigation items based on role
  const items = [
    {
      label: "Board",
      path: role === "ADMIN" ? "/admin-dashboard" : "/member-dashboard",
    },
    ...(role === "ADMIN"
      ? [{ label: "Members", path: "/admin-dashboard/members" }]
      : []),
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white h-screen flex flex-col">
      {/* Logo / Title */}
      <div className="px-6 py-4 text-lg font-bold border-b border-gray-700">
        Task Manager
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {items.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`block px-4 py-2 rounded transition ${
              location.pathname.startsWith(item.path)
                ? "bg-gray-700 font-semibold"
                : "hover:bg-gray-700"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};
