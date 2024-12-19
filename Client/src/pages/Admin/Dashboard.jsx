import Chart from "../../components/Admin/DashChart";
import DashAptTable from "../../components/Admin/DashAptTable";
import MetricCard from "../../components/Admin/MetriCard";
import DashEmpLog from "../../components/Admin/DashEmpLog";
import DashInventory from "../../components/Admin/DashInventory";
import { HandCoins, SunMedium, Moon, Users } from "lucide-react";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [openingBalance, setOpeningBalance] = useState("0.00");
  const [revenue, setRevenue] = useState("0.00");
  const [closing, setClosing] = useState("0.00");
  const [customers, setCustomers] = useState("0");

  useEffect(() => {
    // Function to fetch values from backend
    const fetchValues = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/revenue");
        const data = await response.json();
        setOpeningBalance(data.opening_balance);
        setRevenue(data.revenue);
        setClosing(data.closing);
        setCustomers(data.customers);
      } catch (error) {
        console.error("Error fetching values:", error);
      }
    };

    // Function to check if it's midnight and trigger reset
    const checkAndResetValues = async () => {
      const now = new Date();
      if (now.getHours() === 0 && now.getMinutes() === 0) {
        try {
          await fetch("/api/reset-daily", { method: "POST" });
          fetchValues(); // Fetch new values after reset
        } catch (error) {
          console.error("Error resetting values:", error);
        }
      }
    };

    // Initial fetch
    fetchValues();

    // Check every minute
    const interval = setInterval(checkAndResetValues, 60000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const handleOpeningChange = async (newValue, event) => {
    // Only proceed if Enter key is pressed
    if (event && event.key !== "Enter") {
      return;
    }

    // Remove the ₱ symbol and any other non-numeric characters except decimal point
    const numericValue = newValue.replace(/[^0-9.]/g, "");
    setOpeningBalance(numericValue);

    // Generate ID based on current date (MMDDYY format)
    const now = new Date();
    const id = `${(now.getMonth() + 1).toString().padStart(2, "0")}${now
      .getDate()
      .toString()
      .padStart(2, "0")}${now.getFullYear().toString().slice(-2)}`;

    try {
      const response = await fetch(`http://localhost:3000/api/revenue`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          opening_balance: numericValue,
          transaction_id: id,
        }),
      });
      console.log("Response received:", response);
    } catch (error) {
      console.error("Error updating opening balance:", error);
    }
  };

  return (
    <div className="w-full flex-1 h-full bg-gray-50 flex flex-col">
      <div className="p-4 md:p-6 lg:p-8 flex-1">
        {/* Metric Cards */}
        <div className="w-full mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Revenue"
            value={`₱${revenue}`}
            icon={<HandCoins />}
            editable={false}
          />
          <MetricCard
            title="Opening"
            value={`₱${openingBalance}`}
            icon={<SunMedium />}
            editable={true}
            onChange={handleOpeningChange}
            onKeyPress={true}
          />
          <MetricCard
            title="Closing"
            value={`₱${closing}`}
            icon={<Moon />}
            editable={false}
          />
          <MetricCard
            title="Customer"
            value={customers}
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
