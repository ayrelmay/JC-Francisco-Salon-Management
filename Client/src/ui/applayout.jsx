import { Outlet, useLocation } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import Header from "./Header";

export default function AppLayout() {
  const location = useLocation();

  // Function to generate title based on current path
  const getPageTitle = () => {
    const path = location.pathname;

    if (path.startsWith("/dashboard")) return "Dashboard";
    if (path.startsWith("/payment")) return "Payment";
    if (path.startsWith("/services")) return "Services";
    if (path.startsWith("/appointment")) return "Appointment";
    if (path.startsWith("/inventory")) return "Inventory";
    if (path.startsWith("/invoicehistory")) return "Invoice History";
    if (path.startsWith("/accounts")) return "Accounts";

    // Default case
    return "Dashboard";
  };

  return (
    <div className="flex h-screen w-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="hidden md:block w-64 bg-white">
        <AdminSidebar />
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
