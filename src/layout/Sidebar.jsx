import {
  LayoutDashboard,
  UserCircle,
  Settings,
  UsersRound,
  LogOut,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";

const Sidebar = () => {
  const links = [
    { to: "/profile", label: "Profile", icon: UserCircle },
    { to: "/settings", label: "Settings", icon: Settings },
    { to: "/users", label: "User Management", icon: UsersRound },
  ];

  return (
    <aside className="w-64 h-[100vh] pt-5 bg-[#5e7e74] text-white flex flex-col justify-between">
      <div>
        {/* Logo */}
        <Link to="/" className="px-6 pt-5 mt-4 text-4xl font-bold block">
          OutScalers
        </Link>

        {/* Navigation */}
        <nav className="mt-6">
          {/* Static Dashboard Link */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 text-sm hover:bg-[#4e6c62] rounded-md transition ${
                isActive
                  ? "bg-[#4e6c62] font-semibold border-l-4 border-white"
                  : ""
              }`
            }
          >
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </NavLink>

          <hr className="mx-5 border-gray-300 mb-6" />

          {/* Looping Sidebar Links */}
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              icon={Icon}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-6 py-3 text-sm hover:bg-[#4e6c62] rounded-md transition ${
                  isActive
                    ? "bg-[#4e6c62] border-l-4 border-white font-semibold"
                    : ""
                }`
              }
            >
              <Icon className="w-4 h-4" />
              {label}
            </NavLink>
          ))}

          <hr className="mx-5 border-gray-300 mt-6" />

          {/* Logout */}
          <NavLink
            to="/logout"
            className="flex items-center gap-3 px-6 py-3 text-sm text-red-300 hover:text-white hover:bg-red-500 rounded-md transition "
          >
            <LogOut className="w-4 h-4" />
            Logout
          </NavLink>
        </nav>
      </div>

      {/* Footer */}
      <div className="text-xs px-6 py-4 text-gray-300">
        © {new Date().getFullYear()} OutScalers.com
      </div>
    </aside>
  );
};

export default Sidebar;
