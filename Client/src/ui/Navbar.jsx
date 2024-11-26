import {
  LayoutDashboard,
  CreditCard,
  Briefcase,
  Calendar,
  Package,
  FileText,
  Users,
  LogOut,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, to: "/dashboard" },
  { name: "Payment", icon: CreditCard, to: "/payment" },
  { name: "Services", icon: Briefcase, to: "/services" },
  { name: "Appointment", icon: Calendar, to: "/appointment" },
  { name: "Inventory", icon: Package, to: "/inventory" },
  { name: "Invoice History", icon: FileText, to: "/invoice-history" },
  { name: "Accounts", icon: Users, to: "/accounts" },
];

export default function NavSidebar() {
  const [activeItem, setActiveItem] = useState("/dashboard");

  return (
    <div className="flex flex-col h-[1080px] w-64 bg-white border-r border-disabled border-opacity-85">
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
      <nav className="flex-1 px-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.to}
                className={`flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors
                  ${
                    activeItem === item.to
                      ? "bg-BtnFocus text-white"
                      : "text-FontPrimary hover:bg-gray-100"
                  }`}
                onClick={() => setActiveItem(item.to)}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Section */}
      <div className="p-4">
        <button className="flex items-center gap-3 px-3 py-2 text-sm text-FontPrimary hover:bg-gray-100 rounded-lg transition-colors w-full">
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  );
}
