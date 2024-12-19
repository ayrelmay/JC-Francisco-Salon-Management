import { Outlet, useLocation } from "react-router-dom";
import TechSidebar from "./TechSidebar";
import Header from "./Header";

export default function TechAppLayout() {
  const location = useLocation();

  // Function to generate title based on current path
  const getPageTitle = () => {
    const path = location.pathname;

    if (path.startsWith("/ServicesTech")) return "Services";
    if (path.startsWith("/AppointmentTech")) return "Appointment";

    // Default case
    return "Dashboard";
  };

  return (
    <div className="flex h-screen w-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="hidden md:block w-64 bg-white">
        <TechSidebar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-screen w-screen max-h-screen max-w-screen overflow-x-hidden overflow-y-auto">
        <div className="px-8 pt-8">
          <Header title={getPageTitle()} />
        </div>
        <div className="pb-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
