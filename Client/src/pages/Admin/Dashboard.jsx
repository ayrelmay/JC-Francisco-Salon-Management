import Chart from "../../components/Admin/DashChart";
import DashAptTable from "../../components/Admin/DashAptTable";
import MetricCard from "../../components/Admin/MetriCard";
import DashEmpLog from "../../components/Admin/DashEmpLog";
import DashInventory from "../../components/Admin/DashInventory";
import { HandCoins, SunMedium, Moon, Users } from "lucide-react";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [openingAmount, setOpeningAmount] = useState("0.00");
  const [dailyRevenue, setDailyRevenue] = useState("0.00");
  const [closingAmount, setClosingAmount] = useState("0.00");
  const [customers, setCustomers] = useState("0");

  useEffect(() => {
    // Function to fetch values from backend
    const fetchValues = async () => {
      try {
        // Fetch revenue data
        const revenueResponse = await fetch(
          "http://localhost:3000/api/revenue"
        );
        const revenueData = await revenueResponse.json();

        // Fetch today's appointment count
        const appointmentResponse = await fetch(
          "http://localhost:3000/api/appointments/count/today"
        );
        const appointmentData = await appointmentResponse.json();

        // Update all states
        setOpeningAmount(revenueData.opening_amount || "0.00");
        setDailyRevenue(revenueData.daily_revenue || "0.00");
        setClosingAmount(revenueData.closing_amount || "0.00");
        setCustomers(appointmentData.count.toString());
      } catch (error) {
        console.error("Error fetching values:", error);
      }
    };

    fetchValues();

    // Check every minute for updates
    const interval = setInterval(fetchValues, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleOpeningChange = async (newValue, event) => {
    if (event.key !== "Enter") return;

    try {
      // Remove ₱ and convert to number
      const openingValue = parseFloat(newValue.replace(/[^0-9.-]/g, ""));
      if (isNaN(openingValue)) {
        throw new Error("Please enter a valid number");
      }

      const currentRevenue = parseFloat(dailyRevenue);
      const currentClosing = parseFloat(closingAmount);

      // Calculate new values
      const newRevenue = (currentRevenue - openingValue).toFixed(2);
      const newClosing = (currentClosing + openingValue).toFixed(2);

      // Generate transaction ID (YYYYMMDD)
      const now = new Date();
      const transactionId =
        now.getFullYear().toString() +
        (now.getMonth() + 1).toString().padStart(2, "0") +
        now.getDate().toString().padStart(2, "0");

      // Save to database
      const response = await fetch("http://localhost:3000/api/revenue", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          opening_amount: openingValue.toFixed(2),
          daily_revenue: newRevenue,
          closing_amount: newClosing,
          transaction_id: transactionId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save to database");
      }

      // Update state after successful save
      setOpeningAmount(openingValue.toFixed(2));
      setDailyRevenue(newRevenue);
      setClosingAmount(newClosing);
    } catch (error) {
      console.error("Error:", error);
      alert(error.message || "Failed to save values. Please try again.");
    }
  };

  return (
    <div className="w-full flex-1 h-full bg-gray-50 flex flex-col">
      <div className="p-4 md:p-6 lg:p-8 flex-1">
        {/* Metric Cards */}
        <div className="w-full mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Revenue"
            value={`₱${dailyRevenue}`}
            icon={<HandCoins />}
            editable={false}
          />
          <MetricCard
            title="Opening"
            value={`₱${openingAmount}`}
            icon={<SunMedium />}
            editable={true}
            onChange={handleOpeningChange}
          />
          <MetricCard
            title="Closing"
            value={`₱${closingAmount}`}
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
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Chart />
          <DashAptTable />
          <DashEmpLog />
          <DashInventory />
        </div>
      </div>
    </div>
  );
}
