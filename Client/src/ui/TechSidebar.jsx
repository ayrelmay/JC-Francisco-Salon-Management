import { Link, useLocation } from "react-router-dom";
import { Briefcase, Calendar, LogOut } from "lucide-react";

const navItems = [
  { name: "Appointment", icon: Calendar, path: "/technician/appointment" },
  { name: "Services", icon: Briefcase, path: "/technician/services" },
];

export default function TechSidebar() {
  const location = useLocation();

  return (
    <div className="flex flex-col h-full w-64 bg-white border-r border-Disable border-opacity-50">
      {/* Logo Section */}
      <div className="p-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded-full" />
          <span className="font-semibold text-FontPrimary">
            J.C Francisco Salon
          </span>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-4 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors
                    ${
                      isActive
                        ? "bg-BtnFocus text-FontPrimary"
                        : "text-FontPrimary hover:bg-gray-100"
                    }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout Section */}
      <div className="p-4">
        <button className="flex items-center gap-3 px-3 py-2 text-sm text-FontPrimary hover:bg-gray-100 rounded-lg transition-colors w-full">
          <LogOut className="w-5 h-5" />
          Tech
        </button>
      </div>
    </div>
  );
}
