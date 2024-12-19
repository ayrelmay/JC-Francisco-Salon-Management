import { Outlet, useLocation } from "react-router-dom";
import CashierSidebar from "./CashierSidebar";
import Header from "./Header";

export default function CashierAppLayout() {
  const location = useLocation();

  // Function to generate title based on current path
  const getPageTitle = () => {
    const path = location.pathname;

    if (path.startsWith("/DashboardCashier")) return "Dashboard";
    if (path.startsWith("/Payment")) return "Payment";
    if (path.startsWith("/Services")) return "Services";
    if (path.startsWith("/Appointment")) return "Appointment";
    if (path.startsWith("/Inventory")) return "Inventory";
    if (path.startsWith("/InvoiceCashier")) return "Invoice History";

    // Default case
    return "Dashboard";
  };

  return (
    <div className="flex h-screen w-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="hidden md:block w-64 bg-white">
        <CashierSidebar />
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
