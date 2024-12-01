import Chart from "../../components/Admin/DashChart";
import DashAptTable from "../../components/Admin/DashAptTable";
import MetricCard from "../../components/Admin/MetriCard";
import DashEmpLog from "../../components/Admin/DashEmpLog";
import DashInventory from "../../components/Admin/DashInventory";
import { BellIcon, HandCoins, SunMedium, Moon, Users } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="w-full flex-1 h-full bg-gray-50 flex flex-col">
      <div className="p-4 md:p-6 lg:p-8 flex-1">
        {/* Header */}
        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <h1 className="text-2xl font-bold text-[#FontPrimary] mb-2 sm:mb-0">
            Dashboard
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">Fr, 27th November</span>
            <button className="rounded-full p-2 text-gray-600 hover:bg-gray-200">
              <BellIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Metric Cards */}
        <div className=" w-full mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard title="Revenue" value="₱16,800" icon={<HandCoins />} />
          <MetricCard title="Opening" value="₱200.00" icon={<SunMedium />} />
          <MetricCard title="Closing" value="₱17,000" icon={<Moon />} />
          <MetricCard title="Customer" value="20" icon={<Users />} />
        </div>

        {/* Charts and Tables Grid */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 ">
          {/* Revenue Chart */}
          <Chart />
          {/* Appointments Table */}
          <DashAptTable />

          {/* Employee's Login */}
          <DashEmpLog />

          {/* Inventory Overview */}
          <DashInventory />
        </div>
      </div>
    </div>
  );
}
