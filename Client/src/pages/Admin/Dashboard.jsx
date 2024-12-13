import Chart from "../../components/Admin/DashChart";
import DashAptTable from "../../components/Admin/DashAptTable";
import MetricCard from "../../components/Admin/MetriCard";
import DashEmpLog from "../../components/Admin/DashEmpLog";
import DashInventory from "../../components/Admin/DashInventory";
import { HandCoins, SunMedium, Moon, Users } from "lucide-react";
import { useState } from "react";

export default function Dashboard() {
  const [openingBalance, setOpeningBalance] = useState("200.00");

  const handleOpeningChange = (newValue) => {
    // Remove the ₱ symbol and any other non-numeric characters except decimal point
    const numericValue = newValue.replace(/[^0-9.]/g, "");
    setOpeningBalance(numericValue);
    // Later you can use openingBalance variable to save to DB
  };

  return (
    <div className="w-full flex-1 h-full bg-gray-50 flex flex-col">
      <div className="p-4 md:p-6 lg:p-8 flex-1">
        {/* Metric Cards */}
        <div className="w-full mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Revenue"
            value="₱16,800"
            icon={<HandCoins />}
            editable={false}
          />
          <MetricCard
            title="Opening"
            value={`₱${openingBalance}`}
            icon={<SunMedium />}
            editable={true}
            onChange={handleOpeningChange}
          />
          <MetricCard
            title="Closing"
            value="₱17,000"
            icon={<Moon />}
            editable={false}
          />
          <MetricCard
            title="Customer"
            value="20"
            icon={<Users />}
            editable={false}
          />
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
