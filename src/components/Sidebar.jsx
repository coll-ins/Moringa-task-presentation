// Sidebar.jsx is the left menu that appears on every page after login.
// It shows buttons for Dashboard, Tasks, Calendar, Profile, and a logout button.
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  CheckSquare,
  Calendar,
  User,
  LogOut,
} from "lucide-react";

const Sidebar = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const links = [
    { to: "/home", icon: <LayoutDashboard size={18} />, label: "Dashboard" },
    { to: "/tasks", icon: <CheckSquare size={18} />, label: "Tasks" },
    { to: "/calendar", icon: <Calendar size={18} />, label: "Calendar" },
    { to: "/profile", icon: <User size={18} />, label: "Profile" },
  ];

  return (
    <div className="flex h-screen w-64 flex-col justify-between border-r border-gray-200 bg-white px-4 py-6">
      <div>
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
            <span className="text-lg font-bold text-white">M</span>
          </div>
          <div>
            <p className="font-bold text-gray-800">MoringaTaskFlow</p>
            <p className="text-xs text-gray-500">Task Manager</p>
          </div>
        </div>

        <nav className="space-y-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              {link.icon}
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div>
        <div className="mb-3 px-3">
          <p className="text-sm font-semibold text-gray-800">
            {user?.name || "User"}
          </p>
          <p className="truncate text-xs text-gray-500">
            {user?.email || ""}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-50"
        >
          <LogOut size={16} />
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;