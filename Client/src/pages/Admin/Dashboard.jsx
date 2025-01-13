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
  const [hasData, setHasData] = useState(false);
  const [trueRevenue, setTrueRevenue] = useState("0.00");

  const resetDailyValues = () => {
    setOpeningAmount("0.00");
    setDailyRevenue("0.00");
    setTrueRevenue("0.00");
    setClosingAmount("0.00");
    setHasData(false);
  };

  // const fetchValues = async () => {
  //   try {
  //     const revenueResponse = await fetch("http://localhost:3000/api/revenue");
  //     const revenueData = await revenueResponse.json();

  //     // Check if we have any data
  //     if (revenueData) {
  //       const opening = parseFloat(revenueData.opening_amount) || 0;
  //       const revenue = parseFloat(revenueData.daily_revenue) || 0;
  //       const today = new Date().toISOString().split("T")[0];

  //       // Set hasData based on whether we have data for today
  //       setHasData(revenueData.date === today);

  //       // Always set the values if we have data, regardless of the date
  //       setOpeningAmount(opening.toFixed(2));
  //       setDailyRevenue(revenue.toFixed(2));
  //       setTrueRevenue((revenue - opening).toFixed(2));
  //       setClosingAmount((opening + revenue).toFixed(2));
  //     } else {
  //       resetDailyValues();
  //     }

  //     // Always fetch current customer count separately
  //     const appointmentResponse = await fetch(
  //       "http://localhost:3000/api/appointments/count/today"
  //     );
  //     const appointmentData = await appointmentResponse.json();
  //     setCustomers(appointmentData.count.toString());
  //   } catch (error) {
  //     console.error("Error fetching values:", error);
  //     setHasData(false);
  //     resetDailyValues();
  //   }
  // };

  useEffect(() => {
    const fetchValues = async () => {
      try {
        const revenueResponse = await fetch(
          "http://localhost:3000/api/revenue"
        );
        const revenueData = await revenueResponse.json();

        // Check if we have any data
        if (revenueData) {
          const opening = parseFloat(revenueData.opening_amount) || 0;
          const revenue = parseFloat(revenueData.daily_revenue) || 0;

          // Set hasData to true if we have any data, regardless of the date
          setHasData(true);

          // Always set the values if we have data
          setOpeningAmount(opening.toFixed(2));
          setDailyRevenue(revenue.toFixed(2));
          setTrueRevenue((revenue - opening).toFixed(2));
          setClosingAmount((opening + revenue).toFixed(2));
        } else {
          resetDailyValues();
        }

        // Always fetch current customer count separately
        const appointmentResponse = await fetch(
          "http://localhost:3000/api/appointments/count/today"
        );
        const appointmentData = await appointmentResponse.json();
        setCustomers(appointmentData.count.toString());
      } catch (error) {
        console.error("Error fetching values:", error);
        setHasData(false);
        resetDailyValues();
      }
    };

    fetchValues(); // Initial fetch

    const refreshInterval = setInterval(() => {
      fetchValues(); // Refresh every 5 seconds
    }, 5000);

    return () => clearInterval(refreshInterval);
  }, []); // No need to include fetchValues in the dependency array

  const handleOpeningChange = async (newValue, event) => {
    if (event.key !== "Enter") return;

    try {
      const openingValue = parseFloat(newValue);
      if (isNaN(openingValue)) {
        throw new Error("Please enter a valid number");
      }

      // Generate transaction ID (YYYYMMDD)
      const now = new Date();
      const transactionId =
        now.getFullYear().toString() +
        (now.getMonth() + 1).toString().padStart(2, "0") +
        now.getDate().toString().padStart(2, "0");

      const currentRevenue = parseFloat(dailyRevenue) || 0;

      // Calculate new values
      const newClosingAmount = openingValue + currentRevenue;

      // Save to database
      const response = await fetch("http://localhost:3000/api/revenue", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          opening_amount: openingValue.toFixed(2),
          daily_revenue: currentRevenue.toFixed(2),
          closing_amount: newClosingAmount.toFixed(2),
          transaction_id: transactionId,
          customer_count: parseInt(customers),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save to database");
      }

      // After successful save, fetch fresh data from the database
      const revenueResponse = await fetch("http://localhost:3000/api/revenue");
      const revenueData = await revenueResponse.json();

      // Update state with the fresh data from database
      const opening = parseFloat(revenueData.opening_amount) || 0;
      const revenue = parseFloat(revenueData.daily_revenue) || 0;

      setOpeningAmount(opening.toFixed(2));
      setDailyRevenue(revenue.toFixed(2));
      setTrueRevenue((revenue - opening).toFixed(2));
      setClosingAmount((opening + revenue).toFixed(2));
      setHasData(true);
    } catch (error) {
      console.error("Error:", error);
      alert(error.message || "Failed to save values. Please try again.");
    }
  };

  return (
    <div className="w-full flex-1 h-full bg-gray-50 flex flex-col">
      <div className="p-4 md:p-6 lg:p-8 flex-1">
        <div className="w-full mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Revenue"
            value={`₱${trueRevenue}`}
            icon={<HandCoins />}
            editable={false}
            hasData={hasData}
          />
          <MetricCard
            title="Opening"
            value={`₱${openingAmount}`}
            icon={<SunMedium />}
            editable={true}
            onChange={handleOpeningChange}
            hasData={true}
          />
          <MetricCard
            title="Closing"
            value={`₱${closingAmount}`}
            icon={<Moon />}
            editable={false}
            hasData={hasData}
          />
          <MetricCard
            title="Customer"
            value={customers}
            icon={<Users />}
            editable={false}
            hasData={true}
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
