import { NavLink, useNavigate } from "react-router-dom";
/* Bringing in the icons (pictures) we want to use in the menu */
import {
  LayoutDashboard,
  CheckSquare,
  Calendar,
  User,
  LogOut,
} from "lucide-react";

/**
 * This is the Sidebar. 
 * It takes 'user' info (like name and email) to show at the bottom.
 */
const Sidebar = ({ user }) => {
  /* This 'navigate' tool helps us move to different pages (like jumping to the Login page) */
  const navigate = useNavigate();

  /**
   * This function runs when you click 'Log Out'.
   * 1. It clears the user's saved data from the computer.
   * 2. It sends the user back to the starting page.
   */
  const handleLogout = () => {
    localStorage.removeItem("user"); 
    navigate("/"); 
  };

  /* A list of all the pages we want in our menu */
  const links = [
    { to: "/home", icon: <LayoutDashboard size={18} />, label: "Dashboard" },
    { to: "/tasks", icon: <CheckSquare size={18} />, label: "Tasks" },
    { to: "/calendar", icon: <Calendar size={18} />, label: "Calendar" },
    { to: "/profile", icon: <User size={18} />, label: "Profile" },
  ];

  /* This is the part that actually draws the Sidebar on the screen */
  return (
    /* The main white box on the left side of the screen */
    <div className="flex h-screen w-64 flex-col justify-between border-r border-gray-200 bg-white px-4 py-6">
      
      {/* THE TOP PART: Logo and Menu */}
      <div>
        {/* The App Logo area */}
        <div className="mb-8 flex items-center gap-3">
          {/* The purple square with the 'M' */}
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
            <span className="text-lg font-bold text-white">M</span>
          </div>
          <div>
            <p className="font-bold text-gray-800">MoringaTaskFlow</p>
            <p className="text-xs text-gray-500">Task Manager</p>
          </div>
        </div>

        {/* The Navigation List (The buttons you click) */}
        <nav className="space-y-1">
          {/* We go through our 'links' list and create a button for each one */}
          {links.map((link) => (
            <NavLink
              key={link.to} 
              to={link.to}
              /* This part checks: "Am I on this page right now?" 
                 If YES: Make the background light purple.
                 If NO: Keep it gray but change color when I point my mouse at it. */
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-indigo-50 text-indigo-600" 
                    : "text-gray-600 hover:bg-gray-100" 
                }`
              }
            >
              {link.icon} {/* The icon picture */}
              {link.label} {/* The text name (Dashboard, Tasks, etc.) */}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* THE BOTTOM PART: User Profile and Logout */}
      <div>
        {/* Shows the name and email of the person logged in */}
        <div className="mb-3 px-3">
          <p className="text-sm font-semibold text-gray-800">
            {user?.name || "User"} {/* If no name, just show the word "User" */}
          </p>
          <p className="truncate text-xs text-gray-500">
            {user?.email || ""}
          </p>
        </div>
        
        {/* The Red Log Out Button */}
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