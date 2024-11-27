import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

export default function AppLayout() {
  return (
    <div className="flex h-screen w-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="hidden md:block w-64 bg-white">
        <AdminSidebar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-screen w-screen max-h-screen max-w-screen overflow-x-hidden overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
